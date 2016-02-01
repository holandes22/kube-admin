import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('containers-details', 'Integration | Component | containers details', {
  integration: true
});

test('it renders with empty container list', function(assert) {
  this.set('containers', []);
  this.render(hbs`{{containers-details containers=containers}}`);

  assert.equal(this.$().text().trim(), '');
});


test('it renders with containers but no status', function(assert) {
  assert.expect(3);
  let containers = [{ name: 'a', ports: [{ name: 'port-a', port: 8}] }];
  this.set('containers', containers);
  this.render(hbs`{{containers-details containers=containers}}`);
  assert.equal(this.$('[data-autoid=container0-name]').text().trim(), 'a');
  assert.ok(this.$('[data-autoid=container0-ports]').text().search('port-a'));
  assert.ok(this.$('[data-autoid=container0-status]').empty());
});

test('it renders with no ports in container', function(assert) {
  assert.expect(2);
  let containers = [{ name: 'a', ports: [] }];
  this.set('containers', containers);
  this.render(hbs`{{containers-details containers=containers}}`);
  assert.equal(this.$('[data-autoid=container0-name]').text().trim(), 'a');
  assert.equal(this.$('[data-autoid=container0-ports]').length, 0);
});

test('it renders with container statuses', function(assert) {
  assert.expect(8);
  let containers = [{ name: 'a', ports: [] }];
  let containerStatuses = [
    {
      name: 'a',
      ready: true,
      restartCount: 0,
      imageID: 'docker://6022e6bce5a45fd34034122c3eca764a14facb947',
      containerID: 'docker://4fbdc1e3f273b94897963e849f810e439c1c8986907a6f3',
      state: { running: { startedAt: '2016-01-13T06:29:31Z' } },
      lastState: {}
    }
  ];
  this.set('containers', containers);
  this.set('containerStatuses', containerStatuses);
  this.render(hbs`{{containers-details containers=containers containerStatuses=containerStatuses}}`);
  assert.equal(this.$('[data-autoid=container0-name]').text().trim(), 'a');
  assert.equal(this.$('[data-autoid=container0-ready]').text().trim(), 'Yes');
  assert.equal(this.$('[data-autoid=container0-restartCount]').text().trim(), '0');
  assert.equal(this.$('[data-autoid=container0-imageID]').text().trim(), 'docker://6022e6bce5a45fd34034122c3eca764a14facb947');
  assert.equal(this.$('[data-autoid=container0-containerID]').text().trim(), 'docker://4fbdc1e3f273b94897963e849f810e439c1c8986907a6f3');
  assert.ok(this.$('[data-autoid=container0-state]').text().search('Running'));
  assert.ok(this.$('[data-autoid=container0-state]').text().search('Started at: 2016-01-13T06:29:31Z'));
  assert.equal(this.$('[data-autoid=container0-lastState]').text().trim(), 'None');
});
