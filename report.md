# Report



## Step 1: Static HTTP server with apache httpd



### GitHub repo with everything needed to build the Docker image.

The files used for this step can be found in the repo at this location :
`docker-images/apache-php-image/`



### You can do a demo, where you build the image, run a container and access content from a browser.

Here are the screen-shots and/or informations for the different steps :

#### Building the image
In order to build the image, the following command was used : `$ docker build -t res/apache_php .`
this was the output *(note the WARNING because I am using Windows)* :
````
Edouard@LAPTOP-F56LAN3B MINGW64 ~/Documents/cours/HEIG-VD-Edou/3eme/2eme_semestre/RES/labo/labo-HTTP/Teaching-HEIGVD-RES-2020-Labo-HTTPInfra/docker-images/apache-php-image (fb-apache-static)
$ docker build -t res/apache_php .
Sending build context to Docker daemon  1.116MB
Step 1/2 : FROM php:7.2-apache
 ---> 75371824c1d5
Step 2/2 : COPY content/ /var/www/html/
 ---> de11a077ae19
Successfully built de11a077ae19
Successfully tagged res/apache_php:latest
SECURITY WARNING: You are building a Docker image from Windows against a non-Windows Docker host. All files and directories added to build context will have '-rwxr-xr-x' permissions. It is recommended to double check and reset permissions for sensitive files and directories.
````
#### running the container in interactive mode with the command `$ docker run -p 9090:80 res/apache_php`
  ![](pictures\step1\running-res-apache_php-interactive-mod.png)
	
#### the result in a web browser
![](pictures\step1\running-res-apache_php-interactive-mod-browser.png)



### nice looking web template, different from the one shown in the webcast.

the template was used from this website *(the result can me seen in the screen-shot above)* :
[TRAVEL FREE CSS TEMPLATE](https://www.free-css.com/free-css-templates/page253/travel)

A copy of them can be found on the repo at this location :
`docker-images/apache-php-image/content/`



### explain what you do in the Dockerfile

This is the content of the Dockerfile
````
FROM php:7.2-apache

COPY content/ /var/www/html/
````
It indicates that we want to build a new Docker image form the already existing `php:7.2-apache` image.
It will differ for the original image by copying the content of the file `content/` to the `/var/www/html/`of the new image.
This directory contains all the files required for the static HTML web page.



### show where the apache config files are located (in a running container)



### configuration documentation



## Step 2: Dynamic HTTP server with express.js