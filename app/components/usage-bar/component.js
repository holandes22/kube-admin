import Ember from 'ember';

export default Ember.Component.extend({

  inverted: false,

  progress() {
    this.$('.ui.progress').progress({
      percent: this.get('percent'),
      showActivity: false,
      autoSuccess: false
    });
  },

  didInsertElement() {
    this._super(...arguments);
    this.progress();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.progress();
  },

  state: Ember.computed('percent', function() {
    if (this.get('percent') === 100) {
      return 'error';
    }
    return this.get('color');
  }),

  percent: Ember.computed('total', 'usage', function() {
    let usage = this.get('usage'), total = this.get('total');
    return Math.round((usage * 100) / total);
  })
});
