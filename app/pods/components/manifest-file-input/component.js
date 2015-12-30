import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const {
  run: {
    bind
  }
} = Ember;


var Validations = buildValidations({
  fileInfo: validator('presence', true)
});

// TODO:
// - Handle very large files (maybe show a progress bar and allow cancel)
// - Validate type is application/json and parses correctly
// - Validate is correct kind
// - Show form validation error (is empty)

export default Ember.Component.extend(Validations, {

  fileInfo: null,

  errorMessage: null,

  didInsertElement() {
    this.$('input:file').on('change', bind(this, 'handleFileSelection'));
  },

  handleFileSelection(event) {
    this.set('errorMessage', null);
    const file = event.target.files[0];

    this.readFile(file).then((fileInfo) => {
      this.set('fileInfo', fileInfo);
    }).catch((reason) => {
      window.console.log('TODO: handle error', reason);
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
      if (this.get('validations.isInvalid')) {
        this.set('errorMessage', this.get('validations.messages')[0]);
      } else {
        const fileInfo = this.get('fileInfo'),
              kind = this.get('kind');
        let manifest = {},
            errorMessage = null;
        try {
          manifest = JSON.parse(fileInfo.text);
          if (!manifest.kind) {
            errorMessage = 'Bad manifest (No kind attribute)';
          } else if (manifest.kind !== kind) {
            errorMessage = `Resource kind should be ${kind}`;
          }
        } catch(error) {
          errorMessage = 'Selected file must be valid JSON';
        }

        if (!!errorMessage) {
          this.set('errorMessage', errorMessage);
        } else {
          this.get('attrs').action(manifest);
        }
      }
    }
  }

});
