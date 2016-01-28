import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('settings-form', 'Integration | Component | settings form', {
  integration: true
});


test('it changes value on submit', function(assert) {
  this.render(hbs`{{settings-form}}`);
  assert.equal(this.$('input').val(), 'http://localhost:8080');
  this.$('input').val('HTTP://fake:9000');
  this.$('input').change();
  this.$('[data-autoid=submit]').click();
  assert.equal(this.$('input').val(), 'HTTP://fake:9000');
});

test('it shows error if host is empty', function(assert) {
  this.render(hbs`{{settings-form}}`);
  this.$('input').val('');
  this.$('input').change();
  const expected = "This field can't be blank,Host should include protocol (http:// or https://)";
  assert.equal(this.$('[data-autoid=error-message]').text(), expected);
});

test('it shows error if host has no protocol', function(assert) {
  this.render(hbs`{{settings-form}}`);
  this.$('input').val('Ht://fake');
  this.$('input').change();
  assert.ok(this.$('[data-autoid=submit]').hasClass('disabled'));
  assert.equal(this.$('[data-autoid=error-message]').text(), 'Host should include protocol (http:// or https://)');
});
