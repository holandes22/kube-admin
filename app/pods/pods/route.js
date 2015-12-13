import Ember from 'ember';

export default Ember.Route.extend({
  kubeClient: Ember.inject.service(),

  model(params) {
    return this.get('kubeClient').query('pod', { filter: { namespace: params.namespace }});
  }
});
