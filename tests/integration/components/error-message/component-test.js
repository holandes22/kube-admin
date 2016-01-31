import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('error-message', 'Integration | Component | error message', {
  integration: true
});

test('it shows a default message when no errors, message nor description', function(assert) {
  this.set('model', {});
  this.render(hbs`{{error-message error=model}}`);
  assert.equal(this.$('[data-autoid=title]').text(), 'An unexpected error occured when connecting to host');
  assert.equal(this.$('[data-autoid=message]').text(), 'Please check the console for errors');
});

test('it shows message and description when no errors', function(assert) {
  this.set('model', { message: 'fake msg' });
  this.render(hbs`{{error-message error=model}}`);
  assert.equal(this.$('[data-autoid=title]').text(), 'An unexpected error occured when connecting to host');
  assert.equal(this.$('[data-autoid=message]').text(), 'fake msg');
});

test('it shows relevant error message and link to settings if conn failed', function(assert) {
  const errors = [{
    status: '0',
    detail: '',
    title: 'The backend responded with an error'
  }];
  this.set('model', { errors, message: 'fake' });
  this.render(hbs`{{error-message error=model}}`);
  assert.equal(this.$('[data-autoid=title]').text(), 'A connection error occured while connecting to host');
  assert.equal(this.$('[data-autoid=message]').text(), 'Please verify that Kubernetes is running and the hostname is properly configure properly');
  assert.equal(this.$('[data-autoid^=error]').length, 0);
});

test('it shows errors details if error from kubernetes', function(assert) {
  const errors = [
    {
      status: '401',
      detail: 'fake detail 401',
      title: 'fake title 401'
    }, {
      status: '402',
      detail: 'fake detail 402',
      title: 'fake title 402'
    }
  ];
  this.set('model', { errors });
  this.render(hbs`{{error-message error=model}}`);
  assert.equal(this.$('[data-autoid=title]').text(), 'The backend responded with an error');
  assert.equal(this.$('[data-autoid=message]').text(), '');

  assert.equal(this.$('[data-autoid=error0-status]').text(), '401');
  assert.equal(this.$('[data-autoid=error0-title]').text(), 'fake title 401');
  assert.equal(this.$('[data-autoid=error0-detail]').text(), 'fake detail 401');

  assert.equal(this.$('[data-autoid=error1-status]').text(), '402');
  assert.equal(this.$('[data-autoid=error1-title]').text(), 'fake title 402');
  assert.equal(this.$('[data-autoid=error1-detail]').text(), 'fake detail 402');
});
