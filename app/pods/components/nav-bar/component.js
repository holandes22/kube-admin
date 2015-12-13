import Ember from 'ember';

export default Ember.Component.extend({
  currentNamespace: 'default',
  actions: {
    chooseNamespace(namespace) {
      this.set('currentNamespace', namespace);
      this.sendAction("chooseNamespace", namespace);
    }
  }
});
