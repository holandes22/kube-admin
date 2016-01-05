import Ember from 'ember';
import PageObject from '../page-object';
import ResourceCreationBase from './resource-creation-base';

let {
  visitable
} = PageObject;

let fileContent = {
  'apiVersion': 'v1',
  'kind': 'ReplicationController',
  'metadata': {
    'name': 'fake'
  },
  'spec': {
    'replicas': 1,
    'template': {
      'metadata': {
        'labels': {
          'app': 'fake',
          'component': 'fake'
        }
      },
      'spec': {
        'containers': [
          {
            'image': 'fake',
            'name': 'fake',
            'ports': [
              {
                'containerPort': 18888,
                'name': 'static'
              }
            ]
          }
        ],
        'hostNetwork': true
      }
    }
  }
};

let definition = Ember.merge(
  ResourceCreationBase,
  {
    visit: visitable('/replication-controllers'),
    getFileContent() { return fileContent; }
  }
);

export default PageObject.create(definition);
