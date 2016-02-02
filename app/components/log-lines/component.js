import Ember from 'ember';

export default Ember.Component.extend({
  lines: Ember.computed('log', function() {
    let log = this.get('log');
    //return log.split('\n');
    let lines = log.replace(/\t/g, '&Tab;').split('\n');
    let formattedLines = [];
    Ember.$.each(lines, (i, line) => {
      formattedLines.push(Ember.String.htmlSafe(line));
    });
    return formattedLines;
  })
});
