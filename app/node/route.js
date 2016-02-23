import Ember from 'ember';

export default Ember.Route.extend({

  kubeClient: Ember.inject.service(),

  model(params) {
    return this.get('kubeClient').findRecord('node', null, params.name);
  }

});
