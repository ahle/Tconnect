// require: jQuery

tApp = {};

//tApp.AssistanceUri = "http://localhost/tracestore/tAssistance/srv/service.php";
//tApp.location = "http://localhost/tracestore/tApp/";
tApp.AssistanceUri = "http://tassistance.com/srv/service.php";
tApp.location = "http://tapp1.com/tApp/";
tApp.app_id = "azerty";

tApp.openAssistWindow = function() {
// get ticket
	
	$.post(tApp.location+"service.php", {"getTicket": "1"}, function(data){
		var message = data;
		
		var form = document.getElementById("frm_tAssistant");
		if(!form){
			form = document.createElement("form");
			form.setAttribute("id","frm_tAssistant");
		}
		
		var new_window_id = "tAssistant" + (new Date()).getTime();
		
	    form.setAttribute("method", "post");
	    form.setAttribute("target", new_window_id);
	    form.setAttribute("style", "display: none");
	    form.setAttribute("action", tApp.AssistanceUri); // Assistant server url  
		
	    form.innerHTML= '';
	    
	    var hiddenField = document.createElement("input");
	    hiddenField.setAttribute("name", "action");
	    hiddenField.setAttribute("value", "open_assist_w");
	    form.appendChild(hiddenField);
	    
	    hiddenField = document.createElement("input");
	    hiddenField.setAttribute("name", "app_id");
	    hiddenField.setAttribute("value", tApp.app_id);
	    form.appendChild(hiddenField);
	    
	    hiddenField = document.createElement("input");
	    hiddenField.setAttribute("name", "ticket");
	    hiddenField.setAttribute("value", message);
	    form.appendChild(hiddenField);
	    
	    document.body.appendChild(form);    // Not entirely sure if this is necessary
	    
	    
	    
	    window.open("about:blank", new_window_id);
	    
	    form.submit();
		
	});
}