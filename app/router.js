import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('namespaces', function() {
    this.route('namespace', { path: ':namespace' });
  });
  this.route('pods', { path: 'namespaces/:namespace/pods' }, function() {
    this.route('pod', { path: ':name' });
  });
  this.route('replication-controllers', { path: 'namespaces/:namespace/replication-controllers' }, function() {
    this.route('replication-controller', { path: ':name' });
  });
  this.route('services', { path: 'namespaces/:namespace/services' }, function() {
    this.route('service', { path: ':name' });
  });
});

export default Router;
