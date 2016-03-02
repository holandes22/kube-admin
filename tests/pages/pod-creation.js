import Ember from 'ember';
import PageObject from 'kube-admin/tests/page-object';
import ResourceCreationBase from './resource-creation-base';

let {
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
        "image": "fake/fake:fake",
        "name": "fake",
        "ports": [
          {
            "containerPort": 2000,
            "name": "client"
          },
          {
            "containerPort": 2001,
            "name": "server"
          }
        ]
      }
    ],
    "restartPolicy": "Never"
  }
};

let definition = Ember.merge(
  ResourceCreationBase,
  {
    visit: visitable('/pods'),
    getFileContent() { return fileContent; }
  }
);

export default PageObject.create(definition);
