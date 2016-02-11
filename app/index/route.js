import Ember from 'ember';

export default Ember.Route.extend({
  kubeClient: Ember.inject.service(),

  model() {
    let client = this.get('kubeClient'),
        promises = {
          pods: client.findAll('pod'),
          services: client.findAll('service'),
          replicationcontrollers: client.findAll('replicationcontroller'),
        };

    return Ember.RSVP.hash(promises);
  },
});
