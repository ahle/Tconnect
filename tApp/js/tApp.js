// require: jQuery
// TODO: replace tApp.AssistanceUri and tApp.app_id with parameter in the server

/** @namespace */
tApp = {};

//tApp.AssistanceUri = "http://assist.com/service.php";
//tApp.location = "http://app1.com/tApp/service.php";
//tApp.AssistanceUri = "$assistance_url";
tApp.location = "http://app1.com/";
tApp.app_id = "$app_id";
tApp.user_id = 'u1';
tApp.trace_base = "http://213.223.171.36/ktbs/ozalid/";
tApp.trace_id = "t4";
tApp.visualisation_uri = "http://213.223.171.36/assist/index.php?page=TraceView";
tApp.assistance_base = 'http://213.223.171.36/assist/';
tApp.assistance_server =  'http://213.223.171.36';
tApp.assistance_win = null;

// TODO: remove AssistanceUri and app_id, put them on the response getTicket

tApp.changeUser = function(user){
	$.post("tApp/api.php", {"user": user}, function(data){
		console.log(data);
	});	
}

tApp.ui = {
	renderTraceBtn: function(){
		var button = document.createElement("button" );
	    button.type = "button" ;
		button.value = "Trace";
	    button.setAttribute("class","btn");
		button.addEventListener("click", function(){
			tApp.assistance_win = window.open (tApp.visualisation_uri,"assistance");
			var i = setTimeout(function(){
				tApp.assistance_win.postMessage({"type":"trace","trace_id":trace_id,"base_uri":base_uri,"user_id":user_id}, tApp.assistance_server);
			},500);
			
		});
	    button.setAttribute('style','position:fixed; top:5px; right:5px;z-index: 9999;');		
		
		button.innerHTML = "<img src='"+tApp.assistance_base+"img/icon-trace.png' height='14px' width='14px'/> Trace";		
		
	    document.body.appendChild(button);		
	},
	collectObsel: function(obsel){
		mgr = new tService.TraceManager({
			base_uri: tApp.trace_base,
			async: true
		});
		trc = mgr.init_trace({
			name: tApp.trace_id	
		});
		trc.put_obsels({
			obsel: obsel,
			success: function(){
				if(tApp.assistance_win){
					console.log("postMessage to the assistance");
					tApp.assistance_win.postMessage({"type":"obsel","trace_id":trace_id,"base_uri":base_uri,"user_id":user_id}, tApp.assistance_server);
				}
			},
			error: function(jqXHR,textStatus, errorThrown){
				console.log("error is callbacked.");
			}
		});
	}		
}
// example
/*
tApp.ui.renderTraceBtn();
document.addEventListener("click", function(){
	
	var begin = end = (new Date()).getTime();
	var obsel = {
		type: "click",
		begin: begin,
		end: end,
		subject: "u1",
		application: "ozalid"
	};
	tApp.ui.collectObsel(obsel);	
});*/


