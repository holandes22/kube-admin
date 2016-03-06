import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


const sessionStub = Ember.Service.extend({
  host: 'http://fake:8080',

  log: {
    tailLines: 50
  },

  showSystemResources: false,

  setAttr(key, value) {
    this.set(key, value);
  }
});

moduleForComponent('settings-form', 'Integration | Component | settings form', {
  integration: true,
  beforeEach: function () {
    this.register('service:session', sessionStub);
    this.inject.service('session');
  }
});

test('it changes host value on submit', function(assert) {
  let newHost = 'HTTPS://new-fake:9999',
      inputSel = '[data-id=setting-host] input';
  this.render(hbs`{{settings-form}}`);
  assert.equal(this.$(inputSel).val(), 'http://fake:8080');
  this.$(inputSel).val(newHost);
  this.$(inputSel).change();
  this.$('[data-id=setting-host] button').click();
  assert.equal(this.get('session').host, newHost);
});

test('it shows error if host is empty', function(assert) {
  this.render(hbs`{{settings-form}}`);
  this.$('[data-id=setting-host] input').val('');
  this.$('[data-id=setting-host] input').change();
  assert.equal(this.$('[data-id=validation-host]').text().trim(), "This field can't be blank");
});

test('it shows error if host has no protocol', function(assert) {
  this.render(hbs`{{settings-form}}`);
  this.$('[data-id=setting-host] input').val('ws://fake');
  this.$('[data-id=setting-host] input').change();
  assert.ok(this.$('[data-id=setting-host] button').hasClass('disabled'));
  assert.equal(this.$('[data-id=validation-host]').text().trim(), 'Host should include protocol (http:// or https://)');
});

test('it changes tailLines value on submit', function(assert) {
  let inputSel = '[data-id=setting-tailLines] input';
  this.render(hbs`{{settings-form}}`);
  assert.equal(this.$(inputSel).val(), 50);
  this.$(inputSel).val('100');
  this.$(inputSel).change();
  this.$('[data-id=setting-tailLines] button').click();
  assert.equal(this.get('session').log.tailLines, 100);
});

test('it shows validation error for tailLines', function(assert) {
  this.render(hbs`{{settings-form}}`);
  this.$('[data-id=setting-tailLines] input').val('');
  this.$('[data-id=setting-tailLines] input').change();
  assert.equal(this.$('[data-id=validation-tailLines]').text().trim(), "This field can't be blank");
});
