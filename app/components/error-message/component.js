import Ember from 'ember';

export default Ember.Component.extend({
  hasTitle: Ember.computed.notEmpty('error.title'),

  hasErrors: Ember.computed.notEmpty('error.errors'),

  hasMessage: Ember.computed.notEmpty('error.message'),

  hasInfo: Ember.computed.or('hasTitle', 'hasErrors', 'hasMessage'),

  isConnectionError: Ember.computed('hasErrors', function() {
    let retval = false;
    if (this.get('hasErrors')) {
      Ember.$.each(this.get('error.errors'), (index, error) => {
        if (error.status === '0') {
          retval = true;
          return;
        }
      });
    }
    return retval;
  }),

  errors: Ember.computed('hasErrors', function() {
    if (this.get('hasErrors') && !this.get('isConnectionError')) {
      return this.get('error.errors');
    }
    return [];
  }),

  title: Ember.computed('hasInfo', function() {
    let title = 'An unexpected error occured when connecting to host';
    if (this.get('hasErrors')) {
      title = 'The backend responded with an error';
      if (this.get('isConnectionError')) {
        title = 'A connection error occured while connecting to host';
      }
    }
    return title;
  }),

  message: Ember.computed('hasInfo', function() {
    let message = '';
    if (!this.get('hasInfo')) {
      message = 'Please check the console for errors';
    } else if (this.get('isConnectionError')) {
      message = 'Please verify that Kubernetes is running and the hostname is properly configured';
    } else {
      message = this.get('error.message');
    }
    return message;
  })

});
