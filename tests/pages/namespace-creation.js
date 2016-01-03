import PageObject from '../page-object';

let {
  visitable,
  fillable,
  clickable,
  text
} = PageObject;

export default PageObject.create({
  visit: visitable('/namespaces'),
  name: fillable('#namespace-name-input'),
  submitName: clickable('[data-autoid=submit-name]'),
  submitFile: clickable('[data-autoid=submit-file]'),
  error: text('.ui.negative.message'),
  success: text('.ui.positive.message'),

  createByName(name) {
    return this.visit()
      .name(name)
      .submitName();
  },

  createByFile(content) {
    this.visit();
    triggerFileSelected('input:file', content);
    return this.submitFile();
  }

});