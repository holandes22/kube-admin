import Mirage from 'ember-cli-mirage';

const reasons = {
  '400': 'BadRequest',
  '409': 'AlreadyExists',
  '422': 'Invalid'
};

const getStatusResponse = function(code) {
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
      const code = name.split('-')[1];
      return getStatusResponse(code);
    }
    let namespace = db.namespaces.insert(manifest);
    return namespace;
  });

  this.get('/pods', function(db) {
    return { items: db.pods };
  });

  this.post('/namespaces/:namespace/pods', function(db, request) {
    const namespace = request.params.namespace,
          manifest = JSON.parse(request.requestBody);
    manifest.metadata.namespace = namespace;
    let pod = db.pods.insert(manifest);
    return pod;
  });
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
