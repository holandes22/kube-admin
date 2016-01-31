import Mirage from 'ember-cli-mirage';

const reasons = {
  '400': 'BadRequest',
  '409': 'AlreadyExists',
  '422': 'Invalid'
};

const idFromName = function(name) {
  return parseInt(name.split('-')[1]) + 1;
};

const getStatusResponse = function(name) {
  const code = name.split('-')[1];
  let data = {
    'code': code,
    'kind': 'Status',
    'message': `error msg ${code}`,
    'metadata': {},
    'reason': reasons[code],
    'status': 'Failure'
  };
  return new Mirage.Response(400, {}, data);
};

export default function() {

  this.urlPrefix = 'http://localhost:8080';
  this.namespace = 'api/v1';
  this.timing = 500;      // delay for each request, automatically set to 0 during testing

  this.get('/namespaces', function(db) {
    return { items: db.namespaces };
  });

  this.post('/namespaces', function(db, request) {
    const manifest = JSON.parse(request.requestBody),
          name = manifest.metadata.name;
    if ( name.includes('error') ) {
      return getStatusResponse(name);
    }
    return db.namespaces.insert(manifest);
  });

  this.get('/pods', function(db) {
    return { items: db.pods };
  });

  this.post('/namespaces/:namespace/pods', function(db, request) {
    const namespace = request.params.namespace,
          manifest = JSON.parse(request.requestBody),
          name = manifest.metadata.name;
    if ( name.includes('error') ) {
      return getStatusResponse(name);
    }
    manifest.metadata.namespace = namespace;
    return db.pods.insert(manifest);
  });

  this.get('/namespaces/:namespace/pods/:name', function(db, request) {
    return db.pods.find(idFromName(request.params.name));
  });

  this.get('/services', function(db) {
    return { items: db.services };
  });

  this.post('/namespaces/:namespace/services', function(db, request) {
    const namespace = request.params.namespace,
          manifest = JSON.parse(request.requestBody),
          name = manifest.metadata.name;
    if ( name.includes('error') ) {
      return getStatusResponse(name);
    }
    manifest.metadata.namespace = namespace;
    return db.services.insert(manifest);
  });

  this.get('/namespaces/:namespace/services/:name', function(db, request) {
    return db.services.find(idFromName(request.params.name));
  });

  this.get('/replicationcontrollers', function(db) {
    return { items: db.replicationcontrollers };
  });

  this.post('/namespaces/:namespace/replicationcontrollers', function(db, request) {
    const namespace = request.params.namespace,
          manifest = JSON.parse(request.requestBody),
          name = manifest.metadata.name;
    if ( name.includes('error') ) {
      return getStatusResponse(name);
    }
    manifest.metadata.namespace = namespace;
    return db.replicationcontrollers.insert(manifest);
  });

  this.get('/namespaces/:namespace/replicationcontrollers/:name', function(db, request) {
    return db.replicationcontrollers.find(idFromName(request.params.name));
  });
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
