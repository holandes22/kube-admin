import Ember from 'ember';

export default Ember.Component.extend({
  colorMap: {
    running: 'green',
    waiting: 'orange',
    terminated: 'red'
  },

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

  items: Ember.computed('containers', 'containerStatuses', function() {
    let items = [];
    this.get('containers').map((container) => {
      let status = this.getStatusByName(container.name);
      let state = Object.keys(status.state)[0],
          stateLabel = state.capitalize(),
          stateColor = this.colorMap[state],
          readyLabel = status.ready ? 'Ready' : 'Not ready',
          readyColor = status.ready ? 'green': 'orange';
      items.push({ container, status, stateLabel, stateColor, readyLabel, readyColor });
    });
    return items;
  })
});
