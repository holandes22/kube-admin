import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  kubeClient: Ember.inject.service(),

  model(params) {
    let tailLines = this.get('session').log.tailLines;
    return this.get('kubeClient').getLog(params, tailLines);
  }
});
