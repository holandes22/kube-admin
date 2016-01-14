import Ember from 'ember';

export default Ember.Component.extend({
  getStatusByName(name) {
    let retval = null;
    Ember.$.each(this.get('containerStatuses'), (i, containerStatus) => {
      if (name === containerStatus.name) {
        retval = containerStatus;
        return;
      }
    });
    return retval;
  },

  containerList: Ember.computed('spec', 'containerStatuses', function() {
    let containers = this.get('spec').containers,
        containerStatuses = this.get('containerStatuses');
    if (!!containerStatuses) {
      containers.map((container) => {
        container.status = this.getStatusByName(container.name);
      });
    }
    return containers;
  })
});
