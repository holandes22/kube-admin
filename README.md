# Kube-admin

## Prerequisites

You will need the following things properly installed on your computer.

* Docker

## Installation

Run as docker container

    docker run -d -p <SOME_PORT>:80 kube-admin

and then browse to localhost:<SOME_PORT>

or run it in k8s

    build/start-in-k8s

and browse to the address indicated by the script

## Building

The build script compiles all the js, hbs and css files using ember-cli build and then builds a docker image with these files.
The docker image name is `kube-admin`

`sh build.sh`
