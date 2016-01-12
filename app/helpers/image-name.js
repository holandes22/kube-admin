import Ember from 'ember';

export function imageName(params, { name }) {
  if (!name) {
    return '';
  }
  let parts = name.split(':'),
      tag = '';
  name = `<div class="ui blue horizontal label">${parts[0]}</div>`;
  if (parts.length > 1) {
    tag = `<div class="ui black tag label">${parts[1]}</div>`;
  }

  return Ember.String.htmlSafe(`${name}${tag}`);
}

export default Ember.Helper.helper(imageName);
