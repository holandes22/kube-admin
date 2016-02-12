import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const kubeClientStub = Ember.Service.extend({
  connected: true,
  canConnect() {
    return new Ember.RSVP.Promise((resolve) => {
      resolve(this.get('connected'));
    });
  }
});

moduleForComponent('test-connection', 'Integration | Component | test connection', {
  integration: true,
  beforeEach: function () {
    this.register('service:kube-client', kubeClientStub);
    this.inject.service('kube-client', { as: 'kubeClient' });
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{test-connection}}`);
  assert.equal(this.$().text().trim(), 'Test connection');
});

test('it shows not ok if cannot connect', function(assert) {
  this.get('kubeClient').set('connected', false);
  this.render(hbs`{{test-connection}}`);
  this.$('[data-id=test]').click();
  assert.ok(this.$('[data-id=result]').hasClass('red'));
});


test('it shows ok if can connect', function(assert) {
  this.render(hbs`{{test-connection}}`);
  this.$('[data-id=test]').click();
  assert.ok(this.$('[data-id=result]').hasClass('green'));
  assert.ok(this.$().text().search('Test connection OK'));
});


