import Ember from 'ember';

export default Ember.Mixin.create({

  kubeClient: Ember.inject.service(),

  model() {
    return this.get('kubeClient').findAll(this.get('kind'));
  },

  actions: {
    create(manifest) {
      const flashMessages = this.get('flashMessages');
      flashMessages.clearMessages();
      this.get('kubeClient').create(manifest).then(() => {
        flashMessages.positive('Successfully created');
        this.refresh();
      }).catch((error) => {
        flashMessages.negative(error.errors[0].title, { sticky: true });
      });
    }
  }

});