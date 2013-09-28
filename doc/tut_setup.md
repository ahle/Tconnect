Install TConnect
----

##### Installing the user assistance website #####
Download the tconnect.zip file from [source](https://github.com/ahle/tconnect).
Unzip the downloaded file into the root of webserver then go to its "scripts" folder.
~~~bash
$ unzip tconnect.zip -d /var/www
$ cd /var/www/tconnect/scripts
~~~
Use the ``tconnect-setup`` tool to enable the user assistance website.
~~~bash
$ tconnect-setup -assist assist.com
~~~

##### Installing the plug-in tApp on the application server #####
Download the tconnect.zip file from [source](https://github.com/ahle/tconnect).
Unzip the downloaded file into the root of webserver then go to its "scripts" folder.
~~~bash
$ unzip tconnect.zip -d /var/www
$ cd /var/www/tconnect/scripts
~~~
Using ``tconnect-setup`` to enable the application site.
~~~bash
$ tconnect-setup -app app1.com
~~~
##### Running the kTBS #####
If kTBS won't be installed on the same server with the application or the user assistance website.
In the other word, it will be installed on the different server.
* Download the tconnect.zip file from [source](https://github.com/ahle/tconnect). Unzip the downloaded file into the root of webserver.

     `````
     $ unzip tconnect.zip -d /var/www
    ````

If kTBS will be installed on the same server with the application or the user assistance website, 
the TConnect folder is avaiable. 

Go to its "scripts" folder.
~~~bash
$ cd /var/www/tconnect/scripts
~~~
Using ``tconnect-setup`` to run the kTBS.
~~~bash
$ tconnect-setup -ktbs localhost
~~~
