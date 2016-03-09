import Ember from 'ember';
import makeEventOptions from './make-event-options';

export default Ember.Test.registerAsyncHelper('triggerFileSelected', function(app, selector, content, type='application/json') {
  triggerEvent(selector, 'change', makeEventOptions(content, type));
});
