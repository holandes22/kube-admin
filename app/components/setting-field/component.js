import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  actions: {
    saveSetting() {
      this.get('attrs').action(this.get('key'));
    }
  }
});
