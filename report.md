# Report

Jérémy Corbaz

Edouard de Chambrier

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
<figure class="image">
  <img src="pictures\step3\working-browser-bootstrap-example.png" alt="Working bootstrap in browser">
  <figcaption>URL : http://demo.res.ch:8080/</figcaption>
</figure>

<figure class="image">
  <img src="pictures\step3\working-browser-api-students.png" alt="Working api in browser">
  <figcaption>URL : http://demo.res.ch:8080/api/students/</figcaption>
</figure>

### You are able to explain why the static configuration is fragile and needs to be improved.

The configuration is fragile because the the `IP` addresses of the `apache static server` and the `dynamic web server` are hard coded in the configuration.
This is a problem because the `IP` addresses of the Docker containers are dynamically attributed. therefor, if the containers have to be re-started, their `IP` addresses can be different and the system would not work anymore.

## Step 4: AJAX requests with JQuery

### setting-up the development environment

To keep the different steps of this project, the `docker-images/apache-php-image/` folder will be duplicated and and the files for the apache-php server used for this section will be places in this directors : `docker-images\apache-php-AjaxPlayground-image`

In order to set up the development environment, We will not be installing vim on the apache-php docker image.
Instead, the docker image will run with the following command :
 `docker run -it --rm --name ajax_playground -v "$PWD":/var/www/html/ php:7.2-apache`

> the terminal that is going to run the command has to be based in the directory where the file we want to use for our website are.

As the base website ts going to be heavily modified, it is easier to use proper tools instead of `vim` or `nano` form a docker image.

In order to finish the set-up, we have to start the `res/express_playground` image :
 `docker run -d --name express_dynamic res/express_playground`

And the `res/apache_rp` Docker image :
`docker run -p 8080:80 res/apache_rp`

Both of these containers must also be started because :

- the `ajax_playground`image does not have a pot redirection
- the code in the `ajax_playground` is going to have to get information from the `res/express_playground`image
- in order to see the result in a browser, to link everything together *(and also to eliminate Cross-site scripting attacks)* the `res/apache_rp` image must be used.

### modifying the template and adding AJAX queries

The original template has been simplified in order to be able to present a list of jobs.

The different jobs are generated by the AJAX calls to the `res/express_playground` server image.

The JavaScript managing those calls can be found in the file `docker-images/apache-php-AjaxPlayground-image/content/scripts/job-loader.js`. 
Basically, it populates the content of a `<div>` with a list of jobs. The list continues to grow every two seconds until it reaches at least 50 jobs.
One the 50 job limit is reached, the content of the `<div>` is cleared before adding the next jobs.

### creating the `res/ajax_playground` image and viewing the result

#### Dockerfile

As we only modified the content of the website and not the configuration of the docker image, the Dockerfile is the same as in the first step :
````dockerfile
FROM php:7.2-apache

COPY content/ /var/www/html/
````

#### creating and running the image

The image can now be created with the following command : `docker build -t res/ajax_playground .`
We can now run it `docker run -d  res/ajax_playground` *(after killing the test container from before)* and if all the required containers are running with the correct `IP` addresses, we should have a wonderful result :

<figure class="image">
  <img src="pictures\step4\job-list-in-browswer.png" alt="Working AJAX">
  <figcaption>URL : http://demo.res.ch:8080/</figcaption>
</figure>

You can see in the developer par three Ajax calls.

## Step 5: Dynamic reverse proxy configuration

### testing out the Docker configuration

In order to setup our dynamic revers proxy, a copy of the `res/apache_rp` has been in the `docker-images/apache-reverse-proxy-dynamic` folder.

In order to pass variables form the `docker run` to the image internal configuration, the `apache2-foreground` file has been copied from it's original place (https://github.com/docker-library/php/blob/master/7.2/stretch/apache/apache2-foreground) and altered in order to add the flowing lines :
```
# Add setup for RES lab : dynamic reverse proxy
echo "Setup for the RES lab..."
echo "Static app URL:  $STATIC_APP"
echo "Dynamic app URL: $DYNAMIC_APP"
```

The Dockerfile has also been modified in order to take into account the `apache2-foreground` file :
```
FROM php:7.2-apache

COPY apache2-foreground /usr/local/bin/

COPY conf/ /etc/apache2

RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*
```

We can now make a `docker build -t res/apache_rp_dyn .` to build the image.
Now the image is built, we can run `docker run -e STATIC_APP=127.17.0.2:80 -e DYNAMIC_APP=172.17.0.3:3000 res/apache_rp_dyn` and have a look at the output to see if everything went ok.

<figure class="image">
  <img src="pictures\step5\passing-var-test.png" alt="testing STATIC_APP and DYNAMIC_APP variables">
</figure>

As proven by the screen-shot above, everything went smoothly.


### preparing the config template

As instructed, the configuration template file has been created and completed.
`docker-images/apache-reverse-proxy-dynamic/template/config-template.php`

It is time to test it !

<figure class="image">
  <img src="pictures\step5\php-config-test.png" alt="testing STATIC_APP and DYNAMIC_APP variables in php config template file">
</figure>

Everything OK !

### putting everythig together

The firs step to putting everything together in order to have a dynamic reverse proxy is to add the `config-template.php` file created earlier to the `res/apache_rp_dyn` Docker image.

In order to do so, we have to alter again the Docker file by adding the line `COPY templates /var/apache2/templates` :
```
FROM php:7.2-apache

COPY apache2-foreground /usr/local/bin/

COPY templates /var/apache2/templates
COPY conf/ /etc/apache2

RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*
```

We also have to add the line `php /var/apache2/templates/config-template.php > /etc/apache2/sites-available/001-reverse-proxy.conf`  and `php /var/apache2/templates/config-template.php > /etc/apache2/sites-enabled/001-reverse-proxy.conf`in the `apache2-foreground` file in order to apply the configuration by outputting it as a file in the correct location *(the second line is to enable the website, it will be needed after some cleanup...)*.
```
# Add setup for RES lab : dynamic reverse proxy
echo "Setup for the RES lab..."
echo "Static app URL:  $STATIC_APP"
echo "Dynamic app URL: $DYNAMIC_APP"
php /var/apache2/templates/config-template.php > /etc/apache2/sites-available/001-reverse-proxy.conf
php /var/apache2/templates/config-template.php > /etc/apache2/sites-enabled/001-reverse-proxy.conf
```

As the `001-reverse-proxy.conf` is being overwritten, we can delete the original file form the folder `docker-images\apache-reverse-proxy-dynamic\conf\sites-available`
the following line has also to be modified in the Dockerfile : `RUN a2ensite 000-* 001-*` --> `RUN a2ensite 000-*`

```
FROM php:7.2-apache

COPY apache2-foreground /usr/local/bin/

COPY templates /var/apache2/templates
COPY conf/ /etc/apache2

RUN a2enmod proxy proxy_http
RUN a2ensite 000-*
```

And now, we can rebuild the Docker image : `docker build -t res/apache_rp_dyn .`

### testing to see if it all works

We start by checking that no containers are running.
Then we can start multiple instances of the `res/ajax_playground` and `res/express_playground` images in order to have different `IP` addresses.

>note that a name has been given to the image instances we are going to use

```
docker ps

docker run -d  res/ajax_playground
docker run -d  res/ajax_playground
docker run -d  res/ajax_playground
docker run -d --name apache_ajax res/ajax_playground

docker run -d res/express_playground
docker run -d res/express_playground
docker run -d --name express_dynmanic res/express_playground
```

<figure class="image">
  <img src="pictures\step5\part5-validating-01.png" alt="Validating part 1">
</figure>
Now we check the `IP` addresses for the instances `apache_ajax` and `express_dynmanic`

```
docker inspect apache_ajax | grep -i ipaddress
docker inspect express_dynmanic | grep -i ipaddress
```

<figure class="image">
  <img src="pictures\step5\part5-validating-02.png" alt="Validating part 2 : getting the IP addresses">
</figure>
> we have found the IP for apache_ajax : 172.17.0.5
 and for express_dynmanic : 172.17.0.8

Now we have to run `docker run -e STATIC_APP=172.17.0.5:80 -e DYNAMIC_APP=172.17.0.8:3000 --name apache_rp_dyn -p 8080:80 -it res/apache_rp_dyn`

And we can get the rewarding results :
<figure class="image">
  <img src="pictures\step5\part5-validating-04.png" alt="Validating part 2 : getting the IP addresses">
</figure>

<figure class="image">
  <img src="pictures\step5\part5-validating-03.png" alt="Validating part 2 : getting the IP addresses">
</figure>


## Extra points !

### Load balancing: multiple server nodes

#### settin-up the configuration

All the files regarding this step can be found in the following directory : `docker-images/apache-reverse-proxy-dynamic-loadbalance` 

In order to enable the load balancing, the `config-template.php` file has been modified like so :
```php
<?php
$dynamic_app[0] = getenv('DYNAMIC_APP_0');
$dynamic_app[1] = getenv('DYNAMIC_APP_1');
$static_app[0] = getenv('STATIC_APP_0');
$static_app[1] = getenv('STATIC_APP_1');
$static_app[2] = getenv('STATIC_APP_2');
?>
<VirtualHost *:80>
		ServerName demo.res.ch
		
		<Location "/balancer-manager">
				SetHandler balancer-manager
		</Location>
		
		ProxyPass /balancer-manager !
		
		<Proxy balancer://dynamic>
				BalancerMember http://<?php echo $dynamic_app[0] ?> 
				BalancerMember http://<?php echo $dynamic_app[1] ?> 
				ProxySet lbmethod=byrequests
		</Proxy>
		
		<Proxy balancer://staticapp>
				BalancerMember http://<?php echo $static_app[0] ?> 
				BalancerMember http://<?php echo $static_app[1] ?> 
				BalancerMember http://<?php echo $static_app[2] ?> 
				ProxySet lbmethod=byrequests
		</Proxy>
		
		ProxyPass "/api/students/" "balancer://dynamic/"
		ProxyPassReverse "/api/students/" "balancer://dynamic/"
		
		ProxyPass "/" "balancer://staticapp/"
		ProxyPassReverse "/" "balancer://staticapp/"
		
</VirtualHost>
```
As you can can see, we have set the file for two servers for the `dynamic app` and three for the `static app`.

This part of the configuration is to enable a Load Balancer Manager web interface that should be accessed via the following URL : http://demo.res.ch:8080/balancer-manager
```
<Location "/balancer-manager">
		SetHandler balancer-manager
</Location>
```
In order not to be redirected to one of the `static app` servers when entering the URL from above, this line has to be added : `ProxyPass /balancer-manager !`

The `<Proxy balancer://[balancer-name]>` tags are where we define the different servers. The `ProxySet lbmethod=byrequests` determines the way the balancing for the concerned servers should work.
In this case, `byrequests` works in a round-robin mode.

For the `ProxyPass` and `ProxyPassReverse` part of the configuration file, all we need to do is to set the target to `balancer://[balancer-name]` URL.

The `apache2-foreground` file has also been modified (just so that we know what is going on...):
```
# Add setup for RES lab : dynamic reverse proxy
echo "Setup for the RES lab... LOAD BALANCING !!!!!"
echo "Static app URL:  $STATIC_APP_0"
echo "Static app URL:  $STATIC_APP_1"
echo "Static app URL:  $STATIC_APP_2"
echo "Dynamic app URL: $DYNAMIC_APP_0"
echo "Dynamic app URL: $DYNAMIC_APP_1"
php /var/apache2/templates/config-template.php > /etc/apache2/sites-available/001-reverse-proxy.conf
php /var/apache2/templates/config-template.php > /etc/apache2/sites-enabled/001-reverse-proxy.conf
```

Now that everything is correctly configured, we can build the image : `docker build -t res/apache_lb .`

#### getting the Docker conainers ready

We start by checking that no containers are running.
Then we can start multiple instances of the `res/ajax_playground` and `res/express_playground` and get their `IP` addresses

```bash
docker ps

docker run -d --name apache_ajax_0 res/ajax_playground
docker run -d --name apache_ajax_1 res/ajax_playground
docker run -d --name apache_ajax_2 res/ajax_playground

docker run -d --name express_dynmanic_0 res/express_playground
docker run -d --name express_dynmanic_1 res/express_playground

docker inspect apache_ajax_0 | grep -i ipaddress
docker inspect apache_ajax_1 | grep -i ipaddress
docker inspect apache_ajax_2 | grep -i ipaddress
docker inspect express_dynmanic_0 | grep -i ipaddress
docker inspect express_dynmanic_1 | grep -i ipaddress
```

<figure class="image">
  <img src="pictures\stepB-lb\clean-and-start.png" alt="Starting conainers">
</figure>

<figure class="image">
  <img src="pictures\stepB-lb\getting-ip.png" alt="Getting IP addresses">
</figure>

The following `IP` addresses are found :
```
apache_ajax_0 : 172.17.0.2
apache_ajax_1 : 172.17.0.3
apache_ajax_2 : 172.17.0.4

express_dynmanic_0 : 172.17.0.5
express_dynmanic_1 : 172.17.0.6
```

We can now start our `res/apache_lb` server and take a look at the result !
`docker run -e STATIC_APP_0=172.17.0.2:80 -e STATIC_APP_1=172.17.0.3:80 -e STATIC_APP_2=172.17.0.4:80 -e DYNAMIC_APP_0=172.17.0.5:3000 -e DYNAMIC_APP_1=172.17.0.6:3000 --name apache_rp_dyn -p 8080:80 -it res/apache_lb`

>in the future, this should be automated

<figure class="image">
  <img src="pictures\stepB-lb\web-ok.png" alt="Resul web still working">
</figure>

<figure class="image">
  <img src="pictures\stepB-lb\web-load-balancer.png" alt="having a look at the balancer-manager">
</figure>
You can see in the balancer-manager screen-shot that the `balancer://dynamic` has been elected far more often than the `balancer://staticapp`.
This our javascript in work ! As it is calling for new jobs every 2 seconds.


### Load balancing: round-robin vs sticky sessions

#### setting-up the configuration

>All the files regarding this step can be found in the following directory : `docker-images/apache-reverse-proxy-dynamic-loadbalance-sticky` 

Sticky sessions can be very useful in different cases : for example, if you have to log into a web page, you do not want to re-log your self every time you clock on a link or reload the page because you have been routed to a different server.

To set up the sticky sessions, we are going to modify the `config-template.php` file.

```php
<?php
$dynamic_app[0] = getenv('DYNAMIC_APP_0');
$dynamic_app[1] = getenv('DYNAMIC_APP_1');
$static_app[0] = getenv('STATIC_APP_0');
$static_app[1] = getenv('STATIC_APP_1');
$static_app[2] = getenv('STATIC_APP_2');
?>
<VirtualHost *:80>
		ServerName demo.res.ch
		
		<Location "/balancer-manager">
				SetHandler balancer-manager
		</Location>
		
		ProxyPass /balancer-manager !
		
		<Proxy balancer://dynamic>
				BalancerMember http://<?php echo $dynamic_app[0] ?> 
				BalancerMember http://<?php echo $dynamic_app[1] ?> 
				ProxySet lbmethod=byrequests
		</Proxy>
		
		<Proxy balancer://staticapp>
				BalancerMember http://<?php echo $static_app[0] ?> route=member0
				BalancerMember http://<?php echo $static_app[1] ?> route=member1
				BalancerMember http://<?php echo $static_app[2] ?> route=member2
				ProxySet lbmethod=byrequests
				ProxySet stickysession=Application_STICKY
		</Proxy>
		Header add Set-Cookie "Application_STICKY=sticky.%{BALANCER_WORKER_ROUTE}e;path=/;" env=BALANCER_ROUTE_CHANGED
		
		
		ProxyPass "/api/students/" "balancer://dynamic/"
		ProxyPassReverse "/api/students/" "balancer://dynamic/"
		
		ProxyPass "/" "balancer://staticapp/"
		ProxyPassReverse "/" "balancer://staticapp/"
		
</VirtualHost>
```
This configuration works by setting a cookie containing the information about what server loaded the page `route=memberX`, and using the same server every time the URL is accessed.
`ProxySet stickysession=Application_STICKY` is to say we are using a sticky session wtun the parameters defined in `Application_STICKY`.
The `Application_STICKY` parameters are determined by the cookie made here : `Header add Set-Cookie "Application_STICKY=sticky.%{BALANCER_WORKER_ROUTE}e;path=/;" env=BALANCER_ROUTE_CHANGED`


#### testing out

As we want to keep every step, we are going to build the new Docker container : `docker build -t res/apache_lb_stky .`

The cleaning-up an starting the `res/ajax_playground` and `res/express_playground` is the same as in the previous step.

We can now launch the container and take a look at the results :
`docker run -e STATIC_APP_0=172.17.0.2:80 -e STATIC_APP_1=172.17.0.3:80 -e STATIC_APP_2=172.17.0.4:80 -e DYNAMIC_APP_0=172.17.0.5:3000 -e DYNAMIC_APP_1=172.17.0.6:3000 -p 8080:80 -it res/apache_lb_stky`

<figure class="image">
  <img src="pictures\stepB-sticky\website.png" alt="web result">
</figure>

<figure class="image">
  <img src="pictures\stepB-sticky\balance-manager.png" alt="balancer-manager">
</figure>


as we can see, the cookie in the website is set to `sticky.member0`, and, after refreshing the website a bunch of times, we can see in the balance-manager that only the `http://172.17.0.2` URL with the route `member0` has been incremented.


### Dynamic cluster management

#### setting-up the configuration

>All the files regarding this step can be found in the following directory : `docker-images/apache-reverse-proxy-dynamic-loadbalance-dynamic`

For this step, we are going to continue playing with the apache configuration *(as we have been playing with it up until now...)*.

We need to modify the Dockerimage file in order to add the `proxy_hcheck` module :
```
FROM php:7.4-apache

COPY apache2-foreground /usr/local/bin/

COPY templates /var/apache2/templates
COPY conf/ /etc/apache2

RUN a2enmod lbmethod_byrequests
RUN a2enmod proxy proxy_http
RUN a2enmod headers
RUN a2enmod proxy_hcheck
RUN a2ensite 000-*
```

Now we can update the configuration of the `config-template.php` file :

```php
<?php
$dynamic_app[0] = getenv('DYNAMIC_APP_0');
$dynamic_app[1] = getenv('DYNAMIC_APP_1');
$static_app[0] = getenv('STATIC_APP_0');
$static_app[1] = getenv('STATIC_APP_1');
$static_app[2] = getenv('STATIC_APP_2');
?>
<VirtualHost *:80>
		ServerName demo.res.ch
		
		<Location "/balancer-manager">
				SetHandler balancer-manager
		</Location>
		
		ProxyPass /balancer-manager !
		
		ProxyHCExpr ok234 {%{REQUEST_STATUS} =~ /^[234]/} 
		
		<Proxy balancer://dynamic>
				BalancerMember http://<?php echo $dynamic_app[0] ?> hcmethod=HEAD hcexpr=ok234 hcinterval=10
				BalancerMember http://<?php echo $dynamic_app[1] ?> hcmethod=HEAD hcexpr=ok234 hcinterval=10
				ProxySet lbmethod=byrequests
		</Proxy>
		
		<Proxy balancer://staticapp>
				BalancerMember http://<?php echo $static_app[0] ?> route=member0 hcmethod=HEAD hcexpr=ok234 hcinterval=10
				BalancerMember http://<?php echo $static_app[1] ?> route=member1 hcmethod=HEAD hcexpr=ok234 hcinterval=10
				BalancerMember http://<?php echo $static_app[2] ?> route=member2 hcmethod=HEAD hcexpr=ok234 hcinterval=10
				ProxySet lbmethod=byrequests 
				ProxySet stickysession=Application_STICKY
		</Proxy>
		Header add Set-Cookie "Application_STICKY=sticky.%{BALANCER_WORKER_ROUTE}e;path=/;" env=BALANCER_ROUTE_CHANGED
		
		
		ProxyPass "/api/students/" "balancer://dynamic/"
		ProxyPassReverse "/api/students/" "balancer://dynamic/"
		
		ProxyPass "/" "balancer://staticapp/"
		ProxyPassReverse "/" "balancer://staticapp/"
		
</VirtualHost>
```

We have added the line `ProxyHCExpr ok234 {%{REQUEST_STATUS} =~ /^[234]/}` as well as the `hcmethod=HEAD hcexpr=ok234 hcinterval=10` information after every server we want to check.
This checks the servers by sending a simple `HEAD` request every 10 seconds and making sure that the response status is 2xx, 3xx or 4xx. That way, we know that our servers are alive !

#### testing out

now we build the container and start it !
>The cleaning-up an starting the `res/ajax_playground` and `res/express_playground` is the same as in the previous step.

```
docker build -t res/apache_lb_dyn .

docker run -e STATIC_APP_0=172.17.0.2:80 -e STATIC_APP_1=172.17.0.3:80 -e STATIC_APP_2=172.17.0.4:80 -e DYNAMIC_APP_0=172.17.0.5:3000 -e DYNAMIC_APP_1=172.17.0.6:3000 -p 8080:80 -it res/apache_lb_dyn
```

Now lets see if everything is going OK...

all containers are correctly running :
<figure class="image">
  <img src="pictures\stepB-dyn\docker-all-ok.png" alt="all containers OK">
</figure>

The web page is correctly showing up :
<figure class="image">
  <img src="pictures\stepB-dyn\jobby-01.png" alt="web OK">
</figure>
And everything seems OK in the balancer-manager :
The web page is correctly showing up :

<figure class="image">
  <img src="pictures\stepB-dyn\balancer-manager-all-ok.png" alt="balancer-manager-all-ok">
</figure>

>note that now we have enabled the `proxy_hcheck` module, we have more options and information in the balancer-manager

So now lets kill the `apache_ajax_2` as it is the one currently used for the website (this will be interesting).
>we can see that with the `cookie` and the `Elected` column of the balancer-manager

<figure class="image">
  <img src="pictures\stepB-dyn\docker-killed-ajax2.png" alt="server killed">
</figure>

After reloardin the webpage, it is still up and running !
>the cookie has chaned : the server used is now the `apache_ajax_0` one.
<figure class="image">
  <img src="pictures\stepB-dyn\jobby-02-still-up.png" alt="web OK">
</figure>

we can see in the balancer-manager that the server is down :
>the status of `member2` is `Init HcFl`
<figure class="image">
  <img src="pictures\stepB-dyn\balancer-manager-faulty.png" alt="Error shown">
</figure>

So lets start the server up again ad see if it is picked-up by the balancer manager :
<figure class="image">
  <img src="pictures\stepB-dyn\docker-all-ok-again.png" alt="All continers running again">
</figure>

And lets have a look at the balancer-manager :
<figure class="image">
  <img src="pictures\stepB-dyn\balancer-manager-all-ok-again.png" alt="balancer-manager all OK">
</figure>

Everything is working again without any problems !
>this has worked because the `apache_ajax_2` took the same `IP` address as it had before shutting down.


### Management UI

After a bit of research on Internet, [portainer](https://www.portainer.io/) seemed to be a nice choice.

We follow the Quick Start guide available here : [Quick Start](https://www.portainer.io/documentation/quick-start/) with the followin commands :
```
$ docker volume create portainer_data
$ docker run -d -p 9000:9000 -p 8000:8000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```
>note : the command can be slightly different depending on your environment

We can now open ou webbrowser on the docker manchine address with the port 9000.


Here you have the login page.

<figure class="image">
  <img src="pictures\stepB-UI\second-login.png" alt="login">
</figure>
>normally, on first login, you are asked to create an account. I forgot to take a screen-shot of that...
 But it is good to know that you configutration is saved, even if shut down the container.

Once you login, you are greeted with a nice home page.
<figure class="image">
  <img src="pictures\stepB-UI\portainer-home.png" alt="Home page">
</figure>

The part that interests-us are the `Local` options.
This is the infomation on that page.
The information is quite intersting and complete.
<figure class="image">
  <img src="pictures\stepB-UI\portainer-local.png" alt="loal stuff">
</figure>

Just to go a bit further, lets take a look at the running containers.
And as expected, we can see all the containers running, including the `portainer`one
<figure class="image">
  <img src="pictures\stepB-UI\portainer-running-stuff.png" alt="running stuff">
</figure>

Portainer seems like a nice complete tool for managing Docker.