import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('usage-bar', 'Integration | Component | usage bar', {
  integration: true
});

test('it updates percentage', function(assert) {
  this.set('percent', 12);

  this.render(hbs`{{usage-bar percent=percent color='blue'}}`);

  assert.equal(this.$('.progress').attr('data-percent'), 12);
  assert.equal(this.$().text().trim(), '12%');
  assert.ok(this.$('.progress').hasClass('blue'));
  assert.notOk(this.$('.progress').hasClass('error'));

  this.set('percent', 100);

  assert.equal(this.$('.progress').attr('data-percent'), 100);
  assert.ok(this.$('.progress').hasClass('error'));
  assert.notOk(this.$('.progress').hasClass('blue'));

});


test('it shows 0% and disables if percent is null', function(assert) {
  this.set('percent', null);

  this.render(hbs`{{usage-bar percent=percent label='fake'}}`);

  assert.equal(this.$('[data-id=label]').text().trim(), 'fake (No stats available)');
  assert.ok(this.$('.progress').hasClass('disabled'));

});
