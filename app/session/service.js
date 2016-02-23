import Ember from 'ember';
import Cookies from 'ember-cli-js-cookie';


export default Ember.Service.extend({
  host: 'http://localhost:8080',

  log: {
    tailLines: 500
  },

  filters: {},

  pendingRemoval: { pod: [], replicationcontroller: [], service: [] },

  init() {
    this._super(...arguments);
    let keys = ['host', 'log.tailLines'];

    Ember.$.each(keys, (_, key) => {
      let cookie = Cookies.get(key);
      if (cookie) {
        this.set(key, cookie);
      }
    });
  }
});
