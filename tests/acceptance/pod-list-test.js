import { test } from 'qunit';
import moduleForAcceptance from 'kube-admin/tests/helpers/module-for-acceptance';
import startApp from "kube-admin/tests/helpers/start-app";
import { getMetadata } from 'kube-admin/mirage/factories/fakers';

let sessionService;

moduleForAcceptance('Acceptance | pod list', {
  beforeEach() {
    this.application = startApp();
    // TODO: use getOwner here
    sessionService = this.application.__container__.owner.lookup('service:session');
  }
});

test('it filters out pods from kube-system namespace by default', function(assert) {
  assert.expect(2);
  server.create('pod', { metadata: getMetadata('Pod', undefined, 'default') });
  server.create('pod', { metadata: getMetadata('Pod', undefined, 'default') });
  server.create('pod', { metadata: getMetadata('Pod', undefined, 'kube-system') });
  server.create('pod', { metadata: getMetadata('Pod', undefined, 'kube-system') });

  sessionService.setAttr('showSystemResources', false);

  visit('/pods');

  andThen(function() {
    assert.equal(currentURL(), '/pods');
    assert.equal(this.$('[data-id=resource-list] tr').length, 2);
  });
});

test('it shows pod from kube-system after setting to show', function(assert) {
  assert.expect(2);
  server.create('pod', { metadata: getMetadata('Pod', undefined, 'default') });
  server.create('pod', { metadata: getMetadata('Pod', undefined, 'kube-system') });
  server.create('pod', { metadata: getMetadata('Pod', undefined, 'kube-system') });

  sessionService.setAttr('showSystemResources', true);

  visit('/pods');
  andThen(function() {
    assert.equal(currentURL(), '/pods');
    assert.equal(this.$('[data-id=resource-list] tr').length, 3);
  });
});

test('it shows empty when there are only pods in system namespace', function(assert) {
  server.create('pod', { metadata: getMetadata('Pod', undefined, 'kube-system') });
  sessionService.setAttr('showSystemResources', false);

  visit('/pods');

  andThen(function() {
    assert.equal(currentURL(), '/pods');
    assert.equal(this.$('[data-id=resource-list] tr').length, 0);
  });
});

test('it shows no pods when there are no pods', function(assert) {
  visit('/pods');

  sessionService.setAttr('showSystemResources', false);

  andThen(function() {
    assert.equal(currentURL(), '/pods');
    assert.equal(this.$('[data-id=resource-list] tr').length, 0);
  });
});
