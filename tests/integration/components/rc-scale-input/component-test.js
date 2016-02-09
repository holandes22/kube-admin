import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rc-scale-input', 'Integration | Component | rc scale input', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{rc-scale-input replicas=1}}`);
  assert.equal(this.$('input').val(), '1');
  assert.notOk(this.$('.ui.action.input').hasClass('error'));
});


test('it calls action with new value', function(assert) {
  let newReplicas = 5;
  let scale = function(replicas) {
    assert.equal(replicas, newReplicas);
  };
  this.set('actions', { scale });
  this.render(hbs`{{rc-scale-input replicas=1 action=(action "scale")}}`);
  this.$('input').val(newReplicas);
  this.$('input').change();
  this.$('button').click();
});


test('it disables button if input is negative', function(assert) {
  this.render(hbs`{{rc-scale-input replicas=1}}`);
  this.$('input').val(-1);
  this.$('input').change();
  assert.ok(this.$('button').hasClass('disabled'));
});

test('it disables button if input is null', function(assert) {
  this.render(hbs`{{rc-scale-input replicas=1}}`);
  this.$('input').val(null);
  this.$('input').change();
  assert.ok(this.$('button').hasClass('disabled'));
});

test('it disables button if input is float', function(assert) {
  this.render(hbs`{{rc-scale-input replicas=1}}`);
  this.$('input').val('1.10');
  this.$('input').change();
  assert.ok(this.$('button').hasClass('disabled'));
  assert.ok(this.$('.ui.action.input').hasClass('error'));
});

test('it disables button if value is same as original', function(assert) {
  this.render(hbs`{{rc-scale-input replicas=5}}`);
  assert.ok(this.$('button').hasClass('disabled'));

  this.$('input').val('1');
  this.$('input').change();
  assert.notOk(this.$('button').hasClass('disabled'));

  this.$('input').val('5');
  this.$('input').change();
  assert.ok(this.$('button').hasClass('disabled'));

  assert.notOk(this.$('.ui.action.input').hasClass('error'));
});
