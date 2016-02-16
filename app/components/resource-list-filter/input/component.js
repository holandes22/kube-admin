import Ember from 'ember';

export default Ember.Component.extend({

  options: Ember.computed('resources', function() {
    let options = new Set();
    Ember.$.each(this.get('resources'), (index, resource) => {
      options.add(resource.metadata.namespace);
    });
    return Array.from(options);
  }),

  actions: {
    action(selected) {
      this.get('attrs').action(selected);
    }
  }
});
