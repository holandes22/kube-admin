# Kube-admin

WIP

## Prerequisites

You will need the following things properly installed on your computer.

* Docker

## Installation

Run as docker container

    docker run -d -p <SOME_PORT>:80 kube-admin

and then browse to localhost:<SOME_PORT>

or run it in k8s

    build/kubernetes/start-in-k8s

and browse to the address indicated by the script
