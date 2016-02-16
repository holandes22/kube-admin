import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const {
  run: {
    bind
  }
} = Ember;


const Validations = buildValidations({
  fileInfo: [
    validator('presence', true),
    validator('valid-manifest')
  ]
});


export default Ember.Component.extend(Validations, {

  actionLabel: 'Create',

  fileInfo: null,

  // Hide validations at start
  selectionMade: false,

  didInsertElement() {
    this.$('input:file').on('change', bind(this, 'handleFileSelection'));
  },

  handleFileSelection(event) {
    // TODO:
    // - Handle very large files
    // (maybe show a progress bar and allow cancel)
    // - Properly handle read error
    const file = event.target.files[0];
    this.readFile(file).then((fileInfo) => {
      this.set('selectionMade', true);
      this.set('fileInfo', fileInfo);
    }).catch((reason) => {
      window.console.log('Error loading file:', reason);
    });
  },

  readFile(file) {
    const reader = new window.FileReader();
    reader.readAsText(file);
    return new Ember.RSVP.Promise((resolve, reject) => {
      reader.onload = function(event) {
        resolve({
          name: file.name,
          type: file.type,
          text: event.target.result
        });
      };
      reader.onerror = function(error) {
        reject({ event: 'onerror', error });
      };
    });
  },

  actions: {

    selectFile() {
      this.$('input:file').click();
    },

    action() {
      this.set('selectionMade', true);
      if (this.get('validations.isValid')) {
        // manifest is set by the validator after parsing fileInfo.text
        this.get('attrs').action(this.get('manifest'));
      }
    }
  }

});
