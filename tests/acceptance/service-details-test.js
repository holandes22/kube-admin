import { test } from 'qunit';
import moduleForAcceptance from 'kube-admin/tests/helpers/module-for-acceptance';
import page from '../pages/service-details';
import { getMetadata } from 'kube-admin/mirage/factories/fakers';

moduleForAcceptance('Acceptance | service details');

test('visiting service details', function(assert) {
  let metadata = getMetadata('Service', 0, 'default'),
      service = server.create('service', { metadata }),
      url = `/namespaces/${service.metadata.namespace}/services/${service.metadata.name}`;
  visit('/services');
  click('[data-autoid^=name] a');

  andThen(function() {
    assert.equal(currentURL(), url);
  });
});

test('service details are shown', function(assert) {
  assert.expect(8);
  // Add a few extra services to make sure we test against the correct one
  server.createList('service', 3);
  let service = server.create('service');
  service.metadata.labels = { a: 1, b: 2 };
  service.spec.ports = [
    { name: 'a', port: 4200, targetPort: 4300, protocol: 'TCP' },
    { name: 'b', port: 4201, targetPort: 4301, protocol: 'TCP' }
  ];
  server.db.services.update(service.id, service);

  page.visit({ namespace: service.metadata.namespace, name: service.metadata.name });

  andThen(function() {
    assert.equal(page.details.name, service.metadata.name);
    assert.equal(page.details.labels, 'a = 1 b = 2');
    assert.equal(page.details.ports(0).name, 'a');
    assert.equal(page.details.ports(0).protocol, 'TCP');
    assert.equal(page.details.ports(0).port, 4200);
    assert.equal(page.details.ports(0).targetPort, 4300);
    assert.equal(page.details.ports(0).link, service.spec.clusterIP);
    assert.equal(page.details.ports(1).name, 'b');
  });
});

test('service details with no labels', function(assert) {
  assert.expect(1);
  let service = server.create('service');
  service.metadata.labels = {};
  server.db.services.update(service.id, service);

  page.visit({ namespace: service.metadata.namespace, name: service.metadata.name });

  andThen(function() {
    assert.equal(page.details.labels, 'No labels');
  });
});

test('service details with no ports', function(assert) {
  assert.expect(2);
  let service = server.create('service');
  service.spec.ports = [];
  server.db.services.update(service.id, service);

  page.visit({ namespace: service.metadata.namespace, name: service.metadata.name });

  andThen(function() {
    assert.equal(page.isPortsSectionHidden, true);
    assert.equal(page.details.ports().isHidden, true);
  });
});
