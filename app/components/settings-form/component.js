import Ember from 'ember';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';



const Validations = buildValidations({
  host: [
    validator('presence', true),
    validator('format', {
      regex: /^https?:\/\/.*$/i,
      message: 'Host should include protocol (http:// or https://)'
    })
  ],
  tailLines: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      integer: true,
      positive: true,
      lte: 5000
    })
  ]
});

export default Ember.Component.extend(Validations, {

  keyMap: {
    tailLines: 'log.tailLines'
  },

  session: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.set('host',  this.get('session').host);
    this.set('tailLines',  this.get('session').log.tailLines);
  },

  actions: {
    saveSetting(key) {
      let sessionKey = this.keyMap[key] ? this.keyMap[key] : key,
          value = this.get(key);
      this.get('session').setAttr(sessionKey, value);
    }
  }
});
