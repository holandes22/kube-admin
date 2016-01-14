import Ember from 'ember';

export default Ember.Route.extend({
  kubeClient: Ember.inject.service(),

  model(params) {
    return this.get('kubeClient').findRecord(
        'replicationcontroller', params.namespace, params.name);
  }
});
