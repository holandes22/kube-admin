import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { getPorts } from 'kube-admin/mirage/factories/fakers';


moduleForComponent('container-details', 'Integration | Component | container details', {
  integration: true
});

test('it renders with no ports', function(assert) {
  assert.expect(9);
  let container = {
    name: 'a',
    imagePullPolicy: 'Always',
  };
  let status = {
    ready: true,
    restartCount: 0,
    imageID: 'docker://6022e6bce5a45fd34034122c3eca764a14facb947',
    containerID: 'docker://4fbdc1e3f273b94897963e849f810e439c1c8986907a6f3',
    state: { running: { startedAt: '2016-01-13T06:29:31Z' } },
    lastState: {}
  };
  this.set('container', container);
  this.set('status', status);
  this.render(hbs`{{container-details container=container status=status}}`);
  assert.equal(this.$('[data-autoid=name]').text().trim(), container.name);
  assert.equal(this.$('[data-autoid=ready]').text().trim(), 'Yes');
  assert.equal(this.$('[data-autoid=restartCount]').text().trim(), '0');
  assert.equal(this.$('[data-autoid=imageID]').text().trim(), status.imageID);
  assert.equal(this.$('[data-autoid=containerID]').text().trim(), status.containerID);
  assert.ok(this.$('[data-autoid=state]').text().search('Running'));
  assert.ok(this.$('[data-autoid=state]').text().search('Started at: 2016-01-13T06:29:31Z'));
  assert.equal(this.$('[data-autoid=lastState]').text().trim(), 'None');
  assert.equal(this.$('[data-autoid=ports]').text(), '');
});
test('it renders with ports', function(assert) {
  assert.expect(11);
  let container = {
    name: 'no ports',
    image: 'no-ports:v1',
    ports: [{
      name: 'p1',
      hostPort: 10999,
      containerPort: 12888,
      protocol: 'TCP'
    }]
  };
  let status = {
    ready: false,
    restartCount: 15,
    imageID: 'docker://6022e6bce5a45fd34034122c3eca764a14facb947',
    containerID: 'docker://4fbdc1e3f273b94897963e849f810e439c1c8986907a6f3',
    state: { running: { startedAt: '2016-01-13T06:29:31Z' } },
    lastState: { running: { startedAt: '2016-01-02T06:29:31Z' } },
  };
  this.set('container', container);
  this.set('status', status);
  this.render(hbs`{{container-details container=container status=status}}`);
  assert.equal(this.$('[data-autoid=name]').text().trim(), container.name);
  assert.equal(this.$('[data-autoid=ready]').text().trim(), 'No');
  assert.equal(this.$('[data-autoid=restartCount]').text().trim(), '15');
  assert.equal(this.$('[data-autoid=imageID]').text().trim(), status.imageID);
  assert.equal(this.$('[data-autoid=containerID]').text().trim(), status.containerID);
  assert.ok(this.$('[data-autoid=state]').text().search('Running'));
  assert.ok(this.$('[data-autoid=state]').text().search('Started at: 2016-01-13T06:29:31Z'));
  assert.equal(this.$('[data-autoid=lastState]').text().trim(), 'Running');
  assert.ok(this.$('[data-autoid=ports]').text().search('10999'));
  assert.ok(this.$('[data-autoid=ports]').text().search('12888'));
  assert.ok(this.$('[data-autoid=ports]').text().search('p1'));
});
