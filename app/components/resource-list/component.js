import Ember from 'ember';

export default Ember.Component.extend({
  selectedNamespaces: [],

  namespaces: Ember.computed('resources', function() {
    let namespaces = [];
    Ember.$.each(this.get('resources'), (index, resource) => {
      let namespace = resource.metadata.namespace;
      if (Ember.$.inArray(namespace, namespaces) === -1) {
        namespaces.push(namespace);
      }
    });
    return namespaces;
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

  actions: {
    clearFilters() {
      this.set('selectedNamespaces', []);
    }
  }
});
