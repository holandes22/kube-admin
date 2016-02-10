import { test } from 'qunit';
import moduleForAcceptance from 'kube-admin/tests/helpers/module-for-acceptance';
import Mirage from 'ember-cli-mirage';

moduleForAcceptance('Acceptance | replicationcontroller details');

test('it scales a replication controller', function(assert) {
  assert.expect(1);
  let rc = server.create('replicationcontroller'),
      newReplicas = rc.status.replicas + 2,
      url = `/namespaces/default/replication-controllers/${rc.metadata.name}`;

  let done = assert.async();
  server.put(`/namespaces/default/replicationcontrollers/${rc.metadata.name}`, (db, request) => {
    let replicas = JSON.parse(request.requestBody).spec.replicas;
    assert.equal(replicas, newReplicas);
    done();
  });

  visit(url);
  fillIn('[data-id=rc-scale] input', newReplicas);
  click('[data-id=rc-scale] button');
});

test('it shows error message if scale request failed', function(assert) {
  assert.expect(2);
  let rc = server.create('replicationcontroller'),
      newReplicas = rc.status.replicas + 2,
      url = `/namespaces/default/replication-controllers/${rc.metadata.name}`;
  server.put(`/namespaces/default/replicationcontrollers/${rc.metadata.name}`, () => {
    let data = {
      code: 406,
      kind: 'Status',
      message: 'some fake error msg',
      metadata: {},
      reason: 'Reason',
      status: 'Failure'
    };
    return new Mirage.Response(406, {}, data);
  });

  visit(url);
  fillIn('[data-id=rc-scale] input', newReplicas);
  click('[data-id=rc-scale] button');
  andThen(function() {
    assert.equal(find('.ui.negative.message').length, 1);
    assert.equal(find('.ui.negative.message').text().trim(), 'some fake error msg');
  });
});
