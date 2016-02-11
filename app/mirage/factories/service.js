import { faker } from 'ember-cli-mirage';
import { getPorts } from './fakers';
import ResourceBaseFactory from './resource-base';

export default ResourceBaseFactory.extend({
  kind: 'Service',

  spec() {
    const clusterIP = faker.internet.ip(),
          sessionAffinity = 'None',
          ports = getPorts();
    return { ports, clusterIP, sessionAffinity };
  }
});
