export default function makeEntityObjects(total) {
  let entities = [];
  for (let i = 0; i < total; i++) {
    const name = `name${i}`,
          namespace = `namespace${i}`,
          creationTimestamp = i;
    entities.push({ metadata: { name, namespace, creationTimestamp } });
  }
  return entities;
}
