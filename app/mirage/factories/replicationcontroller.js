import Mirage from 'ember-cli-mirage';
import { getMetadata, getSpec } from './fakers';

export default Mirage.Factory.extend({
  metadata(i) {
    return getMetadata('replicationcontroller', i);
  },

  spec() {
    return getSpec();
  }
});
