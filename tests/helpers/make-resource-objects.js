export default function makeResourceObjects(total) {
  let resources = [];
  for (let i = 0; i < total; i++) {
    const name = `name${i}`,
          namespace = `namespace${i}`,
          creationTimestamp = i;
    resources.push({ metadata: { name, namespace, creationTimestamp } });
  }
  return resources;
}
