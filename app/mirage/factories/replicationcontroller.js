import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  metadata(i) {
    const name =  `replicationcontroller${i}`,
          namespace = 'default',
          creationTimestamp = faker.date.recent();
    return { name, namespace, creationTimestamp };
  }
});
