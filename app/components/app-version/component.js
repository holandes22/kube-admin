import Ember from 'ember';
import ENV from 'kube-admin/config/environment';
const { version } = ENV.APP;

export default Ember.Component.extend({
  tagName: '',
  version
});
