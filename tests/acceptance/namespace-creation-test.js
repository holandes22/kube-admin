import { test } from 'qunit';
import moduleForAcceptance from 'kube-admin/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | namespace creation');

// TODO: make async helper and merge with helper used in file input component
const makeEventOptions = function(content='fake_content', type='application/json') {
  let file = null;
  const fileName = 'fake_name';
  if (window.WebKitBlobBuilder) { //PhatomJS 1.9
    let builder = new window.WebKitBlobBuilder();
    builder.append([content]);
    file = builder.getBlob(type);
    file.name = fileName;
  } else {
    const blob = new window.Blob([content], { type });
    file = new window.File([blob], fileName);
  }
  return { target: { files: [file] } };
};

test('creating a namespace by manifest file', function(assert) {
  visit('/namespaces');
  let name = 'fake';
  let options = makeEventOptions(
      `{"apiVersion": "v1", "kind": "Namespace", "metadata": {"name": "${name}"}}`
    );
  triggerEvent('input:file', 'change', options);
  click('[data-autoid=submit-file]');

  andThen(function() {
    assert.equal(currentURL(), '/namespaces');
    assert.equal(server.db.namespaces[0].metadata.name, name);
  });
});

/*
test('creating a namespace by manifest file shows error on failure', function(assert) {
});

test('creating a namespace by manifest file shows error if already exists', function(assert) {
});
*/
