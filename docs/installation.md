# Overview

The application runs in a docker container which is basically an nginx image serving the static files.
This docker image is deploy using kubernetes itself in the kube-system namespace.

The package contains kubernetes manifests and a bash script to create a service and a replication controller.

The Dockerfile for the image can be found [here](https://github.com/holandes22/kube-admin/blob/master/packaging/Dockerfile)

# Where to obtain the package

The package can be obtained from the releases page of the [project](https://github.com/holandes22/kube-admin/releases)

# Installer prerequisites

- Kubernetes (using docker as container engine) 1.1 or later
- Kubernetes command line tool: kubectl (in order to create the kube-admin replication controller and service)

# Installation

```bash
$ tar -xvzf kube-admin-k8s-vXXX.tar.gz
$ cd kube-admin
$ sh start-in-k8s
```

The newly created replication controller might take some time to spin up a new pod. After the pod is up, the application should become
available. See the usage section to get started.

The installer uses the following defaults to talk to kubernetes:

- *Cluster address:* http://localhost:8080
- *kubectl path:* kubectl

You can control the above by setting the envars: `KUBE_ADMIN_CLUSTER_ADDR` and `KUBE_ADMIN_KUBECTL_PATH`

# Upgrade

Untill the install script supports upgrade, use:

    kubectl rolling-update kube-admin-<someversion> -f rc-manifest.yml --namespace="kube-system"

# Alternative install options

At this moment, the application has no dedicated back-end and it is formed only of static files (javascript, css, html) therefore
is quite simple to just serve this files. For example, using python simple HTTP server module:

    cd dist # dir containing index.html and the compiled static files
    python2 -m SimpleHTTPServer

Now the app is served at localhost:8000

To simplify, I just provided the install in kubernetes option, but if there is need for other ways to serve the app, they should be quite easy to add.
