import { getSpec } from './fakers';
import ResourceBaseFactory from './resource-base';

export default ResourceBaseFactory.extend({
  kind: 'ReplicationController',

  status(i) {
    return { replicas: i + 1, observedGeneration: i + 1 };
  },

  spec() {
    return { replicas: 1, template: { spec: getSpec(true) }  };
  }
});
