FROM gcr.io/google_containers/hyperkube:v1.1.8
RUN sed -i -e 's/              "apiserver",/              "apiserver",\n              "--cors-allowed-origins=.*",/g' /etc/kubernetes/manifests/master.json
RUN sed -i -e 's/              "apiserver",/              "apiserver",\n              "--cors-allowed-origins=.*",/g' /etc/kubernetes/manifests-multi/master.json
