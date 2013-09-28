Install TConnect
----

First, download the tconnect.zip file, unzip it into the root of webserver then go to its "scripts" folder

~~~bash
$ unzip tconnect.zip -d /var/www
$ cd /var/www/tconnect/scripts
~~~
##### Setup end-user application #####

Using ``tconnect-setup`` to enable the application site.
~~~bash
$ tconnect-setup -app app1.com
~~~

##### Setup user assistance application #####

Using ``tconnect-setup`` to enable the application site.
~~~bash
$ tconnect-setup -assist assist.com
~~~
