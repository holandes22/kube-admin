import Ember from 'ember';

export default Ember.Mixin.create({

  session: Ember.inject.service(),

  kubeClient: Ember.inject.service(),

  model() {
    return this.get('kubeClient').findAll(this.get('kind')).then((resources) => {
      if (!this.get('session.showSystemResources')) {
        resources.items = resources.items.filter((resource) => {
          return !resource.metadata.namespace || !resource.metadata.namespace.includes('kube-system');
        });
      }
      return resources;
    });
  },

  actions: {
    create(manifest) {
      const flashMessages = this.get('flashMessages');
      flashMessages.clearMessages();
      this.get('kubeClient').create(manifest).then(() => {
        flashMessages.positive('Successfully created');
        this.refresh();
      }).catch((error) => {
        window.console.error(error);
        let message = null;
        if (error.errors) {
          message = error.errors[0].detail;
        } else {
          message = error.message;
        }
        flashMessages.negative(message, { sticky: true });
      });
    }
  }

});
