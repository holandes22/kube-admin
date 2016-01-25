import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  session: Ember.inject.service(),

  myroute: Ember.computed(function() {
    window.console.log(this.get('container').lookup('controller:application').currentPath);
  })
});
