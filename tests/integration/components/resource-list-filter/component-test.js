import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('resource-list-filter', 'Integration | Component | resource list filter', {
  integration: true
});

test('it clears filters when click on clear button', function(assert) {
  let resources = [{ metadata: { namespace: 'ns1' } }],
      filters = ['ns1'];
  this.set('resources', resources);
  this.set('filters', filters);

  this.render(hbs`
    {{#resource-list-filter resources=resources filters=filters as |filter|}}
      {{filter.input}}
      {{filter.clear}}
    {{/resource-list-filter}}
  `);

  assert.ok(this.$('ul').text().search('ns1'));
  this.$('button').click();
  assert.equal(this.get('filters').length, 0);
  assert.ok(this.$().text().search('ns1') === -1);
});


test('it enables clear button only if there are selections', function(assert) {
  let resources = [
    { metadata: { namespace: 'ns1' } },
    { metadata: { namespace: 'ns1' } },
    { metadata: { namespace: 'ns2' } }
  ];
  this.set('resources', resources);
  this.set('filters', []);

  this.render(hbs`
    {{#resource-list-filter resources=resources filters=filters as |filter|}}
      {{filter.input}}
      {{filter.clear}}
    {{/resource-list-filter}}
  `);

  assert.equal(this.$('ul').text().trim(), '');
  assert.ok(this.$('button').hasClass('disabled'));
  this.set('filters', ['ns1', 'ns2']);
  assert.ok(this.$('ul').text().search('ns1') !== -1);
  assert.ok(this.$('ul').text().search('ns2') !== -1);
  assert.notOk(this.$('button').hasClass('disabled'));
});
