import PageObject from '../page-object';

let {
  text,
  count,
  clickable
} = PageObject;

export default {
  submit: clickable('[data-autoid=submit-file]'),
  error: text('.ui.negative.message'),
  success: text('.ui.positive.message'),
  messageCount: count('.ui.message'),

  create(manifest) {
    this.visit();
    triggerFileSelected('input:file', JSON.stringify(manifest));
    return this.submit();
  },

  createError(code) {
    let manifest = JSON.parse(JSON.stringify(this.getFileContent()));
    manifest.metadata.name = `error-${code}`;
    return this.create(manifest);
  },

  createWithNamespace() {
    let manifest = JSON.parse(JSON.stringify(this.getFileContent()));
    manifest.metadata.namespace = 'fake';
    return this.create(manifest);
  },

  createWithoutNamespace() {
    return this.create(this.getFileContent());
  },

  createEmptyNamespace() {
    let manifest = JSON.parse(JSON.stringify(this.getFileContent()));
    manifest.metadata.namespace = '';
    return this.create(manifest);
  }
};
