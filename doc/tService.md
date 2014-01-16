tService 
----
##### Create a base with tService #####
Tconnect can be downloaded from this site.





~~~bash
$ unzip tconnect.zip -d $tconnect_dir
$ cd $tconnect_dir/scripts
~~~
or use GIT for download:
~~~bash
$ git clone https://github.com/ahle/tconnect
$ cd $tconnect_dir/scripts
~~~

##### Install a standalone assistance site #####

Use the ``tconnect-setup`` tool to build an assistance site.
~~~bash
$ ./tconnect-setup assist -s $site_name -H $host_name -p $port
~~~
For example, to enable a site which can be accessed by: http://assist.com/, the `$host_name` is "assist.com", the `port` is "80" 
and the `$site_name` is "assist.com". The site name is only used to distinct its site with others in the same server.
~~~bash
$ sudo ./tconnect-setup assist -s assist.com -H assist.com
~~~

##### Install a plug-in for trace on application site #####
Use ``tconnect-setup`` to put a plug-in for trace on an existing application site.
~~~bash
$ ./tconnect-setup app $site_dir
~~~
In which, `$site_dir` is the directory of the application site. For example:
~~~bash
$ sudo ./tconnect-setup app -d /var/www/app1.com
~~~

##### Install kTBS #####
Use ``tconnect-setup`` to install kTBS requirements.
~~~bash
$ ./tconnect-setup ktbs install
~~~

##### Run kTBS as a standalone web application #####
Use ``tconnect-setup`` to launch an instance of kTBS.

~~~bash
$ ./tconnect-setup ktbs start -H $host_name -p $port
~~~
