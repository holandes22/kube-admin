import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: [
    validator('presence', true),
    validator('length', { max: 100 })
  ]
});

export default Ember.Component.extend(Validations, {

  selectionMade: false,

  actions: {

    action() {
      this.set('selectionMade', true);
      if (this.get('validations.isValid')) {
        const manifest = {
          'apiVersion' : 'v1',
          'kind' : 'Namespace',
          'metadata' : {
              'name': this.get('name')
          }
        };
        this.get('attrs').action(manifest);
      }
    }
  }

});
