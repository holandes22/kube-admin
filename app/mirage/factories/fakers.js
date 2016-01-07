import { faker } from 'ember-cli-mirage';


export function getPorts() {
    const count = faker.random.arrayElement([1, 3]);
    let ports = [];
    for (let j = 1; j <= count; j++) {
      ports.push({
        name: faker.hacker.noun(),
        protocol: 'TCP',
        port: faker.random.number(),
        targetPort: faker.random.number()
      });
    }
    return ports;
}


export function getLabels() {
  const count = faker.random.arrayElement([1, 2, 3]);
  let labels = {};
  for (let j = 0; j <= count; j++) {
    labels[faker.hacker.verb()] = faker.hacker.noun();
  }
  return labels;
}


export function getSpec() {
  let containers = [];
  const count = faker.random.arrayElement([1, 2, 5]);
  for (let j = 1; j <= count; j++) {
    const name = faker.hacker.verb();
    containers.push({
      name,
      image: `${name}:latest`,
      ports: getPorts(),
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
