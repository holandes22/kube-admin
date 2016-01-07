import Ember from 'ember';

export default Ember.Service.extend({

  ajax: Ember.inject.service(),

  findAll(kind) {
    let kinds = Ember.Inflector.inflector.pluralize(kind);
    return this.get('ajax').request(`/api/v1/${kinds}`);
  },

  findRecord(kind, ns, name) {
    let kinds = Ember.Inflector.inflector.pluralize(kind);
    return this.get('ajax').request(`/api/v1/namespaces/${ns}/${kinds}/${name}`);
  },

  query(kind, query) {
    let kinds = Ember.Inflector.inflector.pluralize(kind);
    if (query) {
      let ns = query.filter.namespace;
      return this.get('ajax').request(`/api/v1/namespaces/${ns}/${kinds}`);

    }
    return this.findAll(kind);
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
