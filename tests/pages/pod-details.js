import PageObject from '../page-object';

let {
  text,
  clickable
} = PageObject;

export default PageObject.create({
  visit(pod) {
    let url = `/namespaces/${pod.metadata.namespace}/pods/${pod.metadata.name}`;
    return visit(url);
  },
  error: text('.ui.negative.message'),
  success: text('.ui.positive.message'),
  pending: text('[data-id=pending]'),
  del: clickable('[data-id=delete]'),
  approve: clickable('[data-id=approve]'),

});
