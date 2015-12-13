import Ember from 'ember';

export default Ember.Route.extend({
  kubeClient: Ember.inject.service(),

  model() {
    return this.get('kubeClient').findAll('namespace').then((response) => {
      let namespaces = [];
      Ember.$.each(response.items, (index, item) => {
        namespaces.push(item.metadata.name);
      });
      return namespaces;
    });
  },

  actions: {
    chooseNamespace(namespace) {
      this.transitionTo('pods', namespace);
    }
  }
});
