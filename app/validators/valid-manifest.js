import BaseValidator from 'ember-cp-validations/validators/base';
import yaml from 'npm:js-yaml';

export default BaseValidator.extend({
  validate(value) {
    if(value == null) { // unset
      return true;
    }
    let kind = this.get('model.kind'),
        manifest = null;

    try {
      manifest = yaml.safeLoad(value);
    } catch(yamlError) {
      try {
        manifest = JSON.parse(value);
      } catch(jsonError) {
        window.console.log(yamlError, jsonError);
        return 'Selected file must be valid JSON or YAML';
      }
    }
    if (!manifest || !manifest.kind) {
      return 'Bad manifest (No kind attribute)';
    } else if (manifest.kind !== kind) {
      return `Resource kind should be ${kind}`;
    }
    // FIXME: This is dirty because it couples the
    // validator with the object using it
    // The reason is to avoid having to parse twice the text file
    this.set('model.manifest', manifest);
    return true;
  }
});
