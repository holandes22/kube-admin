import { test } from 'qunit';
import moduleForAcceptance from 'kube-admin/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | pod log');

test('visiting /log show the logs', function(assert) {
  server.get('/namespaces/:namespace/pods/:pod/log', function() {
    return 'line1';
  });
  visit('/namespaces/default/pods/pod1/containers/container1/log');

  andThen(function() {
    assert.equal(find('[data-autoid=log] div').text().trim(), 'line1');
  });
});


/*
TODO: add this tests once #38 is resolved

import Mirage from 'ember-cli-mirage';

test('visiting /log shows error if AJAX error', function(assert) {
  const code = 406;
  let error = {
    code,
    kind: 'Status',
    message: `fake msg`,
    metadata: {},
    reason: '',
    status: 'Failure'
  };
  server.get('/namespaces/:namespace/pods/:pod/log', function() {
    return new Mirage.Response(406, {}, error );
  });
  visit('/namespaces/default/pods/pod1/containers/container1/log');

  andThen(function() {
    assert.equal(find('.ui.negative.message').length, 1);
    assert.equal(find('[data-autoid=error0-title]').text(), error.message);
    assert.equal(find('[data-autoid=error0-detail]').text(), 'N/A');
  });
});

test('visiting /log shows error HTTP 200 but container not found in response', function(assert) {
});


test('visiting /log shows error HTTP 200 but pod not in valid state ', function(assert) {
});
*/
