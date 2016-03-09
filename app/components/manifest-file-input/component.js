import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
import { task, timeout } from 'ember-concurrency';

const MAX_FILE_SIZE = 1048576;

const Validations = buildValidations({
  fileText: [validator('valid-manifest')],
  fileSize: [
    validator('number', {
      lte: MAX_FILE_SIZE,
      message: 'File size exceeds 1 MiB. Is this a text file?'
    })
  ]
});


export default Ember.Component.extend(Validations, {

  flashMessages: Ember.inject.service(),

  actionLabel: 'Create',

  fileName: null,

  fileText: null,

  fileSize: null,

  readFile: task(function * (event) {
    let file = event.target.files[0];
    this.set('fileSize', file.size);
    this.set('fileName', file.name);
    this.set('fileText', null);
    if (file.size > MAX_FILE_SIZE) {
      return;
    }
    let reader = new window.FileReader();
    reader.readAsText(file);
    while(reader.readyState !== 2) {
      yield timeout(50);
    }
    if (reader.error) {
      let flashMessages = this.get('flashMessages'),
          message = `Error while reading file: ${reader.error}`;
      flashMessages.negative(message, { sticky: true });
      return;
    }
    this.set('fileText', reader.result);
  }),

  actions: {

    selectFile() {
      this.$('input:file').click();
    },

    action() {
      // manifest is set by the validator after parsing fileText
      this.get('attrs').action(this.get('manifest'));
    }
  }

});
