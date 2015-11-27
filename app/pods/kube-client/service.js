import Ember from 'ember';

export default Ember.Service.extend({

  ajax: Ember.inject.service(),

  findAll(modelName) {
    let types = Ember.Inflector.inflector.pluralize(modelName);
    return this.get('ajax').request(`/api/v1/${types}`);
  },

  query(modelName, query) {
    let types = Ember.Inflector.inflector.pluralize(modelName);
    if (query) {
      let ns = query.filter.namespace;
      return this.get('ajax').request(`/api/v1/namespaces/${ns}/${types}`);

    }
    return this.findAll(modelName);
  }

});
