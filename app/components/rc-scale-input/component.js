import Ember from 'ember';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';


const Validations = buildValidations({
  value: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      integer: true,
      gte: 0
    })
  ]
});

export default Ember.Component.extend(Validations, {
  value: Ember.computed('replicas', function() {
    return this.get('replicas');
  }),

  valueUnchanged: Ember.computed('value', function() {
    return this.get('value').toString() === this.get('replicas').toString();
  }),

  shouldDisable: Ember.computed.or('validations.isInvalid', 'valueUnchanged'),

  actions: {
    action() {
      this.get('attrs').action(this.get('value'));
    }
  }
});
