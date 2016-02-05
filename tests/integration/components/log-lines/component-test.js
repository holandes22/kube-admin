import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('log-lines', 'Integration | Component | log lines', {
  integration: true
});

test('it renders empty string', function(assert) {
  this.set('log', '');
  this.render(hbs`{{log-lines log=log}}`);
  assert.equal(this.$('[data-autoid=log]').text().trim(), '');
});

test('it shows a warning about pod state if log is null', function(assert) {
  this.set('log', null);
  this.render(hbs`{{log-lines log=log}}`);
  assert.equal(this.$('[data-autoid=message]').text().trim(), 'Got null response from API. Maybe Pod is in Pending phase?');
});

test('it shows log with one line', function(assert) {
  this.set('log', 'OneLine');
  this.render(hbs`{{log-lines log=log}}`);
  assert.equal(this.$('[data-autoid=log] div').text().trim(), 'OneLine');
});

test('it shows log with several lines', function(assert) {
  this.set('log', 'First\nSecond');
  this.render(hbs`{{log-lines log=log}}`);
  assert.equal(this.$('[data-autoid=log]').children().length, 2);
  assert.equal(this.$('[data-autoid=log] div:nth-child(1)').text().trim(), 'First');
  assert.equal(this.$('[data-autoid=log] div:nth-child(2)').text().trim(), 'Second');
});

test('it preserves log format', function(assert) {
  let log = `First line
  Second`;
  this.set('log', log);
  this.render(hbs`{{log-lines log=log}}`);
  assert.equal(this.$('[data-autoid=log] div:nth-child(1)').html(), "First&nbsp;line");
  assert.equal(this.$('[data-autoid=log] div:nth-child(2)').html(), '&nbsp;&nbsp;Second');
});
