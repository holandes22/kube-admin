import Mirage from 'ember-cli-mirage';
import { faker } from 'ember-cli-mirage';
import { getMetadata, getSpec } from './fakers';

export default Mirage.Factory.extend({
  metadata(i) {
    return getMetadata('pod', i);
  },

  status(i) {
    const hostIP = faker.internet.ip(),
          podIP = faker.internet.ip(),
          startTime = faker.date.recent();
    let containerStatuses = [{
      name: faker.hacker.adjective(),
      image: `image${i}:v${i}`,
      ready: faker.random.boolean(),
      restartCount: i
    }];
    return { hostIP, podIP, startTime, containerStatuses };
  },

  spec() {
    return getSpec();
  }
});
