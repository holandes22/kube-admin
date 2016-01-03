import Ember from 'ember';

export default Ember.Route.extend({
  kubeClient: Ember.inject.service(),

  model() {
    return this.get('kubeClient').findAll('namespace');
  },

  actions: {
    create(manifest) {
      this.get('kubeClient').create(manifest).then(() => {
        this.get('flashMessages').positive('Successfully created');
        this.refresh();
      }).catch((error) => {
        this.get('flashMessages').negative(error.errors[0].title, { sticky: true });
      });
    }
  }
});
