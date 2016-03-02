import { test } from 'qunit';
import moduleForAcceptance from 'kube-admin/tests/helpers/module-for-acceptance';
import page from '../pages/pod-details';

moduleForAcceptance('Acceptance | pod details');

test('it redirects to pods after deletion', function(assert) {
  let pods = server.createList('pod', 3);
  page.visit(pods[0]);
  page.del();
  page.approve();
  andThen(function() {
    assert.equal(server.db.pods.length, 2);
    assert.ok(page.success.includes('Successfully sent request to delete'));
    assert.equal(currentURL(), '/pods');
  });
});

test('it shows and error message if delete fails', function(assert) {
  let pod = server.create('pod', { id: 'error-fake', metadata: { namespace: 'ns', name: 'error-fake' } });
  page.visit(pod);
  page.del();
  page.approve();
  andThen(function() {
    assert.equal(server.db.pods.length, 1);
    assert.equal(page.error, 'error msg fake');
    assert.equal(currentURL(), `/namespaces/${pod.metadata.namespace}/pods/${pod.metadata.name}`);
  });
});

test('it shows message if deletion pending and hides delete button', function(assert) {
  let pod = server.create('pod', { id: 'pending', metadata: { namespace: 'ns', name: 'pending' } });
  page.visit(pod);
  page.del();
  page.approve();
  page.visit(pod);
  andThen(function() {
    assert.equal(page.pending, 'This resoure is pending removal');
    assert.equal(currentURL(), `/namespaces/${pod.metadata.namespace}/pods/${pod.metadata.name}`);
  });
});
