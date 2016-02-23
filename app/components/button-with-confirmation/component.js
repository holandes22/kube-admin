import Ember from 'ember';

export default Ember.Component.extend({

  contextSelector: '#modal-context',

  selector: Ember.computed(function() {
    return `[name=${this.elementId}].ui.modal`;
  }),

  actions: {
    approve() {
      Ember.$(this.get('selector')).modal('hide');
      return this.get('attrs').approve();
    },
    open() {
      let contextSelector = this.get('contextSelector');
      Ember.$(this.get('selector')).modal({ context: contextSelector }).modal('show');
    },
    deny() {
      Ember.$(this.get('selector')).modal('hide');
    }
  }

});
