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
#### running the container in interactive mode
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

### Repo directory with everything needed to build the Docker image.

All the files needed for this step are located in the folder `docker-images/express-image/`

### Setting-up the Docker file
The Dokerfile used contains the following configuration :
```docker
FROM node:12

COPY content/ /opt/app

CMD ["node", "/opt/app/index.js"]
```
>`FROM node:12`
	We create a new Docker image from the latest 12th version of Node.js *(at the buil time v12.16.3)* which is the current LTS version.

>`COPY content/ /opt/app`
	we copy the content of the local file `content` to the Docker image file `/opt/app`
	this file contains our Node.js test page

> `CMD ["node", "/opt/app/index.js"]`
	this command launches the `/opt/app/index.js` application *which is out test Nose.js application*

### You can do a demo, where you build the image, run a container and access content from a browser.


Here are the screen-shots and/or informations for the different steps :

#### Building the image

In order to build the image, the following command was used : `$ docker build -t res/express_playground .`
this was the output :

````
Sending build context to Docker daemon  4.051MB
Step 1/3 : FROM node:12
 ---> bdca973cfa07
Step 2/3 : COPY content/ /opt/app
 ---> Using cache
 ---> dffe93f7f3eb
Step 3/3 : CMD ["node", "/opt/app/index.js"]
 ---> Using cache
 ---> ba256fb81306
Successfully built ba256fb81306
Successfully tagged res/express_playground:latest
SECURITY WARNING: You are building a Docker image from Windows against a non-Windows Docker host. All files and directories added to build context will have '-rwxr-xr-x' permissions. It is recommended to double check and reset permissions for sensitive files and directories.
````

#### running the container in interactive mode
Command used : `$ docker run -p 9090:3000 res/express_playground`

#### Result in different applications

##### the output from the Docker command line
<img src="pictures\step2\result-docker-output.png" />

##### the output from the windowns command line

Command used in order to connect to the Docker machine : `telnet 192.168.99.100 9090`
Command used in order to get a response from the Docker machine :`GET / HTTP/1.0`


<img src="pictures\step2\result-cmd-window.png" />

##### the result in a web browser
<img src="pictures\step2\result-chrome.png" />

##### the result in Postman
<img src="pictures\step2\result-postmann.png" />

### You generate dynamic, random content and return a JSON payload to the client.
The JSON payload generated is a list of emplyment jobs.

The code usd is the function `createJobs()` that can be foud in the `index.js`located in the folder `docker-images/express-image/content`.

Here is the function :
```javascript
function createJobs(){
	
	var numberOfJobs = chance.integer({
		min: 5,
		max: 20
	});
	
	var jobs = [];

	for(var i = 0; i< numberOfJobs; i++){

		var companyDomaine = chance.domain();

		jobs.push({
			jobName : chance.profession({rank: true}),
			companyName : chance.company(),
			companyContact : {
				companyAddress : chance.address(),
				companyWebsite : "https://"+companyDomaine,
				companyEmail : chance.email({domain: companyDomaine}),
				companyPhone : chance.phone({ country: 'fr', mobile: false })
			},
			rate : chance.integer({	min: 1, max: 5}) * 20 + "%",
			annualSalary : chance.euro({max: 100000})
		});

	}
	console.log(jobs);
	return jobs;
}
```

It creates between 5 an 20 jobs with their own job name, company (with email and contact info) rate and salary.

The Node.js test app we created has the following configuration :

```json
{
  "name": "node-js-playground",
  "version": "0.1.0",
  "description": "Just for testing some Node.js stuff",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Edouard de Chambrier, Jeremy Corbaz",
  "license": "ISC",
  "dependencies": {
    "chance": "^1.1.6",
    "express": "^4.17.1"
  }
}
```

## Step 3: Reverse proxy with apache (static configuration)

### Repo directory with everything needed to build the Docker image.
for this part, we are going to re-use the `res/apache_php` Docker image created in the first part.

the command used to launch it is the following :
`$ docker run -d --name apache_static res/apache_php`

We are also going to re-use the `res/express_playground` Docker image created in the second part.

the command used to launch it is the following :
`$ docker run -d --name express_dynamic res/express_playground`

We have both images running with the following configurations :
<img src="pictures\step3\docker-running-images.png" />

>Even if it is not written in the screen-shot above, the express_dynamic image is listening on the port 3000

### testing revers proxy

In order to setup a testing environment for the reverse proxy, a basic apache server has to be started (with access to the bash):
`docker run -it -p 8080:80 php:7.2-apache /bin/bash`

As some configuration files will have to be created/updated, we have to install an editor on the machine.
>I used nano, as I was having problems with vim

`apt-get update`
`apt-get install nano`

The `001-default.conf` file vas created in the direcoty `/etc/apache2/sites-available/` with the following configuration :
<img src="pictures\step3\001-config.png" />

After, the *new* site had to be enabled with the folowing command :
`root@055b6cceb856:/etc/apache2# a2ensite 001*`
>note that the directory is important as well

In order to enable our neuw configurtation, som resources had to be activated and the apache server restarted
root@055b6cceb856:/etc/apache2# `a2enmod proxy`
root@055b6cceb856:/etc/apache2# `a2enmod proxy_http`
root@055b6cceb856:/etc/apache2# `service apache2 restart`

And both redirections where successfully tested :

<img src="pictures\step3\cmd-working-proxypass.png" />

<img src="pictures\step3\cmd-working-proxypass-json.png" />


### creating the Docker image

The configuration above is all well and good, but it is not permanent... 
Here are the steps taken in order to create a Docker image with a similar configuration.

#### the Dockerfile

The docker file used has the following configuration :
```
FROM php:7.2-apache

COPY conf/ /etc/apache2

RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*
```
>it crates a Docker image based on the official `php:7.2-apache` image
	copies the content of the local folder `conf/` to the image folder `/etc/apache2`
	runs the necessary commands to enable the proxy, reverse proxy and the custom configuration of the `.conf` files.

#### the apache configuration files

The `.conf` files have basically the same configuration as tested forehand.

The `000-default.conf`file has the following configuration :

```
<VirtualHost *:80>
</VirtualHost>
```

> this file is created in order to force the external connection to use the server name `demo.res.ch` from the `001-reverse-proxy.conf` file.

And the `001-reverse-proxy.conf` has this configuration :

```
<VirtualHost *:80>
		ServerName demo.res.ch
		
		ProxyPass "/api/students/" "http://172.17.0.3:3000"
		ProxyPassReverse "/api/students/" "http://172.17.0.3:3000"
		
		ProxyPass "/" "http://172.17.0.2:80"
		ProxyPassReverse "/" "http://172.17.0.2:80"
		
</VirtualHost>
```

#### building the image
The Docker image can now be built with the following command :
`docker build -t res/apache_rp .`

#### testin the image

We can now test the newly built image by running it with the following command:
`docker run -p 8080:80 res/apache_rp`

By opening the URL `http://192.168.99.100:8080/` in a web-browser, shockingly we have the following error :
	<img src="pictures\step3\forbidden.png" />

This is because the correct Host *should be `Host:demo.res.ch`* has not been specified.

In order to remedy this, we will have to modify the DNS configuration file.
In Windows, this file est called `hosts` an can be found in the following folder : `C:\Windows\System32\drivers\etc`

the followin line mut be added in the file :
```

192.168.99.100 demo.res.ch

```

We can now tryout our websites again.

And without any surprises, everything works !

<img src="pictures\step3\working-browser-bootstrap-example.png" />
>`http://demo.res.ch:8080/`



<img src="pictures\step3\working-browser-api-students.png" />
>`http://demo.res.ch:8080/api/students/`

### You are able to explain why the static configuration is fragile and needs to be improved.

The configuration is fragile because the the `IP` addresses of the `apache static server` and the `dynamic web server` are hard coded in the configuration.
This is a problem because the `IP` addresses of the Docker containers are dynamically attributed. therefor, if the containers have to be re-started, their `IP` addresses can be different and the system would not work anymore.





