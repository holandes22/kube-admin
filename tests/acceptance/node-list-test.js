import { test } from 'qunit';
import moduleForAcceptance from 'kube-admin/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | node list');

test('it shows node list', function(assert) {
  server.createList('node', 3);
  visit('/nodes');

  andThen(function() {
    assert.equal(currentURL(), '/nodes');
    assert.equal(this.$('[data-id=resource-list] tr').length, 3);
  });
});
