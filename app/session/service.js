import Ember from 'ember';
import Cookies from 'ember-cli-js-cookie';


export default Ember.Service.extend({
  host: 'http://localhost:8080',

  log: {},

  init() {
    let defaults = [
      { key: 'host', value: 'http://localhost:8080' },
      { key: 'log.tailLines', value: 300 },
    ];

    Ember.$.each(defaults, (index, obj) => {
      let cookie = Cookies.get(obj.key);
      if (cookie) {
        this.set(obj.key, cookie);
      } else {
        this.set(obj.key, obj.value);
      }
    });
  }
});
