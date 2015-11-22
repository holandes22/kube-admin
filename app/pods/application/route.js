import Ember from 'ember';
import KubernetesClient from 'kube-admin/kubernetes/client';

export default Ember.Route.extend({

  ajax: Ember.inject.service(),

  model() {
    let client = KubernetesClient.create({ ajax: this.get('ajax') });
    return client.getPods();
  }

});
