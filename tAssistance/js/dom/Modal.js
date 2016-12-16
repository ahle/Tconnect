tAssistance.dom.Modal = function(params){
	
	var title = params.title;
	var container = params.container;
	
	var div_myModal = document.createElement('div');
	   div_myModal.tabIndex = "-1";
	   div_myModal.id = "myModal";
	   div_myModal.className = "modal fade";
	   div_myModal.role = "dialog";

	   var div_0 = document.createElement('div');
	      div_0.className = "modal-dialog";

	      var div_1 = document.createElement('div');
	         div_1.className = "modal-content";

	         var div_2 = document.createElement('div');
	            div_2.className = "modal-header";

	            var button_1 = document.createElement('button');
	               button_1.className = "close";
	               button_1.setAttribute("data-dismiss","modal");
	               button_1.setAttribute("aria-label","Close");
	               button_1.type = "button";

	               var span_0 = document.createElement('span');
	               		span_0.setAttribute("aria-hidden","true");
	                  span_0.appendChild( document.createTextNode("x") );
	               button_1.appendChild( span_0 );

	            div_2.appendChild( button_1 );


	            var h4_myModalLabel = document.createElement('h4');
	               h4_myModalLabel.id = "myModalLabel";
	               h4_myModalLabel.className = "modal-title";
	               h4_myModalLabel.appendChild( document.createTextNode(title) );
	            div_2.appendChild( h4_myModalLabel );

	         div_1.appendChild( div_2 );


	         var div_3 = document.createElement('div');
	            div_3.className = "modal-body";
	            //div_3.appendChild( document.createTextNode("\n        ...\n      ") );
	         div_1.appendChild( div_3 );


	         var div_4 = document.createElement('div');
	            div_4.className = "modal-footer";

	            var button_2 = document.createElement('button');
	               button_2.className = "btn btn-default";
	               button_2.type = "button";
	               button_2.setAttribute("data-dismiss","modal");
	               button_2.appendChild( document.createTextNode("Close") );
	            div_4.appendChild( button_2 );


//	            var button_3 = document.createElement('button');
//	               button_3.className = "btn btn-primary";
//	               button_3.type = "button";
//	               button_3.appendChild( document.createTextNode("Save changes") );
//	            div_4.appendChild( button_3 );

	         div_1.appendChild( div_4 );

	      div_0.appendChild( div_1 );

	   div_myModal.appendChild( div_0 );
	   
	return div_myModal;
};