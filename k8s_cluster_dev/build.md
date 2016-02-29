This should be done whenever there is a new kubernetes version.

Image name is of the form `holandes22/hyperkube:<kubernetes_version>-cors`


Build the image, login to docker hub account and push the image

    $ docker build -t <image_name> .
    $ docker login
    $ docker push <image_name>

Finally, edit the docker-compose file to use the image name in the master container
