import Ember from 'ember';

export default Ember.Component.extend({

  inverted: false,

  color: 'blue',

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
    let percent = this.get('percent');
    if (!percent) {
      return 'disabled';
    }
    if (percent === 100) {
      return 'error';
    }
    return this.get('color');
  })

});
