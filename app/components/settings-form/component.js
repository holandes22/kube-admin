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
  ]
});

export default Ember.Component.extend(Validations, {
  host: null,

  session: Ember.inject.service(),

  didInsertElement() {
    this.set('host',  this.get('session').host);
  },

  actions: {
    saveSettings() {
      this.get('session').set('host', this.get('host'));
    }
  }
});
