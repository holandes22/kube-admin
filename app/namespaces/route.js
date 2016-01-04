import Ember from 'ember';
import ResourceListRouteMixin from 'kube-admin/mixins/resource-list-route';


export default Ember.Route.extend(ResourceListRouteMixin, {
  kind: 'namespace'
});
