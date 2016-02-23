import Ember from 'ember';

export default Ember.Mixin.create({

  session: Ember.inject.service(),

  actions: {
    del(manifest) {
      let flashMessages = this.get('flashMessages');
      flashMessages.clearMessages();
      this.get('kubeClient').deleteRecord(manifest).then(() => {
        let kind = manifest.kind;
        this.get(`session.pendingRemoval.${kind.toLowerCase()}`).push(manifest.metadata.name);
        let message = `Successfully sent request to delete ${manifest.kind} ${manifest.metadata.name}`;
        flashMessages.positive(message);
        this.transitionTo(Ember.Inflector.inflector.pluralize(kind).dasherize());
      }).catch((error) => {
        window.console.error(error);
        let message = null;
        if (error.errors) {
          message = error.errors[0].detail;
        } else {
          message = error.message;
        }
        flashMessages.negative(message, { sticky: true });
      });
    }
  }

});
