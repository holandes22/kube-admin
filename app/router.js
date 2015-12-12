import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('pods', function() {
    this.route('pod', { path: ':name' });
  });
  this.route('replication-controllers', function() {
    this.route('replication-controller', { path: ':name' });
  });
  this.route('services', function() {
    this.route('service', { path: ':name' });
  });
  this.route('namespaces', function() {
    this.route('namespace', { path: ':name' });
  });
});

export default Router;
