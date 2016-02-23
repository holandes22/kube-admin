import Ember from 'ember';
import lodash from 'npm:lodash';


export default Ember.Component.extend({
  session: Ember.inject.service(),

  spec: null,

  keys: null,

  pendingRemoval: Ember.computed('model', function() {
    let kind = this.get('model.kind').toLowerCase(),
        pending = this.get(`session.pendingRemoval.${kind}`);
    return lodash.includes(pending, this.get('model.metadata.name'));
  }),

  detailList: Ember.computed('keys', function() {
    let detailList = [];
    let keys = this.get('keys');
    if (!keys) {
      return detailList;
    }
    Ember.$.each(keys.split(','), (i, key) => {
      const value = this.get('model.' + key);
      let label = key
                 .split('.')
                 .pop()
                 .dasherize()
                 .capitalize()
                 .split('-')
                 .join(' ');
      detailList.push({ label, value });
    });
    return detailList;
  }),

  actions: {
    del() {
      return this.get('attrs').del(this.get('model'));
    }
  }
});
