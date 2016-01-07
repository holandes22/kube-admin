import Mirage from 'ember-cli-mirage';
import { faker } from 'ember-cli-mirage';
import { getLabels, getSpec } from './fakers';

export default Mirage.Factory.extend({
  metadata(i) {
    const name =  `replicationcontroller${i}`,
          namespace = 'default',
          creationTimestamp = faker.date.recent(),
          labels = getLabels();
    return { name, namespace, creationTimestamp, labels };
  },

  spec() {
    return getSpec();
  }
});
