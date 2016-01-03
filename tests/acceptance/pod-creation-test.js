import { test } from 'qunit';
import moduleForAcceptance from 'kube-admin/tests/helpers/module-for-acceptance';
import page from '../pages/pod-creation';

moduleForAcceptance('Acceptance | pod creation');

test('create pod with namespace', function(assert) {
  assert.expect(4);
  page.createWithNamespace();
  andThen(function() {
    assert.equal(currentURL(), '/pods');
    assert.equal(server.db.pods[0].metadata.name, 'fake');
    assert.equal(server.db.pods[0].metadata.namespace, 'fake');
    assert.equal(page.success(), 'Successfully created');
  });
});

test('create pod with no namespace is created at default', function(assert) {
  assert.expect(3);
  page.createWithoutNamespace();
  andThen(function() {
    assert.equal(currentURL(), '/pods');
    assert.equal(server.db.pods[0].metadata.name, 'fake');
    assert.equal(server.db.pods[0].metadata.namespace, 'default');
  });
});

test('create pod with empty namespace is created at default', function(assert) {
  assert.expect(3);
  page.createEmptyNamespace();
  andThen(function() {
    assert.equal(currentURL(), '/pods');
    assert.equal(server.db.pods[0].metadata.name, 'fake');
    assert.equal(server.db.pods[0].metadata.namespace, 'default');
  });
});
