import Ember from 'ember';

export default Ember.Route.extend({
  kubeClient: Ember.inject.service(),

  findByName(name, items) {
    let retval = null;
    Ember.$.each(items, (i, item) => {
      if (name === item.name) {
        retval = item;
        return;
      }
    });
    return retval;
  },

  model(params) {
    return this.get('kubeClient').findRecord('pod', params.namespace, params.name).then((pod) => {
      let status = this.findByName(params.container, pod.status.containerStatuses),
          container = this.findByName(params.container, pod.spec.containers);
      return {
        status,
        container,
        namespace: pod.metadata.namespace,
        'pod': pod.metadata.name
      };
    });
  }
});
