# Welcome to KubeADMIN docs

TBD

## Overview

KubeADMIN is an administration dashboard for [kubernetes](http://kubernetes.io/ "Kubernetes")
It allows you to inspect and manage resources such as Node, Pods, ReplicationControllers, Services, etc.


## But why? Haven't you heard of KubeUI or cockpit?

Yes, but I did this project mostly to learn some stuff: ember.js, semantic-ui and Kubernetes.
But at the same time I tried to address some issues I found with the two existing frontend tools to manage Kubernetes: KubeUI and cockpit.

KubeUI is basically read only, no way to actually manage new resources. There is a branch for a new UI that apparently will add management but it hasn't seem movement in
several months.

Cockpit is truly amazing, but a bit of an overkill for what I wanted as it is intended for much more than handling containers.
