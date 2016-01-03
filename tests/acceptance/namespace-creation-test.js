import { test } from 'qunit';
import moduleForAcceptance from 'kube-admin/tests/helpers/module-for-acceptance';
import page from '../pages/namespace-creation';

moduleForAcceptance('Acceptance | namespace creation');

test('creating a namespace by manifest file', function(assert) {
  assert.expect(3);
  const name = 'fake',
        content = `{
          "apiVersion": "v1",
          "kind": "Namespace",
          "metadata": {"name": "${name}"}
        }`;

  page.createByFile(content);
  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    assert.equal(server.db.namespaces[0].metadata.name, name);
    assert.equal(page.success(), 'Successfully created');
  });
});

test('creating a namespace by name', function(assert) {
  assert.expect(3);
  const name = 'fake';
  page.createByName(name);

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    assert.equal(server.db.namespaces[0].metadata.name, name);
    assert.equal(page.success(), 'Successfully created');
  });
});

test('creating shows error if already exists', function(assert) {
  assert.expect(2);
  visit('/namespaces');
  const name = 'already-exists';
  page.createByName(name);

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    const expected = `namespaces "${name}" already exists`;
    assert.equal(page.error(), expected);
  });
});

/*
test('creating a namespace by manifest file shows error on failure', function(assert) {
});

*/
