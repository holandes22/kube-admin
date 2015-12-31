import { test } from 'qunit';
import moduleForAcceptance from 'kube-admin/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | namespace creation');

test('creating a namespace by manifest file', function(assert) {
  assert.expect(3);
  visit('/namespaces');
  const name = 'fake',
        content = `{"apiVersion": "v1", "kind": "Namespace", "metadata": {"name": "${name}"}}`;
  triggerFileSelected('input:file', content);
  click('[data-autoid=submit-file]');

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    assert.equal(server.db.namespaces[0].metadata.name, name);
    assert.equal(find('.ui.positive.message').text().trim(), 'Successfully created');
  });
});

test('creating a namespace by name', function(assert) {
  assert.expect(3);
  visit('/namespaces');
  const name = 'fake';
  fillIn('#namespace-name-input', name);
  click('[data-autoid=submit-name]');

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    assert.equal(server.db.namespaces[0].metadata.name, name);
    assert.equal(find('.ui.positive.message').text().trim(), 'Successfully created');
  });
});

test('creating a shows error if already exists', function(assert) {
  assert.expect(2);
  visit('/namespaces');
  const name = 'already-exists';
  fillIn('#namespace-name-input', name);
  click('[data-autoid=submit-name]');

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    const expected = `namespaces "${name}" already exists`;
    assert.equal(find('.ui.negative.message').text().trim(), expected);
  });
});

/*
test('creating a namespace by manifest file shows error on failure', function(assert) {
});

*/
