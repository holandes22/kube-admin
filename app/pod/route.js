import Ember from 'ember';

export default Ember.Route.extend({
  kubeClient: Ember.inject.service(),

  model(params) {
    return this.get('kubeClient').findRecord('pod', params.namespace, params.name);
  }
});
