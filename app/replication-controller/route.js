import Ember from 'ember';

export default Ember.Route.extend({
  kubeClient: Ember.inject.service(),

  model(params) {
    return this.get('kubeClient').findRecord(
        'replicationcontroller', params.namespace, params.name);
  },

  actions: {
    scale(replicas) {
      let spec = this.modelFor('replicationController');
      window.console.log('Got replicas', replicas);
      window.console.log('Old value for replicas', spec.status.replicas);
    }
  }
});
