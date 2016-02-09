import Mirage from 'ember-cli-mirage';
import { getId, getMetadata } from './fakers';

export default Mirage.Factory.extend({
  kind: 'Namespace',

  id(i) {
    return getId(this.kind, i);
  },

  metadata(i) {
    return getMetadata(this.kind, i);
  },

});
