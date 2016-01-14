import Ember from 'ember';

export default Ember.Component.extend({
  isLast: false,

  detailsHash: {
    'running': ['startedAt'],
    'waiting': ['reason'],
    'terminated': ['reason', 'exitCode', 'startedAt', 'finishedAt']
  },

  key: Ember.computed('state', function() {
    const state = this.get('state');
    let retval = 'None';

    Ember.$.each(['running', 'waiting', 'terminated'], (i, key) => {
      if (key in state) {
        retval = key;
        return;
      }
    });
    return retval;
  }),

  title: Ember.computed('state', function() {
    return this.get('key').capitalize();
  }),

  className: Ember.computed(function() {
    switch (this.get('key')) {
      case 'running': return 'positive';
      case 'waiting': return 'warning';
      case 'terminated': return 'negative';
      default: return '';
    }
  }),

  details: Ember.computed('state', function() {
    const key = this.get('key'),
          state = this.get('state');

    let details = [];
    Ember.$.each(this.detailsHash[key], (i, detailKey) => {
      let parts = detailKey.dasherize().split('-');
      parts[0] = parts[0].capitalize();
      details.push(Ember.String.htmlSafe(`<strong>${parts.join(' ')}:</strong> ${state[key][detailKey]}`));
    });
    return details;
  })
});
