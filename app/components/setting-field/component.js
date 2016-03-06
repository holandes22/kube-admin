import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  inputType: 'text',

  actions: {
    saveSetting() {
      this.get('attrs').action(this.get('key'));
    }
  }
});
