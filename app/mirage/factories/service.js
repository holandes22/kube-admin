import Mirage from 'ember-cli-mirage';
import { faker } from 'ember-cli-mirage';
import { getMetadata, getPorts } from './fakers';

export default Mirage.Factory.extend({
  kind: 'Service',

  metadata(i) {
    return getMetadata('service', i);
  },

  spec() {
    const clusterIP = faker.internet.ip(),
          sessionAffinity = 'None',
          ports = getPorts();
    return { ports, clusterIP, sessionAffinity };
  }
});
