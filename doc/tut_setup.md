Install TConnect
----

First, download the tconnect.zip file, unzip it into the root of webserver then go to its "scripts" folder

~~~bash
$ unzip tconnect.zip -d /var/www
$ cd /var/www/tconnect/scripts
~~~
##### Installation for the webserver which contains only the assistance application #####
Using ``tconnect-setup`` to enable the assistance site.
~~~bash
$ tconnect-setup -assist assist.com
~~~

##### Installation for user assistance application #####

Using ``tconnect-setup`` to enable the application site.
~~~bash
$ tconnect-setup -assist assist.com
~~~
