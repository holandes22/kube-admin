import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('container-state', 'Integration | Component | container state', {
  integration: true
});

test('it renders running', function(assert) {
  let state = { running: { startedAt: '2016-01-13T06:29:31Z' } };
  this.set('state', state);
  this.render(hbs`{{container-state state=state}}`);

  assert.equal(this.$('.header').text().trim(), 'Running');
  assert.equal(this.$('.list').first().text().trim(), 'Started at: 2016-01-13T06:29:31Z');
  assert.ok(this.$('.ui.message').hasClass('positive'));
});

test('it renders waiting', function(assert) {
  let state = { waiting: { reason: 'Because...' } };
  this.set('state', state);
  this.render(hbs`{{container-state state=state}}`);

  assert.equal(this.$('.header').text().trim(), 'Waiting');
  assert.equal(this.$('.list').first().text().trim(), 'Reason: Because...');
  assert.ok(this.$('.ui.message').hasClass('warning'));
});

test('it renders terminated', function(assert) {
  let state = {
    terminated: {
      reason: 'Because...',
      exitCode: 2,
      startedAt: '2016-01-13T06:29:31Z',
      finishedAt: '2016-01-13T06:29:31Z'
    }
  };
  this.set('state', state);
  this.render(hbs`{{container-state state=state}}`);

  assert.equal(this.$('.header').text().trim(), 'Terminated');
  assert.equal(this.$('.list li:nth-child(1)').text().trim(), 'Reason: Because...');
  assert.equal(this.$('.list li:nth-child(2)').text().trim(), 'Exit code: 2');
  assert.equal(this.$('.list li:nth-child(3)').text().trim(), 'Started at: 2016-01-13T06:29:31Z');
  assert.equal(this.$('.list li:nth-child(4)').text().trim(), 'Finished at: 2016-01-13T06:29:31Z');
  assert.ok(this.$('.ui.message').hasClass('negative'));
});

test('it renders None for empty for last state', function(assert) {
  let state = {};
  this.set('state', state);
  this.render(hbs`{{container-state state=state isLast=true}}`);

  assert.equal(this.$().text().trim(), 'None');
});

// TODO: how can we parametrize this state to avoid duplication??
test('it renders running for last state', function(assert) {
  let state = { running: {} };
  this.set('state', state);
  this.render(hbs`{{container-state state=state isLast=true}}`);

  assert.equal(this.$().text().trim(), 'Running');
});

test('it renders waiting for last state', function(assert) {
  let state = { waiting: {} };
  this.set('state', state);
  this.render(hbs`{{container-state state=state isLast=true}}`);

  assert.equal(this.$().text().trim(), 'Waiting');
});

test('it renders terminated for last state', function(assert) {
  let state = { terminated: {} };
  this.set('state', state);
  this.render(hbs`{{container-state state=state isLast=true}}`);

  assert.equal(this.$().text().trim(), 'Terminated');
});
