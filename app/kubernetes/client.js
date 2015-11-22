import Ember from 'ember';

export default Ember.Object.extend({

  getPods() {
    return this.get('ajax').request('/api/v1/pods').then(pods => {
      return pods.items;
    });
  }
});
