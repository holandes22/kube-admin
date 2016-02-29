# Welcome to KubeADMIN docs

## Overview

KubeADMIN is an administration dashboard for [Kubernetes](http://kubernetes.io/ "kubernetes").
It allows you to inspect and manage resources such as Node, Pods, ReplicationControllers, Services, etc.

** Note: this is currently in ALPHA. Do not use in production **

## But why?

What is the point? Haven't you heard about KubeUI or cockpit?

Yes, but I did this project mostly to learn some stuff: ember.js, semantic-ui and Kubernetes.
Having said that, I also tried to address some issues I found with the two existing frontend tools to manage Kubernetes.

KubeUI is basically read only, no way to actually manage new resources. There is a branch for a new UI that apparently will add management but it hasn't seem movement in
several months.

Cockpit is truly amazing, but a bit of an overkill for what I wanted as it is intended for much more than handling containers.

## Features

The features currently supported are:

- Inspect Nodes, Services, Pods and ReplicationControllers
- Create (using a JSON or YAML manifest file) Services, Pods and ReplicationControllers
- Delete Services, Pods and ReplicationControllers
- Scale ReplicationControllers
- Inspect pod logs

KubeADMIN also features a minimal resource usage dashboard in the main page (taking stats from cAdvisor), but it doesn't intent to be a monitoring tool (at least for now) so
there are no features planned focusing on this aspect.

Notable missing features are:

- Authentication by token
- Manage several kubernetes clusters at the same time
- Replication Controller rolling update
- Attach to pod terminal

See the [list of issues](https://github.com/holandes22/kube-admin/issues?q=is%3Aopen+is%3Aissue+label%3Afeature) tracking the above mentioned features and other currently planned features
