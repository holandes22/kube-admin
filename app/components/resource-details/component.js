import Ember from 'ember';

export default Ember.Component.extend({
  spec: null,

  keys: null,

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

  })
});
