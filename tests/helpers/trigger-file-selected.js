import Ember from 'ember';
import makeEventOptions from './make-event-options';

export default Ember.Test.registerAsyncHelper('triggerFileSelected', function(app, selector, content, type='application/json') {
  const options = makeEventOptions(content, type);
  triggerEvent(selector, 'change', options);
});
