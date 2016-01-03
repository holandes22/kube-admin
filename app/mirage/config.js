import Mirage from 'ember-cli-mirage';


export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  this.urlPrefix = 'http://localhost:8080';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api/v1';    // make this `api`, for example, if your API is namespaced
  this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('/namespaces', function(db) {
    return { items: db.namespaces };
  });

  this.post('/namespaces', function(db, request) {
    const manifest = JSON.parse(request.requestBody),
          name = manifest.metadata.name;
    let data = {};
    if (name === 'already-exists') {
      data = {
        "apiVersion": "v1",
        "code": 409,
        "details": {
            "kind": "namespaces",
            "name": `"${name}`
        },
        "kind": "Status",
        "message": `namespaces "${name}" already exists`,
        "metadata": {},
        "reason": "AlreadyExists",
        "status": "Failure"
      };
      return new Mirage.Response(409, {}, data);
    } else if ( name === 'error' ) {
      data = {
        "code": 400,
        "kind": "Status",
        "message": "error msg",
        "metadata": {},
        "reason": "BadRequest",
        "status": "Failure"
      };
      return new Mirage.Response(400, {}, data);
    }
    let namespace = db.namespaces.insert(manifest);
    return namespace;
  });

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
