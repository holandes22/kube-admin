import Ember from 'ember';

export function capitalize(params, { str }) {
  return str.capitalize();
}

export default Ember.Helper.helper(capitalize);
