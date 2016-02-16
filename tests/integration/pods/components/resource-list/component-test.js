import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('resource-list', 'Integration | Component | resource list', {
  integration: true
});

const makeResourceObjects = function(total) {
  let resources = [];
  for (let i = 0; i < total; i++) {
    const name = `name${i}`,
          namespace = `namespace${i}`,
          creationTimestamp = `2016-01-04T07:46:54.${i}Z`;
    resources.push({ metadata: { name, namespace, creationTimestamp } });
  }
  return resources;
};

test('it renders empty', function(assert) {
  assert.expect(1);
  this.set('model', []);
  this.render(hbs`{{resource-list kind='pod' resources=model}}`);
  const containers = this.$('[data-autoid^=container]');
  assert.equal(containers.length, 0);
});

test('it renders resource list', function(assert) {
  assert.expect(6);
  const model = makeResourceObjects(5);
  this.set('model', model);
  this.render(hbs`{{resource-list kind='pod' resources=model}}`);
  const containers = this.$('[data-autoid^=container]');
  assert.equal(containers.length, 5);
  assert.equal(this.$('[data-autoid=name0]').text().trim(), 'name0');
  assert.equal(this.$('[data-autoid=name4]').text().trim(), 'name4');
  assert.equal(this.$('[data-autoid=namespace0]').text().trim(), 'namespace0');
  assert.ok(this.$('[data-autoid=timestamp0]'));
  assert.equal(this.$('[data-autoid^=namespace]').length, 5);
});
