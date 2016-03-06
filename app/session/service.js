import Ember from 'ember';
import Cookies from 'npm:js-cookie';
import ENV from 'kube-admin/config/environment';

const { persistSession } = ENV.APP;

export default Ember.Service.extend({
  host: 'http://localhost:8080',

  log: {
    tailLines: 500
  },

  showSystemResources: false,

  filters: {},

  pendingRemoval: { pod: [], replicationcontroller: [], service: [] },

  init() {
    this._super(...arguments);
    if (persistSession) {
      let keys = ['host', 'log.tailLines', 'showSystemResources'];

      Ember.$.each(keys, (_, key) => {
        let cookie = Cookies.get(key);
        if (cookie === 'false') {
          cookie = false;
        }

        if (cookie === 'true') {
          cookie = true;
        }

        if (cookie) {
          this.set(key, cookie);
        }
      });
    }
  },

  setAttr(key, value) {
    if (persistSession) {
      Cookies.set(key, value);
    }
    this.set(key, value);
  }
});
