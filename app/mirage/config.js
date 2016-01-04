import Mirage from 'ember-cli-mirage';

const reasons = {
  '400': 'BadRequest',
  '409': 'AlreadyExists',
  '422': 'Invalid'
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
  this.timing = 400;      // delay for each request, automatically set to 0 during testing

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
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
