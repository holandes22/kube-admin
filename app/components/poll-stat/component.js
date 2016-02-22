import Ember from 'ember';
import lodash from 'npm:lodash';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({

  tagName: '',

  port: 4194,

  kubeClient: Ember.inject.service(),

  interval: 2500,

  getCpuUsagePercentage(spec, stats) {
    let percentage = null;
    if (spec.has_cpu && stats && stats.length >= 2) {
      let current = stats[stats.length - 1],
          prev = stats[stats.length - 2],
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

    let spec = stats.spec, stat = lodash.last(stats.stats),
        cpu = null, memory = null, filesystem = null;


    if (spec.has_cpu) {
      cpu = { percent: this.getCpuUsagePercentage(spec, stats.stats) };
    }
    if (spec.has_memory) {
      memory = { percent: Math.round((stat.memory.usage * 100) / spec.memory.limit) };
    }
    if (spec.has_filesystem) {
      let filesystems = [];
      Ember.$.each(stat.filesystem, (index, fs) => {
        let total = fs.capacity,
            usage = fs.usage,
            percent = Math.round((usage * 100) / total),
            device = fs.device;

        filesystems.push({ percent, device });
      });
      filesystem = lodash.orderBy(filesystems, ['device']);
    }
    return { cpu, memory, filesystem, timestamp: stat.timestamp };
  }),

  poll: task(function * () {
    let node = this.get('node'),
        interval = this.get('interval'),
        errorHandler = function(error) {
          window.console.warn('Got error response from cAdvisor while polling stats:', error.message);
        };

    while (true) {

      this.get('kubeClient').getStats(node).then((stats) => {
        this.set('stats', stats);
      }).catch(errorHandler);

      yield timeout(interval);

    }

  }).on('init'),

  actions: {
    cancel() {
      this.get('poll').cancelAll();
    }
  }

});
