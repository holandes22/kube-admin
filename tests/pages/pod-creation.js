import PageObject from '../page-object';

let {
  text,
  count,
  clickable,
  visitable
} = PageObject;


let fileContent = {
  "apiVersion": "v1",
  "kind": "Pod",
  "metadata": {
    "labels": {
      "app": "fake"
    },
    "name": "fake",
  },
  "spec": {
    "containers": [
      {
        "image": "fake",
        "name": "fake",
        "ports": [
          {
            "containerPort": 2000,
            "name": "client",
            "protocol": "TCP"
          },
          {
            "containerPort": 2001,
            "name": "server",
            "protocol": "TCP"
          }
        ]
      }
    ],
    "restartPolicy": "Never"
  }
};

export default PageObject.create({
  visit: visitable('/pods'),
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
    let manifest = JSON.parse(JSON.stringify(fileContent));
    manifest.metadata.name = `error-${code}`;
    return this.create(manifest);
  },

  createWithNamespace() {
    let manifest = JSON.parse(JSON.stringify(fileContent));
    manifest.metadata.namespace = 'fake';
    return this.create(manifest);
  },

  createWithoutNamespace() {
    return this.create(fileContent);
  },

  createEmptyNamespace() {
    let manifest = JSON.parse(JSON.stringify(fileContent));
    manifest.metadata.namespace = '';
    return this.create(manifest);
  }
});
