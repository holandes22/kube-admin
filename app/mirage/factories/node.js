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

    let nodeInfo = {
      machineID: 'fc8074bde4104c8096d0a477ea51bc21',
      systemUUID: faker.random.uuid().toUpperCase(),
      bootID: 'eb93e345-e375-4d2f-ae8b-58467249e549',
      kernelVersion: '4.4.1-2-ARCH',
      osImage: 'Debian GNU/Linux 8 (jessie)',
      containerRuntimeVersion: 'docker://1.9.1',
      kubeletVersion: 'v1.1.2',
      kubeProxyVersion: 'v1.1.2'

    };
    return { capacity, conditions, addresses, nodeInfo };
  },

  spec() {
    return { externalID: faker.internet.ip() };
  }
});
