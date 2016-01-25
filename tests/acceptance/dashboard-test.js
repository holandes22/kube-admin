import { test } from 'qunit';
import moduleForAcceptance from 'kube-admin/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | dashboard');

test('it shows default server when visiting dashboard', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(find('[data-autoid=host-menu]').text().trim(), 'http://localhost:8080');
  });
});

/*
test('it shows conn error when visiting dashboard when conn fails', function(assert) {
  visit('/');
  server.get('/api', {errors: [ { status: 0 } ] }, 0);

  andThen(function() {
    assert.equal(find('[data-autoid=host-menu]').text().trim(), 'http://localhost:8080');
  });
});

test('it checks connection upon server selection', function(assert) {
  assert.ok(true);
});

test('it validates input upon server selection', function(assert) {
  assert.ok(true);
});
*/
