import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { getMetadata, getSpec } from 'kube-admin/mirage/factories/fakers';

moduleForComponent('resource-details', 'Integration | Component | resurce details', {
  integration: true
});

test('it renders with no extra details and no spec', function(assert) {
  let metadata = getMetadata();
  this.set('model', { kind: 'Pod', metadata });
  this.render(hbs`{{resource-details model=model}}`);
  assert.equal(this.$('[data-autoid=name]').text(), metadata.name);
  assert.equal(this.$('[data-autoid^=detail-container]').length, 0);
});

test('it renders with extra details, no spec and block', function(assert) {
  let metadata = getMetadata();
  let stats = { keyOne: 'key1' };
  this.set('model', { kind: 'Pod', metadata, stats });
  this.render(hbs`
    {{#resource-details model=model keys='stats.keyOne'}}
      <div data-autoid="extra-block">
        template block text
      </div>
    {{/resource-details}}
  `);
  assert.equal(this.$('[data-autoid=name]').text(), metadata.name);
  assert.equal(this.$('[data-autoid=extra-block]').text().trim(), 'template block text');
  assert.equal(this.$('[data-autoid^=detail-container]').length, 1);
});

test('it renders with extra details and no spec', function(assert) {
  let metadata = getMetadata();
  let stats = {
    keyOne: 'key1',
    keyTwo: 'key2'
  };
  this.set('model', { kind: 'Pod', metadata, stats });
  this.render(hbs`{{resource-details model=model keys='stats.keyOne'}}`);
  assert.equal(this.$('[data-autoid=name]').text(), metadata.name);
  assert.equal(this.$('[data-autoid^=detail-container]').length, 1);
});

test('it renders with no details and spec', function(assert) {
  let metadata = getMetadata(),
      spec = getSpec();
  this.set('model', { kind: 'Pod', metadata, spec });
  this.render(hbs`{{resource-details model=model spec=model.spec}}`);
  assert.equal(this.$('[data-autoid=name]').text(), metadata.name);
  assert.equal(this.$('[data-autoid=restartPolicy]').text(), spec.restartPolicy);
  assert.equal(this.$('[data-autoid^=detail-container]').length, 0);
});

test('it renders with details and spec', function(assert) {
  let metadata = getMetadata(),
      spec = getSpec();
  const stats = {
    keyOne: 'key1',
    keyTwo: 'key2'
  };
  this.set('model', { kind: 'Pod', metadata, spec, stats });
  this.render(hbs`{{resource-details model=model spec=model.spec keys='stats.keyOne,stats.keyTwo'}}`);
  assert.equal(this.$('[data-autoid=name]').text(), metadata.name);
  assert.equal(this.$('[data-autoid=restartPolicy]').text(), spec.restartPolicy);
  assert.equal(this.$('[data-autoid^=detail-container]').length, 2);
  assert.equal(this.$('[data-autoid=detail-label0]').text(), 'Key one');
  assert.equal(this.$('[data-autoid=detail-value0]').text(), 'key1');
  assert.equal(this.$('[data-autoid=detail-label1]').text(), 'Key two');
  assert.equal(this.$('[data-autoid=detail-value1]').text(), 'key2');
});
