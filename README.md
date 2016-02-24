# Kube-admin

## Prerequisites

You will need the following things properly installed on your computer.

* Docker

## Installation

docker run -d -p 9090:80 kube-admin

## Building

The build script compiles all the js, hbs and css files using ember-cli build and then builds a docker image with these files.
The docker image name is `kube-admin`

`sh build.sh`
