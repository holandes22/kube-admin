import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('namespaces', function() {
    this.route('namespace', { path: ':namespace' });
  });
  this.route('pods');
  this.route('pod', { path: 'namespaces/:namespace/pods/:name' });
  this.route('replication-controllers');
  this.route('replication-controller', { path: 'namespaces/:namespace/replication-controllers/:name' });
  this.route('services');
  this.route('service', { path: 'namespaces/:namespace/services/:name' });
});

export default Router;
