import Ember from 'ember';

export default Ember.Route.extend({
  kubeClient: Ember.inject.service(),

  model() {
    return this.get('kubeClient').findAll('namespace');
  },

  actions: {
    create(manifest) {
      this.get('kubeClient').create(manifest).then(() => {
        this.refresh();
      });
    }
  }
});
