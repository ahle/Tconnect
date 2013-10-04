// require: jQuery
// TODO: replace tApp.AssistanceUri and tApp.app_id with parameter in the server

/** @namespace */
tApp = {};

//tApp.AssistanceUri = "http://assist.com/service.php";
//tApp.location = "http://app1.com/tApp/service.php";
tApp.AssistanceUri = "$assistance_url";
tApp.location = "http://app1.com/";
tApp.app_id = "$app_id";

// TODO: remove AssistanceUri and app_id, put them on the response getTicket

/** 
 * @function
 * @memberof tApp
 * @name active_btn_assistance
 * @desc active the correct link for enter the user assistance system */	
tApp.active_btn_assistance = function() {
// get ticket
	
	$(".assistance.btn").mouseover(function() {
		bt_assistance = this; 
		$.get("tApp/ticket/new", function(data){
			var msg = data;
			bt_assistance.href = tApp.AssistanceUri+"session/"+tApp.app_id+"?ticket="+encodeURIComponent(msg)+"&returnUrl="+encodeURIComponent(tApp.AssistanceUri+"index.php?page=TraceView");
			bt_assistance.target = "_blank";
		});
	});
	
}

tApp.changeUser = function(user){
	$.post("tApp/api.php", {"user": user}, function(data){
		console.log(data);
	});	
}
