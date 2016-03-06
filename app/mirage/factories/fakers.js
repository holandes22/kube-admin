import { faker } from 'ember-cli-mirage';
import lodash from 'npm:lodash';

export const CONTAINER_MEMORY = 8023089152;

export function getPorts(isContainer=false) {
  let ports = [];
  for (let j = 1; j <= faker.random.number({ max: 3 }); j++) {
    let obj = {
      name: faker.hacker.noun(),
      protocol: 'TCP',
    };
    obj[isContainer ? 'hostPort': 'port'] = faker.random.number();
    obj[isContainer ? 'containerPort': 'targetPort'] = faker.random.number();
    ports.push(obj);
  }
  return ports;
}


export function getLabels() {
  let labels = {};
  for (let j = 1; j <= faker.random.number({ max: 3 }); j++) {
    labels[faker.hacker.verb()] = faker.hacker.noun();
  }
  return labels;
}


export function getSpec(isContainer=false) {
  let containers = [];
  for (let j = 1; j <= faker.random.number({ min: 1, max: 5 }); j++) {
    const name = faker.hacker.verb();
    containers.push({
      name,
      image: `${name}:v${j / 2}`,
      ports: getPorts(isContainer),
      terminationMessagePath: '/dev/termination-log',
      imagePullPolicy: faker.random.arrayElement(['Always', 'Never', 'IfNotPresent'])
    });
  }
  return {
    containers,
    restartPolicy: faker.random.arrayElement(['Always', 'OnFailure', 'Never']),
    terminationGracePeriodSeconds: faker.random.number(),
    dnsPolicy: faker.random.arrayElement(['ClusterFirst', 'Default']),
    nodeName: faker.internet.ip(),
    hostNetwork: faker.random.boolean()
  };
}


export function getId(kind, index) {
  return `${kind.toLowerCase()}-${index}`;
}


export function getMetadata(kind='Node', index=0, namespace=null) {
  let name =  getId(kind, index),
      creationTimestamp = faker.date.recent(),
      labels = getLabels();
  if (!namespace && kind !== 'Node') {
      namespace = faker.random.arrayElement(['default', 'kube-system', 'app-namespace']);
  }

  return { name, namespace, creationTimestamp, labels };
}


export function getCAdvisorContainerSpec() {
  return {
    creation_time: faker.date.recent(),
    has_cpu: true,
    has_memory: true,
    has_filesystem: true,
    memory: {
      limit: CONTAINER_MEMORY
      }
    };
}

export function getStat(total, timestamp, cpus=4) {
  let per_cpu_usage = [],
      maxPerCpu = Math.round(total / cpus);
  for (let i = 1; i < cpus; i++) {
    per_cpu_usage.push(faker.random.number({ max: maxPerCpu }));
  }
  let cpu = { usage: { total, per_cpu_usage } },
      memory = { usage: faker.random.number({ max: CONTAINER_MEMORY }) },
      filesystems = [],
      devices = [
        '/dev/sda1',
        'docker-8:1-7083173-pool',
        '/dev/mapper/docker-8:1-7083173-8f138ecc6e8dc81a08b9fee2f256415e96de06a8eb4ab247bde008932fc53c3a'
      ];

  lodash.each(devices, (device) => {
    let min = 1024,
        max = 1024 * 20,
        capacity = faker.random.number({ min, max }),
        usage = faker.random.number({ min, max: capacity });
    filesystems.push({ device, capacity, usage });

  });

  return { timestamp, cpu, memory, filesystem: filesystems };

}
