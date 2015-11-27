import Ember from 'ember';

export default Ember.Route.extend({

  kubeClient: Ember.inject.service(),

  model() {
    return this.get('kubeClient').findAll('pod');
    //return this.get('kubeClient').query('pod', { filter: { namespace: 'default' }});
    //return this.get('kubeClient').query('pod');
    //return this.get('kubeClient').findAll('replicationcontroller');
    //return this.get('kubeClient').findAll('services');
  }

});
