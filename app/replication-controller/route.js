import Ember from 'ember';

export default Ember.Route.extend({
  kubeClient: Ember.inject.service(),

  model(params) {
    return this.get('kubeClient').findRecord(
        'replicationcontroller', params.namespace, params.name);
  },

  actions: {
    scale(replicas) {
      let manifest = this.modelFor('replicationController');
      window.console.log(`Got RC scale request from ${manifest.status.replicas} to ${replicas}`);
      if (replicas !== manifest.status.replicas) {
        let flashMessages = this.get('flashMessages'),
            newManifest = Ember.$.extend(true, {}, manifest);
        newManifest.status.replicas = replicas;
        this.get('kubeClient').replace(newManifest).then(() => {
          let message = 'A request to scale was sent. Change might not be reflected right away.';
          flashMessages.info(message, { sticky: true });
        }).catch((error) => {
          flashMessages.negative(error.errors[0].detail, { sticky: true });
        });
      }
    }
  }
});
