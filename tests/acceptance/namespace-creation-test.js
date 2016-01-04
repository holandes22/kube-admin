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
  const name = 'error-409',
        content = `{
          "apiVersion": "v1",
          "kind": "Namespace",
          "metadata": {"name": "${name}"}
        }`;
  page.createByFile(content);

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    assert.equal(page.error(), 'error msg 409');
  });
});

test('create namespace by file shows error on failure', function(assert) {
  assert.expect(2);
  const content = `{
    "apiVersion": "v1",
    "kind": "Namespace",
    "metadata": {"name": "error-400"}
  }`;
  page.createByFile(content);

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    assert.equal(page.error(), 'error msg 400');
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
  const name = 'error-409';
  page.createByName(name);

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    assert.equal(page.error(), 'error msg 409');
  });
});

test('create namespace by name shows error on failure', function(assert) {
  assert.expect(2);
  page.createByName('error-400');

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    assert.equal(page.error(), 'error msg 400');
  });
});

test('create namespace by name shows error on invalid name', function(assert) {
  assert.expect(2);
  page.createByName('error-422');

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    assert.equal(page.error(), 'error msg 422');
  });
});

test('only one message is displayed after success', function(assert) {
  assert.expect(2);
  page.createByName('error-400');

  andThen(function() {
    assert.equal(page.error(), 'error msg 400');
  });

  page.createByName('fake');
  andThen(function() {
    assert.equal(page.messageCount(), 1);
  });
});


test('only one message is displayed after error', function(assert) {
  assert.expect(2);
  page.createByName('fake');

  andThen(function() {
    assert.equal(page.success(), 'Successfully created');
  });

  page.createByName('error-400');
  andThen(function() {
    assert.equal(page.messageCount(), 1);
  });
});
