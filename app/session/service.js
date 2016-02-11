import Ember from 'ember';

export default Ember.Service.extend({
  host: 'http://localhost:8080',
  log: {
    tailLines: 300
  }
});
