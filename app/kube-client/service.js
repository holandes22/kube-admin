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
  },

  getLog(params, tailLines = 200) {
    let queryParams = `?container=${params.container}&tailLines=${tailLines}`;
    return this.get('ajax').request(
      `/api/v1/namespaces/${params.namespace}/pods/${params.name}/log${queryParams}`
    ).catch((error) => {
      // TODO: this sucks.
      // Since API returns a text response, jquery fails to parse
      // the response and raises an error. Even when the AJAX suceeded
      if (error.errors) {
        throw error;
      }
      // For some reason API returns a not found container in content with status 200
      // instead of a proper JSON error response
      // TODO: handle a good response including the matching string
      // TODO: handle case of no logs: Pod "data-collector-wbnwl" in namespace "default" : pod is not in 'Running', 'Succeeded' or 'Failed' state - State: "Pending"
      if (error.includes('not found')) {
        throw { message: error };
      }
      return { log: error };
    });
  }

});
