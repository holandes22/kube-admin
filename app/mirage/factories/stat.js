import Mirage from 'ember-cli-mirage';
import { faker } from 'ember-cli-mirage';
import { CONTAINER_MEMORY } from './fakers';

let getFilesystem = function() {
  let device = faker.random.arrayElement([
      '/dev/sda1',
      'docker-8:1-7083173-pool',
      '/dev/mapper/docker-8:1-7083173-8f138ecc6e8dc81a08b9fee2f256415e96de06a8eb4ab247bde008932fc53c3a'
  ]);
  let min = 12589133824, max = 1258913382400;
  let capacity = faker.random.number({ min, max }),
      usage = faker.random.number({ min, max }),
      available = faker.random.number({ min, max });
  return { device, capacity, usage, available };
};


export default Mirage.Factory.extend({

  timestamp() {
    return faker.date.recent();
  },

  cpu() {
    let max = 15668881748990,
        cpus = faker.random.number({ min:1, max: 10 }),
        per_cpu_usage = [],
        max_per_cpu = max / cpus;
    for (let i = 1; i <= cpus; i++) {
      per_cpu_usage.push(faker.random.number({ max: max_per_cpu }));
    }

    return {
      usage: {
        total: faker.random.number({ max }),
        per_cpu_usage
      }
    };
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
