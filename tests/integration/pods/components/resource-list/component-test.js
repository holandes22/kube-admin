import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import makeResourceObjects from '../../../../helpers/make-resource-objects';


moduleForComponent('resource-list', 'Integration | Component | resource list', {
  integration: true
});

test('it renders empty', function(assert) {
  assert.expect(1);
  const type = 'pod';
  this.set('type', type);
  this.render(hbs`{{resource-list type=type}}`);
  assert.equal(this.$('div.button').text().trim(), 'Create Pod');
});

test('it renders resource list', function(assert) {
  assert.expect(5);
  const model = makeResourceObjects(10);
  this.set('model', model);
  this.render(hbs`{{resource-list type='pod' resources=model}}`);
  assert.equal(this.$('[data-autoid=container]').length, 10);
  assert.equal(this.$('[data-autoid=name0]').text().trim(), 'name0');
  assert.equal(this.$('[data-autoid=namespace0]').text().trim(), 'namespace0');
  assert.equal(this.$('[data-autoid=timestamp0]').text().trim(), '0');
  assert.equal(this.$('[data-autoid^=namespace]').length, 10);
});

test('it does not render namespace if type namespace', function(assert) {
  assert.expect(1);
  const model = makeResourceObjects(10);
  this.set('model', model);
  this.render(hbs`{{resource-list type='namespace' resources=model}}`);
  assert.equal(this.$('[data-autoid^=namespace]').length, 0);
});
