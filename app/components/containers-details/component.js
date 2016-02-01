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

  containerList: Ember.computed('containers', 'containerStatuses', function() {
    let containers = this.get('containers'),
        containerStatuses = this.get('containerStatuses');
    if (!!containerStatuses) {
      containers.map((container) => {
        container.status = this.getStatusByName(container.name);
      });
    }
    return containers;
  })
});
