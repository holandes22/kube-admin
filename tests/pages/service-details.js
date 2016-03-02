import PageObject from 'kube-admin/tests/page-object';

let {
  text,
  isHidden,
  visitable,
  collection
} = PageObject;

export default PageObject.create({
  visit: visitable('/namespaces/:namespace/services/:name'),
  isPortsSectionHidden: isHidden('[data-autoid=ports]'),
  details: {
    name: text('[data-autoid=name]'),
    labels: text('[data-autoid=labels]'),
    ports: collection({
      itemScope: '[data-autoid=ports] tbody tr',
      item: {
        name: text('td:nth-of-type(1)'),
        protocol: text('td:nth-of-type(2)'),
        port: text('td:nth-of-type(3)'),
        targetPort: text('td:nth-of-type(4)'),
        link: text('td:nth-of-type(5)'),
      }
    })
  }
});
