// by default
tAssistance.PopupMaker = function(params){
	
	var element = params.element;
	var event = params.event;
	var title = params.title;
	
	if(tAssistance.hasPopup) return false;
	var popup = new tAssistance.Popup();
	
	var popup_el = new tAssistance.dom.PopupLayout(title);
	//alert(event.pageX + "," + event.pageY);
	$(popup_el).css("position", "absolute");
	$(popup_el).css("left", event.pageX);
	$(popup_el).css("top", event.pageY);
	
	document.body.appendChild(popup_el);
	tAssistance.hasPopup = true;
	
	popup.el = popup_el;
	
	return popup;
};

// popup for contraint editor
tAssistance.ContraintPopupMaker = function(params){
	var element = params.element;
	var event = params.event;
	var title = "New Contraint";
	var contraint = params.contraint;
	
	var params = {
		"element": element,
		"event": event,
		"title": title
	};
	
	var popup = new tAssistance.PopupMaker(params);
	
	if(!popup) return false;
	
	var body = popup.el.querySelector(".popup_body");
		
	var params = {
		"templates": [
		         	     "number", "string"
		 	         	],
		"contraint": contraint,
		"popup": popup
	};
	
	editor = tAssistance.ContraintEditorMaker(params);
	
	body.appendChild(editor);
	
	return popup;
};

tAssistance.IconEditorPopupMaker = function(params){
	var element = params.element;
	var event = params.event;
	var obsel = params.obsel;
	var user = params.user;
	
	
	var title = "New Icon";
	
	var params = {
			"element": element,
			"event": event,
			"title": title
		};
	
	var popup = new tAssistance.PopupMaker(params);
	
	if(!popup) return false;
	
	var body = popup.el.querySelector(".popup_body");
		
	var params = {
		"user": user,
		"obsel": obsel,
		"popup": popup
	};
	
	editor = tAssistance.IconEditorMaker(params);
	
	body.appendChild(editor);
	
	return popup;	
};

tAssistance.IconSelectorPopupMaker = function(params){
	var element = params.element;
	var event = params.event;
	var icon = params.icon;
	var user = params.user;
	
	
	var title = "Icon List";
	
	var params = {
			"element": element,
			"event": event,
			"title": title
		};
	
	var popup = new tAssistance.PopupMaker(params);
	
	if(!popup) return false;
	
	var body = popup.el.querySelector(".popup_body");
		
	var params = {
		"user": user,
		//"obsel": obsel,
		"popup": popup,
		"ref_element": element
	};
	
	var selector = tAssistance.ObselIconSelectorMaker(params);
	
	body.appendChild(selector);
	
	return popup;	
};
