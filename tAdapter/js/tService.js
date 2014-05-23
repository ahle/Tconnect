/*
	require jQuery
*/

/** @namespace */
tService = {};
/** 
 * @namespace tService
 * @name TraceManager
 * @constructor 
 * @param options.root_uri 	The root URI of the trace base management system
 * @param options.async 	The synchonized mode. The request is called in asynchronous mode by default.
 * @desc a proxy interface to communicate with a trace base management system (TBMS). The KTBS by default */
tService.TraceManager = function(options){
	this.root_uri = options.root_uri;
	this.async = options.async ? options.async : true;
	
	/** 
	 * @function
	 * @memberof TraceManager#
	 * @name init_base
	 * @param t_options.name the name of the base
	 * @desc initialize a remote base */
	this.init_base = function(t_options){
		var opt = {};
		opt.root_uri = this.root_uri;
		opt.async = this.async;
		opt.name = t_options.name;
		var trace = new tService.Base(opt);
		return trace;
	}
	
	
}

/** 
 * @name Base
 * @constructor 
 * @param options.base_uri 	URI of the root 
 * @param options.name 		the name of the trace
 * @param options.async 	The synchonized mode
 * @desc a generic trace */
tService.Base = function(options){
	//this.trace_manager = options.trace_manager;
	this.root_uri = options.root_uri;
	this.name = options.name; 
	//this.success = options.success,
	//this.error = options.error,
	this.async = options.async ? options.async : true;
	this.base_uri = this.root_uri+this.name+"/";
		
	/** 
	 * @function
	 * @memberof Trace#
	 * @name send
	 * @param s_options.callback the callback function
	 * @desc send the base information to the TBMS */
	this.send = function(s_options){
		
		var root_uri = this.root_uri,
		name = this.name,
		callback = s_options.callback,
		async = this.async;

		function base2Turtle(name,root_uri){
			
			var id = ktbs_base_uri + name;
			
			var prefixes = [];
			prefixes.push("@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .");
			prefixes.push("@prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> .");
			
			var statements = [];
			statements.push("<> :hasBase <"+id+"/>.");
			statements.push("<"+id+"/> a :Base.");
			statements.push("<"+id+"/> rdfs:label \""+name+"\" .");
			
			// TODO
			
			return prefixes.join("\n")+"\n"+statements.join("\n");
		}

		var ctype = "text/turtle";

		var base_in_turtle = base2Turtle(name,root_uri);
		
		// post to ktbs
		jQuery.ajax({
			url: root_uri,
			type: 'POST',
			data: base_in_turtle,
			contentType: ctype,
			crossDomain: true,
			success: function(ret){
					console.log("The base ["+name+"] is created successfully!");
					callback("success",ret);
				},
			error: function(jqXHR, textStatus, errorThrown){
					
					console.log("E: The base ["+name+"] cannot be created.");
					callback("error", jqXHR, textStatus, errorThrown);
				},
			async: async
		});
	}
	
	/** 
	 * @function
	 * @memberof Base#
	 * @name init_trace
	 * @param t_options.name the name of the trace
	 * @desc initialize a remote trace */
	this.init_trace = function(t_options){
				
		var opt = {};
		opt.base_uri = this.base_uri;
		opt.async = this.async;
		opt.name = t_options.name;
		var trace = new tService.Trace(opt);
		return trace;
	}
}
/** 
 * @name Trace
 * @constructor 
 * @param options.base_uri 	URI of the base de traces
 * @param options.name 		the name of the trace
 * @param options.async 	The synchonized mode
 * @desc a generic trace */
tService.Trace = function(options){
	this.base_uri = options.base_uri;
	this.name = options.name; 
	this.async = options.async ? options.async : true;
	this.model_name = "model1";// hardcode
	this.model_uri = this.base_uri+this.model_name+"/";
	this.trace_uri = this.base_uri+this.name+"/";
	/** 
	 * @function
	 * @memberof Trace#
	 * @name send
	 * @param s_options.callback the callback function
	 * @desc save the trace into the base de traces */
	this.send = function(s_options){
		
		var base_uri = this.base_uri,
		name = this.name,
		callback = s_options.callback,
		async = this.async,
		model_name = this.model_name;

		function trace2Turtle(name,ktbs_base_uri){
			
			var id = ktbs_base_uri + name;
			
			var prefixes = [];
			prefixes.push("@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .");
			prefixes.push("@prefix : <http://liris.cnrs.fr/silex/2009/ktbs#> .");
			//prefixes.push("@prefix : <"+ktbsobsel["model_uri"]+"> .");
			
			var statements = [];
			statements.push("<> :contains <"+id+"/>.");
			statements.push("<"+id+"/> a :StoredTrace.");
			statements.push("<"+id+"/> :hasModel <"+model_name+"/> .");
			statements.push("<"+id+"/> :hasOrigin \"1970-01-01T00:00:00Z\"^^xsd:dateTime.");
			
			// TODO
			
			return prefixes.join("\n")+"\n"+statements.join("\n");
		}
					
		//var obsel = obsel;
		var ctype = "text/turtle";
		//var id = item["id"];
		//var sync = this;
		var trace_in_turtle = trace2Turtle(name,base_uri);
		
		// post to ktbs
		jQuery.ajax({
			url: base_uri,
			type: 'POST',
			data: trace_in_turtle,
			contentType: ctype,
			crossDomain: true,
			success: function(responseText){
					console.log("The trace ["+name+"] is created successfully!");
					var ret = {
						status: "success",
						text: responseText
					}
					callback("success", ret);
				},
			error: function(jqXHR, textStatus, errorThrown){
					
					console.log("E: The trace ["+name+"] cannot be created.");
					var ret = {
						status: "error",
						"jqXHR": jqXHT,
						"textStatus": textStatus,
						"errorThrown": errorThrown 
					}
					
					callback(ret);
				},
			async: async
		});
	}
	
	/** 
	 * @function
	 * @memberof Trace#
	 * @name put_obsels
	 * @param s_options.success the callback function if the save is successful
	 * @param s_options.error the callback function if the save is failed
	 * @param s_options.obsel an obsel
	 * @desc put obsels into the trace in the base de traces */	
	this.put_obsels = function(s_options){
		var trace_uri = this.trace_uri,
			model_uri = this.model_uri,
			obsel = s_options.obsel,
			callback = s_options.callback,
			async = this.async;
		
		function generateObselId(){
			var id = "o"+(new Date()).getTime() + Math.floor(Math.random()*1000);
			return id;
		}
		
		function obsel2Turtle(obsel, trace_uri, model_uri){
			
			var id = trace_uri + generateObselId();
			obsel["id_ktbs"] = id;
			
			var prefixes = [];
			prefixes.push("@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .");
			prefixes.push("@prefix ktbs: <http://liris.cnrs.fr/silex/2009/ktbs#> .");
			prefixes.push("@prefix : <"+model_uri+"> .");
				
			var statements = [];
			statements.push("<"+id+"> ktbs:hasTrace <>.");
			statements.push("<"+id+"> a :"+obsel["type"]+".");
			statements.push("<"+id+"> ktbs:hasSubject \""+obsel["subject"]+"\" .");
			statements.push("<"+id+"> ktbs:hasBegin "+obsel["begin"]+" .");	
			statements.push("<"+id+"> ktbs:hasEnd "+obsel["end"]+" .");
			
			jQuery.each(obsel, function(name,value){
				if(name!="type" && name!="begin" && name!= "end" && name!= "subject"){
					statements.push("<"+id+"> :"+name+" \""+value+"\" .");
				}
			});			
			
			// TODO
			
			return prefixes.join("\n")+"\n"+statements.join("\n");
		}
		
		//var obsel = obsel;
		var ctype = "text/turtle";
		//var id = item["id"];
		//var sync = this;
		var obsel_in_turtle = obsel2Turtle(obsel, trace_uri, model_uri);
		
		// post to ktbs
		jQuery.ajax({
			url: trace_uri,
			type: 'POST',
			data: obsel_in_turtle,
			contentType: ctype,
			crossDomain: true,
			success: function(responseText){
					console.log("The obsel ["+obsel["id_ktbs"]+"] is sent successfully!");
										
					var ret = {
							status: "success",
							text: responseText
						}
					callback(ret);
				},
			error: function(jqXHR, textStatus, errorThrown){
					console.log("E: The obsel ["+obsel["id_ktbs"]+"] cannot be sent.");
					var ret = {
							status: "error",
							"jqXHR": jqXHT,
							"textStatus": textStatus,
							"errorThrown": errorThrown 
						};
						
					callback(ret);
				},
			async: async
		});
	}
	
	/** 
	 * @function
	 * @memberof Trace#
	 * @name get_obsels
	 * @param s_options.callback 	the callback function
	 * @param s_options.nocache 	no use the cached result if nocache = true
	 * @desc put obsels into the trace in the base de traces */	
	this.get_obsels = function(s_options){
		var trace_uri = this.trace_uri,
		callback = s_options.success,
		nocache = s_options.nocache || false,
		async = this.async;
		
		var url = trace_uri+"@obsels.json";
		if(nocache){
			begin = Math.floor(Math.random()*1000);
			queryString = "minb="+begin;
			url+="?"+queryString;
		}
		// post to ktbs
		jQuery.getJSON(url,function(data){
			var obsels = data["obsels"];
			
			$.each(obsels, function(obsel){
				// TODO
			});
			callback(obsels);
		});
	}
}
