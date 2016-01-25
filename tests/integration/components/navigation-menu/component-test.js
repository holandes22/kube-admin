import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('navigation-menu', 'Integration | Component | navigation menu', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{navigation-menu}}`);

  assert.ok(this.$().text().search('KubeADMIN'));
  assert.ok(this.$().text().search('http://localhost:8080'));

  this.render(hbs`
    {{#navigation-menu}}
      <div class="item">
        <a href="#">foobar</a>
      </div>
    {{/navigation-menu}}
  `);
  assert.ok(this.$().text().search('KubeADMIN'));
  assert.ok(this.$().text().search('http://localhost:8080'));
  assert.ok(this.$().text().search('foobar'));

});
