import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { getSpec } from 'kube-admin/mirage/factories/fakers';

moduleForComponent('spec-details', 'Integration | Component | spec details', {
  integration: true
});

test('it renders spec details with no containers', function(assert) {
  assert.expect(1);
  let spec = getSpec();
  spec.containers = [];
  this.set('spec', spec);

  this.render(hbs`{{spec-details spec=spec}}`);
  assert.equal(this.$('[data-autoid=node-name]').text().trim(), spec.nodeName);
});

test('it renders spec with containers', function(assert) {
  assert.expect(2);
  let spec = getSpec();
  spec.containers = [{ name: 'a', ports: [{ name: 'port-a', port: 8}] }];
  this.set('spec', spec);
  this.render(hbs`{{spec-details spec=spec}}`);
  assert.equal(this.$('[data-autoid=container0-name]').text().trim(), 'a');
  assert.ok(this.$('[data-autoid=container0-ports]').text().search('port-a'));
});

test('it renders spec with no ports in container', function(assert) {
  assert.expect(2);
  let spec = getSpec();
  spec.containers = [{ name: 'a', ports: [] }];
  this.set('spec', spec);
  this.render(hbs`{{spec-details spec=spec}}`);
  assert.equal(this.$('[data-autoid=container0-name]').text().trim(), 'a');
  assert.equal(this.$('[data-autoid=container0-ports]').text().trim(), 'No ports');
});
