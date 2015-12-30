import BaseValidator from 'ember-cp-validations/validators/base';

export default BaseValidator.extend({
  validate(value) {
    if(!value) {
      return false;
    }
    const fileInfo = value,
          kind = this.get('model.kind');
    try {
      const manifest = JSON.parse(fileInfo.text);
      if (!manifest.kind) {
        return 'Bad manifest (No kind attribute)';
      } else if (manifest.kind !== kind) {
        return `Resource kind should be ${kind}`;
      }
      // This is dirty, but is to avoid
      // having to parse twice the text file
      this.set('model.manifest', manifest);
    } catch(error) {
      return 'Selected file must be valid JSON';
    }
    return true;
  }
});
