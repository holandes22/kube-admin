import Ember from 'ember';
import ResourceDeleteAction from 'kube-admin/mixins/resource-delete-action';

export default Ember.Route.extend(ResourceDeleteAction, {
  kubeClient: Ember.inject.service(),

  model(params) {
    return this.get('kubeClient').findRecord(
        'replicationcontroller', params.namespace, params.name);
  },

  actions: {
    scale(replicas) {
      let manifest = this.modelFor('replicationController');
      if (replicas !== manifest.spec.replicas) {
        let flashMessages = this.get('flashMessages'),
            newManifest = Ember.$.extend(true, {}, manifest);
        newManifest.spec.replicas = parseInt(replicas);
        this.get('kubeClient').replace(newManifest).then(() => {
          let message = 'A request to scale was sent succesfully.';
          flashMessages.info(message, { timeout: 5000 });
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
  }
});
