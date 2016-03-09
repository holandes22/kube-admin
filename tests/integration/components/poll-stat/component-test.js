import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import { getCAdvisorContainerSpec } from 'kube-admin/mirage/factories/fakers';

const getFakeStats = function() {
  // These values give 50% CPU, Memory and FS usage
  let cpu = { usage: { total: 12435000000000, per_cpu_usage: [1, 2] } },
      memory = { usage: 8589934592 },
      filesystem = [
        { device: '/dev/sda1', capacity: 8589934592, usage: 4294967296 }
      ];

  let current = {cpu, memory, filesystem, timestamp: '2016-02-21T13:18:01.985517833Z'};
  cpu = { usage: { total: 12434000000000, per_cpu_usage: [1, 2] } };
  let prev = {cpu, memory, filesystem, timestamp: '2016-02-21T13:18:00.985517833Z'};

  let spec = getCAdvisorContainerSpec();
  spec.memory.limit = 8589934592 * 2;
  return {
    name: '/',
    spec,
    stats: [current, prev]
  };
};

const kubeClientStub = Ember.Service.extend({

  error: false,

  fakeStats: getFakeStats(),

  getStats() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (this.get('error')) {
        reject('blah');
      } else {
        resolve(this.get('fakeStats'));
      }
    });
  }

});

moduleForComponent('poll-stat', 'Integration | Component | poll stat', {
  integration: true,
  beforeEach: function () {
    this.register('service:kube-client', kubeClientStub);
    this.inject.service('kube-client', { as: 'kubeClient' });
  }
});

test('it shows stats', function(assert) {
  this.render(hbs`{{poll-stat node='fake'}}`);

  assert.equal(this.$('[data-id=cpu]').text().replace(/[\t\n\s]+/g, ''), '50%CPU');
  assert.equal(this.$('[data-id=memory]').text().replace(/[\t\n\s]+/g, ''), '50%Memory');
  assert.equal(this.$('[data-id=fs-0]').text().trim(), '50%');
});

test('it indicates no stats if has no stats data', function(assert) {
  this.get('kubeClient').set('fakeStats.spec.has_cpu', false);
  this.get('kubeClient').set('fakeStats.spec.has_memory', false);
  this.render(hbs`{{poll-stat node='fake'}}`);

  assert.equal(this.$('[data-id=cpu]').text().replace(/[\t\n\s]+/g, ''), 'CPU(Nostatsavailable)');
  assert.equal(this.$('[data-id=memory]').text().replace(/[\t\n\s]+/g, ''), 'Memory(Nostatsavailable)');
  assert.equal(this.$('[data-id=fs-0]').text().trim(), '50%');
});

test('it indicates no storage stats if has no stats data for filesystem', function(assert) {
  this.get('kubeClient').set('fakeStats.spec.has_filesystem', false);
  this.render(hbs`{{poll-stat}}`);

  assert.equal(this.$('[data-id=fs-unavailable]').text().trim(), 'No storage stats available');
});

test('it indicates no storage stats if error', function(assert) {
  this.get('kubeClient').set('error', true);
  this.render(hbs`{{poll-stat}}`);

  assert.equal(this.$('[data-id=stats-unavailable]').text().trim(), 'No stats available');
});
