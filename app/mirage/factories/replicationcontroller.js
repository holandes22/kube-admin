import Mirage from 'ember-cli-mirage';
import { getMetadata, getSpec } from './fakers';

export default Mirage.Factory.extend({
  kind: 'ReplicationController',
  metadata(i) {
    return getMetadata('replicationcontroller', i);
  },

  status(i) {
    return { replicas: i + 1, observedGeneration: i + 1 };
  },

  spec() {
    return { template: { spec: getSpec(true) }  };
  }
});
