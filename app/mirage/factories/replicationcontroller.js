import Mirage from 'ember-cli-mirage';
import { getId, getMetadata, getSpec } from './fakers';

export default Mirage.Factory.extend({
  kind: 'ReplicationController',

  id(i) {
    return getId(this.kind, i);
  },

  metadata(i) {
    return getMetadata(this.kind, i);
  },

  status(i) {
    return { replicas: i + 1, observedGeneration: i + 1 };
  },

  spec() {
    return { replicas: 1, template: { spec: getSpec(true) }  };
  }
});
