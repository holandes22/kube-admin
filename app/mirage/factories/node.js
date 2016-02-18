import { faker } from 'ember-cli-mirage';
import ResourceBaseFactory from './resource-base';


let conditions = [
  {
    type: 'Ready',
    status: 'True',
    reason: 'KubeletReady',
    message: 'kubelet is posting ready status'
  },
  {
    type: 'OutOfDisk',
    status: 'False',
    reason: 'KubeletHasSufficientDisk',
    message: 'kubelet has sufficient disk space available'
  }
];

let getCondition = function() {
  let condition = faker.random.arrayElement(conditions);
  condition.lastHeartbeatTime = faker.date.recent();
  condition.lastTransitionTime = faker.date.recent();
  return condition;
};

export default ResourceBaseFactory.extend({
  kind: 'Node',

  status() {
    let capacity = {
      cpu: faker.random.number({ min: 1, max: 40 }),
      memory: `${faker.random.number()}Ki`,
      pods: faker.random.number({ max: 100 })
    };
    let conditions = [];
    for (let i = 0; i <= faker.random.number({ max: 2 }); i++) {
      conditions.push(getCondition());
    }

    let addresses = [
      { type: 'internalIP', address: faker.internet.ip() },
      { type: 'LegacyHostIP', address: faker.internet.ip() }
    ];
    return { capacity, conditions, addresses };
  },

  spec() {
    return { externalID: faker.internet.ip() };
  }
});
