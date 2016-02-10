import BaseValidator from 'ember-cp-validations/validators/base';
import yaml from 'npm:js-yaml';

export default BaseValidator.extend({
  validate(value) {
    if(!value) {
      return false;
    }
    let fileInfo = value,
        kind = this.get('model.kind'),
        manifest = null;

    try {
      manifest = yaml.safeLoad(fileInfo.text);
    } catch(yamlError) {
      try {
        manifest = JSON.parse(fileInfo.text);
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
    // This is dirty, but is to avoid
    // having to parse twice the text file
    this.set('model.manifest', manifest);
    return true;
  }
});
