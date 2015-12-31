import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  host: 'http://localhost:8080',

  /**
   * We override this method from ember-ajax as the
   * payload contains all the info for the failed
   * request
  */
  normalizeErrorResponse(status, headers, payload) {
    //TODO: more robust way to verify response if from kubernetes
    if (payload && typeof payload === 'object' && payload.message && payload.reason) {
      return [
        {
          status: `${status}`,
          title: payload.message,
          detail: payload.reason
        }
      ];
    }
    return this._super(...arguments);
  }
});
