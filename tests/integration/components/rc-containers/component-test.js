import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rc-containers', 'Integration | Component | rc containers', {
  integration: true
});


test('it renders with empty container list', function(assert) {
  this.set('containers', []);
  this.render(hbs`{{rc-containers containers=containers}}`);
  assert.equal(this.$().text().trim(), '');
});

test('it renders with no ports', function(assert) {
  assert.expect(2);
  let containers = [{ name: 'a', ports: [] }];
  this.set('containers', containers);
  this.render(hbs`{{rc-containers containers=containers}}`);
  assert.equal(this.$('[data-autoid=container0-name]').text().trim(), 'a');
  assert.equal(this.$('[data-autoid=container0-ports]').length, 0);
});


test('it renders with ports', function(assert) {
  assert.expect(3);
  let containers = [{ name: 'a', ports: [{ name: 'port-a', port: 8}] }];
  this.set('containers', containers);
  this.render(hbs`{{rc-containers containers=containers}}`);
  assert.equal(this.$('[data-autoid=container0-name]').text().trim(), 'a');
  assert.ok(this.$('[data-autoid=container0-ports]').text().search('port-a'));
  assert.ok(this.$('[data-autoid=container0-status]').empty());
});
