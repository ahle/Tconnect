// by default
tAssistance.PopupMaker = function(element, event, title){
	var popup = new tAssistance.Popup();
	
	var popup_el = new tAssistance.dom.PopupLayout(title);
	//alert(event.pageX + "," + event.pageY);
	$(popup_el).css("position", "absolute");
	$(popup_el).css("left", event.pageX);
	$(popup_el).css("top", event.pageY);
	
	document.body.appendChild(popup_el);
	
	popup.el = popup_el;
	
	return popup;
};

// popup for contraint editor
tAssistance.ContraintPopupMaker = function(element, event, contraint){
	
	var title = "New Contraint";
	
	var popup = new tAssistance.PopupMaker(element, event, title);
	
	var body = popup.el.querySelector(".popup_body");
		
	var params = {
		"templates": [
		         	     "number", "string", "values"
		 	         	],
		"contraint": contraint,
		"popup": popup
	};
	
	editor = tAssistance.ContraintEditorMaker(params);
	
	body.appendChild(editor);
	
	return popup;
};