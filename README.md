TConnect
========

a platform for collecting, visualizing traces 

### Introduction ###

TConnect is a web based platform for connecting the trace based applications as end-user web application, user assistance system and trace base management system. 
For facilitating the developement, TConnect is organized into modules specialized for different types of systems.  

* tService: API for storing and accessing modelled traces in JavaScript. 
See also [tService API](https://rawgithub.com/ahle/tconnect/master/doc/tservice-api/index.html)
* tApp: API for non-trace requests needed to maintain the connection between the end-user application and the other systems.
[tApp REST API](https://rawgithub.com/ahle/tconnect/master/doc/rest-api/index_tapp.html)
* tAssistance: API for high-level requests on traces (transformation, visualisation, analyse, mining).
[tAssistance REST API](https://rawgithub.com/ahle/tconnect/master/doc/rest-api/index.html)

The figure below is an example of using TConnect in order to build a user assistance system. 
To build a such system, see the tutorial [Install TConnect](doc/tut_setup.md)

![Tconnect architecture](doc/img/tconnect_archi.png)

### Requirements ###
For kTBS : 
* See also the tutorial [Installing kTBS ](https://kernel-for-trace-based-systems.readthedocs.org/en/latest/tutorials/install.html)

For end-user application : 
* Apache 2.2.17 or later [Installing Apache 2](http://httpd.apache.org/download.cgi)
* PHP 5.3.5 [Download PHP 5.3](http://php.net/downloads.php)

For user assistance website :
* Apache 2.2.17 or later [Installing Apache 2](http://httpd.apache.org/download.cgi)
* PHP 5.3.5 [Download PHP 5.3](http://php.net/downloads.php)

### Download ###

[Development version 1.0 ](https://github.com/ahle/tconnect/edit/master.zip)

*single asterisks*
