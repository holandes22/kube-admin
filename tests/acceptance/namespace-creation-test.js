import { test } from 'qunit';
import moduleForAcceptance from 'kube-admin/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | namespace creation');

test('creating a namespace by manifest file', function(assert) {
  visit('/namespaces');
  let name = 'fake';
  const content = `{"apiVersion": "v1", "kind": "Namespace", "metadata": {"name": "${name}"}}`;
  triggerFileSelected('input:file', content);
  click('[data-autoid=submit-file]');

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    assert.equal(server.db.namespaces[0].metadata.name, name);
  });
});

/*
test('creating a namespace by manifest file shows error on failure', function(assert) {
});

test('creating a namespace by manifest file shows error if already exists', function(assert) {
});
*/
