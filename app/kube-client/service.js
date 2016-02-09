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

  getNamespacedUrl(manifest) {
    let url = '/api/v1/namespaces';
    if ( manifest.kind !== 'Namespace') {
      let namespace = 'default';
      if ( manifest.metadata.namespace && manifest.metadata.namespace !== '' ) {
        namespace = manifest.metadata.namespace;
      }
      url = `${url}/${namespace}/${manifest.kind.toLowerCase()}s`;
    }
    return url;
  },

  create(manifest) {
    let url = this.getNamespacedUrl(manifest);
    let data = {
      data: JSON.stringify(manifest),
      headers: {'Content-Type': 'application/json'}
    };
    return this.get('ajax').post(url, data );
  },

  replace(manifest) {
    let url = this.getNamespacedUrl(manifest);
    let data = {
      data: JSON.stringify(manifest),
      headers: {'Content-Type': 'application/json'}
    };
    url = `${url}/${manifest.metadata.name}`;
    return this.get('ajax').put(url, data );
  },

  getLogOrThrow(error) {
    if (error.errors) {
      throw error;
    }
    if (!error.search) {
      return null;
    }
    if (error.search(/pod is not in .*state/) > -1) {
      return null;
    }
    if (error.search && error.search(/^Container.*not found/) > -1) {
      throw { message: error };
    }
    return error;
  },

  getLog(params, tailLines = 200) {
    let queryParams = `?container=${params.container}&tailLines=${tailLines}`;
    return this.get('ajax').request(
      `/api/v1/namespaces/${params.namespace}/pods/${params.name}/log${queryParams}`
    ).then((log) => {
      return log;
    }).catch((error) => {
      // TODO: Remove this ugly workaround.
      // See #38 for an explanation on why we need this catch
      return this.getLogOrThrow(error);
    });
  }

});
