import Mirage from 'ember-cli-mirage';
import { faker } from 'ember-cli-mirage';
import { getMetadata, getSpec } from './fakers';

let spec = getSpec(true);

let getState = function() {
  let type = faker.random.arrayElement(['running', 'waiting', 'terminated']),
      state = {};
  state[type] = {
    reason: faker.lorem.sentence(),
    exitCode: faker.random.number(),
    startedAt: faker.date.recent() ,
    finishedAt: faker.date.recent()
  };
  return state;
};

export default Mirage.Factory.extend({
  kind: 'Pod',

  metadata(i) {
    return getMetadata('pod', i);
  },

  status(i) {
    const hostIP = faker.internet.ip(),
          podIP = faker.internet.ip(),
          phase = faker.random.arrayElement(['Pending', 'Running', 'Succeded', 'Failed', 'Unknown']),
          startTime = faker.date.recent();
    let containerStatuses = [];
    if (phase !== 'Pending' && phase !== 'Unknown') {
      spec.containers.map((container) => {
        containerStatuses.push({
          name: container.name,
          image: container.image,
          ready: faker.random.boolean(),
          restartCount: i,
          imageID: `docker://a1c7d02c4d861248b9a6ef93447cbc5cdd25a5ef2a037e8402bbd85ccca5350${i}`,
          containerID: `docker://23a0ee935e18956cf7b15ec9211cb709a4422068f211702c038df383f0605e7${i}`,
          state: getState(),
          lastState: getState()
        });
      });
    }
    return { hostIP, podIP, phase, startTime, containerStatuses };
  },

  spec() {
    return spec;
  }
});
