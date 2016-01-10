import { test } from 'qunit';
import moduleForAcceptance from 'kube-admin/tests/helpers/module-for-acceptance';
import page from '../pages/service-details';

moduleForAcceptance('Acceptance | service details');

test('visiting service details', function(assert) {
  const service = server.create('service'),
        url = `/namespaces/${service.metadata.namespace}/services/${service.metadata.name}`;
  visit('/services');
  click('[data-autoid^=name] a');

  andThen(function() {
    assert.equal(currentURL(), url);
  });
});

test('service details are shown', function(assert) {
  assert.expect(7);
  // Add a few extra services to make sure we test against the correct one
  server.createList('service', 3);
  let service = server.create('service');
  service.metadata.labels = { a: 1, b: 2 };
  service.spec.ports = [
    { name: 'a', port: 4200, targetPort: 4300, protocol: 'TCP' },
    { name: 'b', port: 4201, targetPort: 4301, protocol: 'TCP' }
  ];
  server.db.services.update(service.id, service);

  page.visit(service);

  andThen(function() {
    assert.equal(page.details().name(), service.metadata.name);
    assert.equal(page.details().labels(), 'a = 1 b = 2');
    assert.equal(page.details().ports(1).name(), 'a');
    assert.equal(page.details().ports(1).port(), 4200);
    assert.equal(page.details().ports(1).targetPort(), 4300);
    assert.equal(page.details().ports(1).protocol(), 'TCP');
    assert.equal(page.details().ports(2).name(), 'b');
  });
});

test('service details with no labels', function(assert) {
  assert.expect(1);
  let service = server.create('service');
  service.metadata.labels = {};
  server.db.services.update(service.id, service);

  page.visit(service);

  andThen(function() {
    assert.equal(page.details().labels(), 'No labels');
  });
});

test('service details with no ports', function(assert) {
  assert.expect(2);
  let service = server.create('service');
  service.spec.ports = [];
  server.db.services.update(service.id, service);

  page.visit(service);

  andThen(function() {
    assert.ok(page.isPortsSectionHidden());
    assert.ok(page.details().ports().isHidden());
  });
});
