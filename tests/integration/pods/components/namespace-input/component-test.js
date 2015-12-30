import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('namespace-input', 'Integration | Component | namespace input', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{namespace-input}}`);
  assert.equal(this.$().text().trim(), 'Create');
});

test('it shows an error if name is empty', function(assert) {
  assert.expect(1);
  this.render(hbs`{{namespace-input}}`);
  this.$('[data-autoid=submit]').click();
  assert.equal(
    this.$('[data-autoid=error-message]').text(),
    "This field can't be blank"
  );
});

test('it shows an error if name too long', function(assert) {
  assert.expect(1);
  this.render(hbs`{{namespace-input}}`);
  const name = new Array(120).join('a');
  this.$('input').val(name).trigger('change');
  this.$('[data-autoid=submit]').click();
  assert.equal(
    this.$('[data-autoid=error-message]').text(),
    'This field is too long (maximum is 100 characters)'
  );
});

test('it passes up the manifest', function(assert) {
  assert.expect(1);
  const name = 'Pillars of eternity';
  const expected = {
    'apiVersion' : 'v1',
    'kind' : 'Namespace',
    'metadata' : { name }
  };
  const create = function(manifest) {
    assert.deepEqual(expected, manifest);
  };
  this.set('actions', { create });

  this.render(hbs`{{namespace-input action=(action "create")}}`);

  this.$('input').val(name).trigger('change');
  this.$('[data-autoid=submit]').click();
});
