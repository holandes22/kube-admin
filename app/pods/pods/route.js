import Ember from 'ember';

export default Ember.Route.extend({
  kubeClient: Ember.inject.service(),

  model() {
    return this.get('kubeClient').findAll('pod');
  }
});
