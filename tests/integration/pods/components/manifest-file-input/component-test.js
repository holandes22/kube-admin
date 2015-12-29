import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('manifest-file-input', 'Integration | Component | manifest file input', {
  integration: true
});

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
  let blob = new window.Blob(['file content'], {type: 'text/plain'});
  let file = new window.File([blob], 'name.txt');

  let event = Ember.$.Event('change', { target: { files: [file] } });
  this.$('input:file').trigger(event);
  return wait().then(() => {
    assert.equal(this.$('[data-autoid=error-message]').text(), '');
  });
});

test('it shows an error if cannot parse text as JSON', function(assert) {
  assert.expect(1);
  this.render(hbs`{{manifest-file-input}}`);
  let blob = new window.Blob(['aa'], {type: 'application/json'});
  let file = new window.File([blob], 'name.json');

  let event = Ember.$.Event('change', { target: { files: [file] } });
  this.$('input:file').trigger(event);
  return wait().then(() => {
    this.$('[data-autoid=submit]').click();
    assert.equal(this.$('[data-autoid=error-message]').text(), 'Selected file must be valid JSON');
  });
});

test('it shows an error if manifest has no kind', function(assert) {
  assert.expect(1);
  this.render(hbs`{{manifest-file-input kind="Pod"}}`);
  let blob = new window.Blob(['{"apiVersion": "v1"}'], {type: 'application/json'});
  let file = new window.File([blob], 'manifest.json');

  let event = Ember.$.Event('change', { target: { files: [file] } });
  this.$('input:file').trigger(event);
  return wait().then(() => {
    this.$('[data-autoid=submit]').click();
    assert.equal(this.$('[data-autoid=error-message]').text(), 'Bad manifest file (No kind attribute)');
  });
});

test('it shows an error if kind in manifest is not the specified', function(assert) {
  assert.expect(1);
  this.render(hbs`{{manifest-file-input kind="Fake"}}`);
  let blob = new window.Blob(['{"kind": "Pod"}'], {type: 'application/json'});
  let file = new window.File([blob], 'manifest.json');

  let event = Ember.$.Event('change', { target: { files: [file] } });
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
  let blob = new window.Blob(['{"kind": "Pod"}'], {type: 'application/json'});
  let file = new window.File([blob], 'manifest.json');

  let event = Ember.$.Event('change', { target: { files: [file] } });
  this.$('input:file').trigger(event);
  return wait().then(() => {
    this.$('[data-autoid=submit]').click();
  });

});
