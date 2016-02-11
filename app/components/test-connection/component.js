import Ember from 'ember';

export default Ember.Component.extend({
  kubeClient: Ember.inject.service(),

  tested: false,

  color: 'blue',

  icon: 'exchange',

  label: '',

  actions: {
    test() {
      this.get('kubeClient').canConnect().then((connected) => {
        this.set('tested', true);
        this.set('label', connected ? 'OK': 'Not OK');
        this.set('icon', connected ? 'checkmark': 'remove');
        this.set('color', connected ? 'green': 'red');
      });
    }
  }
});
