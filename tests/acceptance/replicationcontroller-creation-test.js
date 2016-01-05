import { test } from 'qunit';
import moduleForAcceptance from 'kube-admin/tests/helpers/module-for-acceptance';
import page from '../pages/replicationcontroller-creation';

moduleForAcceptance('Acceptance | replicationcontroller creation');

test('create replicationcontroller with namespace', function(assert) {
  assert.expect(4);
  page.createWithNamespace();
  andThen(function() {
    assert.equal(currentURL(), '/replication-controllers');
    assert.equal(server.db.replicationcontrollers[0].metadata.name, 'fake');
    assert.equal(server.db.replicationcontrollers[0].metadata.namespace, 'fake');
    assert.equal(page.success(), 'Successfully created');
  });
});

test('create replicationcontroller with no namespace is created at default', function(assert) {
  assert.expect(3);
  page.createWithoutNamespace();
  andThen(function() {
    assert.equal(currentURL(), '/replication-controllers');
    assert.equal(server.db.replicationcontrollers[0].metadata.name, 'fake');
    assert.equal(server.db.replicationcontrollers[0].metadata.namespace, 'default');
  });
});

test('create replicationcontroller with empty namespace is created at default', function(assert) {
  assert.expect(3);
  page.createEmptyNamespace();
  andThen(function() {
    assert.equal(currentURL(), '/replication-controllers');
    assert.equal(server.db.replicationcontrollers[0].metadata.name, 'fake');
    assert.equal(server.db.replicationcontrollers[0].metadata.namespace, 'default');
  });
});

test('create replicationcontroller shows error on failure', function(assert) {
  assert.expect(2);
  page.createError(400);

  andThen(function() {
    assert.equal(currentURL(), '/replication-controllers');
    assert.equal(page.error(), 'error msg 400');
  });
});

test('only one message is displayed after success', function(assert) {
  assert.expect(2);
  page.createError(400);

  andThen(function() {
    assert.equal(page.error(), 'error msg 400');
  });

  page.createWithoutNamespace();
  andThen(function() {
    assert.equal(page.messageCount(), 1);
  });
});


test('only one message is displayed after error', function(assert) {
  assert.expect(2);
  page.createWithoutNamespace();

  andThen(function() {
    assert.equal(page.success(), 'Successfully created');
  });

  page.createError(400);
  andThen(function() {
    assert.equal(page.messageCount(), 1);
  });
});
