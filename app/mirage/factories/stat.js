import Mirage from 'ember-cli-mirage';
import { faker } from 'ember-cli-mirage';
import { CONTAINER_MEMORY } from './fakers';

let getFilesystem = function() {
  let device = faker.random.arrayElement([
      '/dev/sda1',
      'docker-8:1-7083173-pool',
      '/dev/mapper/docker-8:1-7083173-8f138ecc6e8dc81a08b9fee2f256415e96de06a8eb4ab247bde008932fc53c3a'
  ]);
  let min = 1024, max = 1024 * 20;
  let capacity = faker.random.number({ min, max }),
      usage = faker.random.number({ min, max: capacity });
  return { device, capacity, usage };
};


export default Mirage.Factory.extend({

  timestamp() {
    // 2016-02-21T12:34:45.490370039Z
    return faker.date.recent();
  },

  cpu() {
    let total = faker.random.number({ min: 2000, max: 1000000 }),
        cpus = faker.random.number({ min:1, max: 10 }),
        per_cpu_usage = [],
        maxPerCpu = Math.round(total / cpus);
    for (let i = 1; i < cpus; i++) {
      per_cpu_usage.push(faker.random.number({ max: maxPerCpu }));
    }
    return { usage: { total, per_cpu_usage } };
  },

  memory() {
    return { usage: faker.random.number({ max: CONTAINER_MEMORY }) };
  },

  filesystem() {
    let filesystems = [];
    for (let i = 1; i <= faker.random.number({ max: 5 }); i++) {
      filesystems.push(getFilesystem());
    }
    return filesystems;
  }

});
