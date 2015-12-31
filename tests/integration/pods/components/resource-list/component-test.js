import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import makeResourceObjects from '../../../../helpers/make-resource-objects';


moduleForComponent('resource-list', 'Integration | Component | resource list', {
  integration: true
});

test('it renders empty', function(assert) {
  assert.expect(1);
  const model = [];
  this.set('model', model);
  this.render(hbs`{{resource-list type='pod' resources=model}}`);
  const containers = this.$('[data-autoid^=container]');
  assert.equal(containers.length, 0);
});

test('it renders resource list', function(assert) {
  assert.expect(5);
  const model = makeResourceObjects(10);
  this.set('model', model);
  this.render(hbs`{{resource-list type='pod' resources=model}}`);
  const containers = this.$('[data-autoid^=container]');
  assert.equal(containers.length, 10);
  assert.equal(this.$('[data-autoid=name0]').text().trim(), 'name0');
  assert.equal(this.$('[data-autoid=namespace0]').text().trim(), 'namespace0');
  assert.equal(this.$('[data-autoid=timestamp0]').text().trim(), '0');
  assert.equal(this.$('[data-autoid^=namespace]').length, 10);
});

test('it does not render namespace if type namespace', function(assert) {
  assert.expect(2);
  const model = makeResourceObjects(5);
  this.set('model', model);
  this.render(hbs`{{resource-list type='namespace' resources=model}}`);
  const containers = this.$('[data-autoid^=container]');
  assert.equal(containers.length, 5);
  assert.equal(this.$('[data-autoid^=namespace]').length, 0);
});
