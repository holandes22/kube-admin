import { moduleFor, test } from 'ember-qunit';

moduleFor('route:pod/container', 'Unit | Route | pod/container', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('assert find by name returns name if found', function(assert) {
  let route = this.subject();
  let name = 'foo',
      items = [{ 'name': name }, {'name': 'baz' }, { oops: 'no name'}];
  assert.equal(route.findByName(name, items), items[0]);
});

test('assert find by name returns null if not found', function(assert) {
  let route = this.subject(),
      items = [{ name: 'fffooo' }, {name: 'baaarrr' }, { oops: 'no name'}];
  assert.equal(route.findByName('foo', items), null);
});
