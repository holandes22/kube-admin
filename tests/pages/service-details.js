import PageObject from '../page-object';

let {
  text,
  isHidden,
  collection
} = PageObject;

export default PageObject.create({
  visit(service) {
    const url = `/namespaces/${service.metadata.namespace}/services/${service.metadata.name}`;
    return visit(url);
  },

  isPortsSectionHidden: isHidden('[data-autoid=ports]'),
  details: {
    name: text('[data-autoid=name]'),
    labels: text('[data-autoid=labels]'),
    ports: collection({
      itemScope: '[data-autoid=ports] tbody tr',
      item: {
        name: text('td:nth-of-type(1)'),
        port: text('td:nth-of-type(2)'),
        targetPort: text('td:nth-of-type(3)'),
        protocol: text('td:nth-of-type(4)'),
      }
    })
  }
});
