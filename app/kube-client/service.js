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
  },

  create(manifest) {
    let url = '/api/v1/namespaces';
    if ( manifest.kind !== 'Namespace') {
      let namespace = 'default';
      if ( manifest.metadata.namespace && manifest.metadata.namespace !== '' ) {
        namespace = manifest.metadata.namespace;
      }
      url = `${url}/${namespace}/${manifest.kind.toLowerCase()}s`;
    }
    let data = {
      data: JSON.stringify(manifest),
      headers: {'Content-Type': 'application/json'}
    };
    return this.get('ajax').post(url, data );
  }

});
