import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  metadata(i) {
    const name =  `service${i}`,
          namespace = 'default',
          creationTimestamp = faker.date.recent();
    return { name, namespace, creationTimestamp };
  }
});
