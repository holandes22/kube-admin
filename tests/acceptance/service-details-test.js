import { test } from 'qunit';
import moduleForAcceptance from 'kube-admin/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | service details');

test('visiting service details', function(assert) {
  const service = server.create('service'),
        url = `/namespaces/${service.metadata.namespace}/services/${service.metadata.name}`;
  visit(url);

  andThen(function() {
    assert.equal(currentURL(), url);
  });
});
