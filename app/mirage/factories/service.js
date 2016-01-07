import Mirage, { faker } from 'ember-cli-mirage';
import { getPorts } from './fakers';

export default Mirage.Factory.extend({
  metadata(i) {
    const name =  `service${i}`,
          namespace = 'default',
          creationTimestamp = faker.date.recent();
    return { name, namespace, creationTimestamp };
  },

  spec(i) {
    const clusterIP = faker.internet.ip(),
          sessionAffinity = 'None',
          ports = getPorts();
    return { ports, clusterIP, sessionAffinity };
  }

});
