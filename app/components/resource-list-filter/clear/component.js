import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    action() {
      this.get('attrs').action();
    }
  }
});
