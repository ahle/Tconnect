tService 
----

##### Create a base for a user with tService #####

~~~php
var root_uri = "https://dsi-liris-silex.univ-lyon1.fr/ozalid/ktbs/";
var user_id = "user1";

var mgr = new tService.TraceManager({
		"root_uri": root_uri,
		async: true
	});

var options = {
	"name": user_id,
};

var base = mgr.init_base(options);
base.send({
	"callback": function(ret){
		if(ret.status=="success"){
			console.log("done");
		}
	}
});

~~~

##### Create a trace for a document corrected by a user with tService #####

~~~php
var root_uri = "https://dsi-liris-silex.univ-lyon1.fr/ozalid/ktbs/";
var user_id = "user1";
var doc_id = "doc1";

var mgr = new tService.TraceManager({
		"root_uri": root_uri,
		async: true
	});

var options = {
    "name": user_id,
};

var base = mgr.init_base(options);

var options = {
    "name": doc_id,
};

var trace = base.init_trace(options);
trace.send({
	"callback": function(ret){
		if(ret.status=="success"){
			console.log("done");
		}
	}
});

~~~

##### Get the obsels of a trace with tService #####

~~~php

var root_uri = "https://dsi-liris-silex.univ-lyon1.fr/ozalid/ktbs/";
var user_id = "user1";
var doc_id = "doc1";

var mgr = new tService.TraceManager({
		"root_uri": root_uri,
		async: true
});

var options = {
    "name": user_id,
};

var base = mgr.init_base(options);

var options = {
    "name": doc_id,
};

var trace = base.init_trace(options);

trace.getObsels({"callback": function(ret){
	if(ret.status=="success"){
			var obsels = ret.obsels;
			// process with the obsels
		}
}});
	
~~~
