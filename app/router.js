import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('pods');
  this.route('pod', { path: 'namespaces/:namespace/pods/:name' });
  this.route('pod.container', { path: 'namespaces/:namespace/pods/:name/containers/:container' });
  this.route('pod.log', { path: 'namespaces/:namespace/pods/:name/containers/:container/log' });
  this.route('replication-controllers');
  this.route('replication-controller', { path: 'namespaces/:namespace/replication-controllers/:name' });
  this.route('services');
  this.route('service', { path: 'namespaces/:namespace/services/:name' });
  this.route('settings');
  this.route('not-found', { path: '/*path' });
});

export default Router;
