export default function(server) {
  server.createList('pod', 10);
  server.createList('node', 3);
  server.createList('service', 5);
  server.createList('replicationcontroller', 10);
}
