import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  selectedNamespaces: Ember.computed('namespaces', function() {
    let selection = this.get(`session.filters.${this.get('kind')}`);
    if (selection) {
      return selection;
    }
    return [];
  }),

  namespaces: Ember.computed('resources', function() {
    let namespaces = new Set();
    Ember.$.each(this.get('resources'), (index, resource) => {
      namespaces.add(resource.metadata.namespace);
    });
    return Array.from(namespaces);
  }),

  resourceList: Ember.computed('resources', 'selectedNamespaces', function() {
    let resources = this.get('resources'),
        selectedNamespaces = this.get('selectedNamespaces');

    if (selectedNamespaces.length === 0) {
      return resources;
    }

    return resources.filter((resource) => {
      return Ember.$.inArray(resource.metadata.namespace, selectedNamespaces) > -1;
    });
  }),

  persistSelection(namespaces) {
    this.set(`session.filters.${this.get('kind')}`, namespaces);
  },

  actions: {
    changeFilters(namespaces) {
      this.set('selectedNamespaces', namespaces);
      this.persistSelection(namespaces);
    },

    clearFilters() {
      this.send('changeFilters', []);
    }
  }
});
