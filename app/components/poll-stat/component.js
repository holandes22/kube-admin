import Ember from 'ember';
import lodash from 'npm:lodash';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({

  tagName: '',

  kubeClient: Ember.inject.service(),

  interval: 2000,

  getCpuUsagePercentage(spec, stats) {
    let percentage = null;
    if (spec.has_cpu && stats && stats.length >= 2) {
      let current = stats[0],
          prev = stats[1],
          cpus = current.cpu.usage.per_cpu_usage.length,
          usage = current.cpu.usage.total - prev.cpu.usage.total,
          interval = (new Date(current.timestamp).getTime() - new Date(prev.timestamp).getTime()) * 1000000;
      percentage = Math.round(((usage / interval) / cpus) * 100 );
      if (percentage > 100) {
        percentage = 100;
      }
    }
    return percentage;
  },

  stat: Ember.computed('stats', function() {
    let stats = this.get('stats');
    if (!stats) {
      return null;
    }

    let spec = stats.spec,
        stat = stats.stats[0],
        cpu = { percent: this.getCpuUsagePercentage(spec, stats.stats) },
        memory = { percent: Math.round((stat.memory.usage * 100) / spec.memory.limit) };
    let filesystems = [];
    Ember.$.each(stat.filesystem, (index, fs) => {
      let total = fs.capacity,
          usage = fs.usage,
          percent = Math.round((usage * 100) / total),
          device = fs.device;

      filesystems.push({ percent, device });
    });
    filesystems = lodash.orderBy(filesystems, ['device']);
    return { cpu, memory, filesystems, timestamp: stat.timestamp };
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
