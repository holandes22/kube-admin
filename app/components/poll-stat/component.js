import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({

  tagName: '',

  kubeClient: Ember.inject.service(),

  interval: 2000,

  stat: Ember.computed('stats', function() {
    let stats = this.get('stats');
    if (!stats) {
      return null;
    }

    let spec = stats.spec,
        stat = stats.stats[0],
        total = stat.cpu.usage.total,
        usage = total - stat.cpu.usage.per_cpu_usage.reduce((a, b) => a + b, 0),
        cpu = { total, usage },
        memory = { total: spec.memory.limit, usage: stat.memory.usage };

    return { cpu, memory, filesystems: stat.filesystem, timestamp: stat.timestamp };
  }),

  poll: task(function * () {
    let node = this.get('node'),
        interval = this.get('interval');

    while (true) {

      this.get('kubeClient').getStat(node).then((stats) => {
        this.set('stats', stats);
      });

      yield timeout(interval);

    }

  }).on('init'),

  actions: {
    cancel() {
      this.get('poll').cancelAll();
    }
  }

});
