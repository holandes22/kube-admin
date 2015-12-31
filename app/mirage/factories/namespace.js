import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  metadata(i) {
    const name =  `ns${i}`,
          creationTimestamp = faker.date.recent();
    return { name, creationTimestamp };
  }
});
