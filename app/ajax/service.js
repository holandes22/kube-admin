import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import { AjaxError } from 'ember-ajax/errors';


export default AjaxService.extend({
  session: Ember.inject.service(),

  host: Ember.computed('session.host', function() {
    return this.get('session').get('host');
  }),
  /**
   * We override this method from ember-ajax as the
   * payload contains all the info for the failed
   * request
  */
  handleResponse(status, headers, payload) {
    if (payload && typeof payload === 'object' && payload.kind && payload.kind === 'Status') {
      let errors = [{
        status: `${status}`,
        title: payload.message,
        detail: payload.reason
      }];
      return new AjaxError(errors);
    }
    return this._super(...arguments);
  }
});
