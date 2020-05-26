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
#### running the container in interactive
Command used : `$ docker run -p 9090:80 res/apache_php`
  <img src="pictures\step1\running-res-apache_php-interactive-mod.png" />
	

#### the result in a web browser
<img src="pictures\step1\running-res-apache_php-interactive-mod-browser.png" />



### nice looking web template, different from the one shown in the webcast.

the template was used from this website *(the result can me seen in the screen-shot above)* :
[TRAVEL FREE CSS TEMPLATE](https://www.free-css.com/free-css-templates/page253/travel)

A copy of them can be found on the repo at this location :
`docker-images/apache-php-image/content/`



### explain what you do in the Dockerfile

This is the content of the Dockerfile
````dockerfile
FROM php:7.2-apache

COPY content/ /var/www/html/
````
It indicates that we want to build a new Docker image form the already existing `php:7.2-apache` image.
It will differ for the original image by copying the content of the file `content/` to the `/var/www/html/`of the new image.
This directory contains all the files required for the static HTML web page.



### show where the apache config files are located (in a running container)

The Apache configuration files can be found in a running container at the following location :
`/etc/apache2`

In order to view the configuration files, the following command can be used :
```bash
Edouard@LAPTOP-F56LAN3B MINGW64 /c/Program Files/Docker Toolbox
$ docker exec -it vibrant_pike /bin/bash                                                                               
root@a86e9c1c697d:/var/www/html# cd /etc/apache2
root@a86e9c1c697d:/etc/apache2# ls
apache2.conf    conf-enabled  magic           mods-enabled  sites-available
conf-available  envvars       mods-available  ports.conf    sites-enabled
root@a86e9c1c697d:/etc/apache2#
```

The `apache2.conf` contains the main configuration.

The virtual-host configuration is situated here : `conf-enabled/000-default.conf´

And looks like this :
```
<VirtualHost *:80>
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        #ServerName www.example.com

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html

        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf
</VirtualHost>
```

### configuration documentation

In the virtual-host configuration, the tag `<VirtualHost *:80>` informs us that we accept a connection on the port 80.

The information `DocumentRoot /var/www/html` tells us where to place the files regarding our website.
If this directory is changed, it will also be necessary to change the `Dokerfile` accordingly.


## Step 2: Dynamic HTTP server with express.js
