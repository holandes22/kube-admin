import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    window.console.log(params);
  }

});
