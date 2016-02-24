import Ember from 'ember';


export default Ember.Component.extend({

  kinds: Ember.computed('kind', function() {
    let kind = this.get('kind').camelize().capitalize();
    return Ember.Inflector.inflector.pluralize(kind);
  }),
  empty: Ember.computed.empty('resources'),

  resourceList: Ember.computed('resources', 'filters', function() {
    let resources = this.get('resources'),
        filters = this.get('filters');

    if (!filters || filters.length === 0) {
      return resources;
    }

    return resources.filter((resource) => {
      return Ember.$.inArray(resource.metadata.namespace, filters) > -1;
    });
  })

});
