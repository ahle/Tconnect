tService 
----

##### Create a base for a user with tService #####

~~~php
var root_uri = "https://dsi-liris-silex.univ-lyon1.fr/ozalid/ktbs/";

var mgr = new tService.TraceManager({
		"root_uri": root_uri,
		async: true
	});

var options = {
	name: "user1",
};

var base = mgr.init_base(options);
base.send({
	"callback": function(ret, options){
		if(ret=="success"){
			console.log("done");
		}
	}
});

~~~


