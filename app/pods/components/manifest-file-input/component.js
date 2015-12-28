import Ember from 'ember';

const { run: { bind } } = Ember;

export default Ember.Component.extend({

  selectedFile: null,

  selectedFileName: 'Select JSON manifest file',

  didInsertElement() {
    this.$('input:file').on('change', bind(this, 'handleFileSelection'));
  },

  handleFileSelection(event) {
    const file = event.target.files[0];
    this.set('selectedFile', file);
    this.set('selectedFileName', file.name);
  },

  actions: {

    selectFile() {
      this.$('input:file').click();
    },

    action() {
      if (!!this.get('selectedFile')) {
        this.get('attrs').action(this.get('selectedFile'));
      } else {
        window.console.log('TODO: show validation error');
      }
    }

  }

});
