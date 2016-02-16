import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    changeFilters(selected) {
      this.set('filters', selected);
    },
    clearFilters() {
      this.set('filters', []);
    }
  }

});
