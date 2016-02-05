import Ember from 'ember';

export default Ember.Component.extend({
  lines: Ember.computed('log', function() {
    let log = this.get('log');
    return log.replace(/ /g, '&nbsp;').split('\n').map((line) => {
      return new Ember.String.htmlSafe(line);
    });
  })
});
