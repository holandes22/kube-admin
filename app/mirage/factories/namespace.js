import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  kind: 'Namespace',

  metadata(i) {
    const name =  `ns${i}`,
          creationTimestamp = faker.date.recent();
    return { name, creationTimestamp };
  }
});
