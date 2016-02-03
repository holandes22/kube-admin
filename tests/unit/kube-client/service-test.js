import { moduleFor, test } from 'ember-qunit';

moduleFor('service:kube-client', 'Unit | Service | kube client', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('get log returns log if no errors', function(assert) {
  let service = this.subject();
  const content = 'some log line';
  assert.equal(service.getLogOrThrow(content), content);
});


test('get log throws error if AJAX error', function(assert) {
  let service = this.subject();
  const error = { errors: [{ status: 'fake' }] };
  assert.throws(
    function() { service.getLogOrThrow(error); },
    function(err) { return err === error; }
  );
});

test('get log throws error if content matches container not found', function(assert) {
  let service = this.subject();
  //TODO: get exact content from API
  const error = 'Container Blah was not found';
  assert.throws(
    function() { service.getLogOrThrow(error); },
    { message: error }
  );
});

test('get log return content if even if it includes not found message', function(assert) {
  let service = this.subject();
  const content = 'do not throw just because a "not found" string appears in content';
  assert.equal(service.getLogOrThrow(content), content);
});

test('get log returns null if content matches container bad state', function(assert) {
  let service = this.subject();
  // Actual Content is of the form in API v1 from kubernetes v1.1:
  // Pod "blah" in namespace "default" : pod is not in 'Running', 'Succeeded' or 'Failed' state - State: "Pending"
  const content = `Pod blah..: pod is not in 'Running', 'Succeeded' or 'Failed' state - State: "Pending"`;
  assert.equal(service.getLogOrThrow(content), null);
});
