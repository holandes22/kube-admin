import Ember from 'ember';

export default Ember.Component.extend({
  currentNamespace: 'default',
  actions: {
    chooseNamespace(component, namespace, value) {
      this.set('currentNamespace', namespace);
      this.sendAction("chooseNamespace", namespace);
    }
  }
});
