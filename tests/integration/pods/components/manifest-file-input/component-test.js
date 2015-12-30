import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('manifest-file-input', 'Integration | Component | manifest file input', {
  integration: true
});

const makeFileInputEvent = function(content='fake', type='application/json') {
  let blob = new window.Blob([content], { type });
  let file = new window.File([blob], 'filename');

  return Ember.$.Event('change', { target: { files: [file] } });
};

test('it renders no actionLabel', function(assert) {
  this.render(hbs`{{manifest-file-input}}`);
  assert.equal(this.$().text().trim(), 'Go');
});

test('it renders actionLabel', function(assert) {
  this.render(hbs`{{manifest-file-input actionLabel="Blah"}}`);
  assert.equal(this.$().text().trim(), 'Blah');
});

test('it shows an error if no file and removes it if file is selected', function(assert) {
  assert.expect(2);
  this.render(hbs`{{manifest-file-input}}`);
  this.$('[data-autoid=submit]').click();
  assert.equal(
    this.$('[data-autoid=error-message]').text(),
    "This field can't be blank"
  );

  let event = makeFileInputEvent({type: 'text/plain'});
  this.$('input:file').trigger(event);
  return wait().then(() => {
    assert.equal(this.$('[data-autoid=error-message]').text(), '');
  });
});

test('it shows an error if cannot parse text as JSON', function(assert) {
  assert.expect(1);
  this.render(hbs`{{manifest-file-input}}`);
  let event = makeFileInputEvent({type: 'application/json'});
  this.$('input:file').trigger(event);
  return wait().then(() => {
    this.$('[data-autoid=submit]').click();
    assert.equal(this.$('[data-autoid=error-message]').text(), 'Selected file must be valid JSON');
  });
});

test('it shows an error if manifest has no kind', function(assert) {
  assert.expect(1);
  this.render(hbs`{{manifest-file-input kind="Pod"}}`);
  let event = makeFileInputEvent('{"apiVersion": "v1"}', 'application/json');
  this.$('input:file').trigger(event);
  return wait().then(() => {
    this.$('[data-autoid=submit]').click();
    assert.equal(this.$('[data-autoid=error-message]').text(), 'Bad manifest file (No kind attribute)');
  });
});

test('it shows an error if kind in manifest is not the specified', function(assert) {
  assert.expect(1);
  this.render(hbs`{{manifest-file-input kind="Fake"}}`);
  let event = makeFileInputEvent('{"kind": "Pod"}', 'application/json');
  this.$('input:file').trigger(event);
  return wait().then(() => {
    this.$('[data-autoid=submit]').click();
    assert.equal(this.$('[data-autoid=error-message]').text(), 'Resource kind should be Fake');
  });
});

test('it passes up the manifest', function(assert) {
  const create = function(manifest) {
    assert.equal(manifest.kind, 'Pod');
  };
  this.set('actions', { create });
  this.render(hbs`{{manifest-file-input kind="Pod" action=(action "create")}}`);
  let event = makeFileInputEvent('{"kind": "Pod"}', 'application/json');
  this.$('input:file').trigger(event);
  return wait().then(() => {
    this.$('[data-autoid=submit]').click();
  });

});
