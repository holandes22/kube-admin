import Ember from 'ember';
import ResourceDeleteAction from 'kube-admin/mixins/resource-delete-action';

export default Ember.Route.extend(ResourceDeleteAction, {

  kubeClient: Ember.inject.service(),

  model(params) {
    return this.get('kubeClient').findRecord('pod', params.namespace, params.name);
  }

});
