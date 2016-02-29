# App develoment

The application is written using Ember.js. If you know Ember.js then you are good to go as
it is a standard ember-cli application.

Assuming you have node and bower installed:

    $ git clone git@github.com:holandes22/kube-admin
    $ cd kube-admin
    $ npm install
    $ bower install
    $ ember server

The ember server command starts an [ember-cli-mirage](http://www.ember-cli-mirage.com/) backend to simulate the kubernetes API
for dev purposes.

Running tests:

    $ ember test

The tests are only against chrome in CI (not using phantomjs) so during dev this is the browser to target.
Firefox is in the todo list.

If you are not familiar with Ember, the best place to start learning it is the official guide https://guides.emberjs.com/v2.3.0/
and the excellent ember 101 [book](https://github.com/abuiles/ember-101) (free, licensed under Creative Commons)

# Setting up a dev kubernetes cluster with docker

Ember mirage is used during dev to intercept AJAX requests and simulate kubernetes API responses.
But is usually hany to have an actual kubernetes cluster to use during dev.
In order to do this kubernetes cluster, we have a docker-compose configuration
to spin up a cluster, based on this [guide](http://kubernetes.io/v1.1/docs/getting-started-guides/docker.html)

The image used is based on the official image (`gcr.io/google_containers/hyperkube`)
and it is modified to allow CORS. If you want to know how it is built, check the [Dockerfile](https://github.com/holandes22/kube-admin/blob/master/k8s_cluster_dev/Dockerfile)

You need to have docker compose installed. Installation instructions can be found at the official [docs](https://docs.docker.com/compose/install/).

To start the cluster:

    $ cd k8s_cluster_dev
    $ docker-compose up # (use -d flag if you want to send it to the background)

The API should now accessible at http://localhost:8080/api

You can then start the ember dev server to proxy all the AJAX requests to this address:

    ember server --proxy http://localhost:8080

# Documentation

Documentation is built with Mkdocs, which renders HTML from markdown.
To install it, please follow the guide [here](http://www.mkdocs.org/#installation)

You can then run a dev server for the docs with:

    mkdocs serve

This will spin up a server to browse for rendered docs. It is very handy as it listens
on achanges in the docs files and rebuilts if needed.

# Issues board

[https://waffle.io/holandes22/kube-admin](https://waffle.io/holandes22/kube-admin)

# CI

[https://travis-ci.org/holandes22/kube-admin](https://travis-ci.org/holandes22/kube-admin)
