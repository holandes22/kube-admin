import Ember from 'ember';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';


const Validations = buildValidations({
  replicas: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      integer: true,
      gte: 0
    })
  ]
});

export default Ember.Component.extend(Validations, {
  actions: {
    action() {
      this.get('attrs').action(this.get('replicas'));
    }
  }
});
