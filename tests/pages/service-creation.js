import Ember from 'ember';
import PageObject from '../page-object';
import ResourceCreationBase from './resource-creation-base';

let {
  visitable
} = PageObject;

let fileContent = {
  'apiVersion': 'v1',
  'kind': 'Service',
  'metadata': {
    'name': 'fake'
  },
  'spec': {
    'clusterIP': '10.0.0.113',
    'ports': [
      {
        'name': 'api',
        'port': 8999
      }
    ]
  }
};

let definition = Ember.merge(
  ResourceCreationBase,
  {
    visit: visitable('/services'),
    getFileContent() { return fileContent; }
  }
);

export default PageObject.create(definition);
