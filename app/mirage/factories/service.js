import Mirage from 'ember-cli-mirage';
import { faker } from 'ember-cli-mirage';
import { getId, getMetadata, getPorts } from './fakers';

export default Mirage.Factory.extend({
  kind: 'Service',

  id(i) {
    return getId(this.kind, i);
  },

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
