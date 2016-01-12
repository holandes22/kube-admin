import { imageName } from '../../../helpers/image-name';
import { module, test } from 'qunit';

module('Unit | Helper | image name');

// Replace this with your real tests.
test('it works with no tag', function(assert) {
  let result = imageName(null, { name: 'imageName' });
  const expected = '<div class="ui blue horizontal label">imageName</div>';
  assert.equal(result, expected);
});

test('it works with a tag', function(assert) {
  let result = imageName(null, { name: 'imageName:withTag' });
  const expected = '<div class="ui blue horizontal label">imageName</div><div class="ui black tag label">withTag</div>';
  assert.equal(result, expected);
});

test('it fails silentely with null name', function(assert) {
  let result = imageName(null, { name: null });
  const expected = '';
  assert.equal(result, expected);
});
