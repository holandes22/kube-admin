import { test } from 'qunit';
import moduleForAcceptance from 'kube-admin/tests/helpers/module-for-acceptance';
import page from '../pages/namespace-creation';

moduleForAcceptance('Acceptance | namespace creation');

test('create namespace by file', function(assert) {
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

test('create namespace by file shows error if already exists', function(assert) {
  assert.expect(2);
  const name = 'already-exists',
        content = `{
          "apiVersion": "v1",
          "kind": "Namespace",
          "metadata": {"name": "${name}"}
        }`;
  page.createByFile(content);

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    const expected = `namespaces "${name}" already exists`;
    assert.equal(page.error(), expected);
  });
});

test('create namespace by file shows error on failure', function(assert) {
  assert.expect(2);
  const content = `{
    "apiVersion": "v1",
    "kind": "Namespace",
    "metadata": {"name": "error"}
  }`;
  page.createByFile(content);

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    assert.equal(page.error(), 'error msg');
  });
});

test('create namespace by name', function(assert) {
  assert.expect(3);
  const name = 'fake';
  page.createByName(name);

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    assert.equal(server.db.namespaces[0].metadata.name, name);
    assert.equal(page.success(), 'Successfully created');
  });
});

test('create namespace by name shows error if already exists', function(assert) {
  assert.expect(2);
  const name = 'already-exists';
  page.createByName(name);

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    const expected = `namespaces "${name}" already exists`;
    assert.equal(page.error(), expected);
  });
});

test('create namespace by name shows error on failure', function(assert) {
  assert.expect(2);
  page.createByName('error');

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    assert.equal(page.error(), 'error msg');
  });
});

test('create namespace by name shows error on invalid name', function(assert) {
  assert.expect(2);
  page.createByName('Invalid');

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    assert.equal(page.error(), 'invalid msg');
  });
});

