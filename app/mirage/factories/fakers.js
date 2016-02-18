import { faker } from 'ember-cli-mirage';


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


export function getMetadata(kind = 'namespace', index = 0) {
  const name =  getId(kind, index),
        namespace = faker.random.arrayElement(['default', 'system', 'app-namespace']),
        creationTimestamp = faker.date.recent(),
        labels = getLabels();
  return { name, namespace, creationTimestamp, labels };
}
