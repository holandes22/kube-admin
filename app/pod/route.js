import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  kubeClient: Ember.inject.service(),

  model(params) {
    return this.get('kubeClient').findRecord('pod', params.namespace, params.name);
  },

  actions: {
    del(manifest) {
      let flashMessages = this.get('flashMessages');
      flashMessages.clearMessages();
      this.get('kubeClient').deleteRecord(manifest).then(() => {
        let kind = manifest.kind.toLowerCase();
        this.get(`session.pendingRemoval.${kind}`).push(manifest.metadata.name);
        let message = `Successfully sent request to delete ${manifest.kind} ${manifest.metadata.name}`;
        flashMessages.positive(message);
        this.transitionTo('pods');
      }).catch((error) => {
        flashMessages.negative(error.errors[0].detail, { timeout: 10000 });
      });
    }
  }
});
