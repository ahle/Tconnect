tAssistance.ObselIconListMaker = function(params){
	
	var icons = params.icons;
	var popup = params.popup;
	var ref_element = params.ref_element;
	
	var list = document.createElement("div");
	
	for(i=0; i<icons.length;i++){
		var icon = icons[i];
		// add the computed information to the doc
				
//		var store = new tStore.OzaTStoreClient();
//		m_doc.doc_uri = store.getDocUri(m_doc.id);
//		
//		var assistant = new tAssistance.OzaAssistantClient();
//		m_doc.as_doc_uri = assistant.getDocUri(m_doc.doc_uri);
		
		var params = {
			"icon": icon
			
		};
		
		var row = new tAssistance.dom.ObselIconRow(params);
		
		row.onclick = function(icon){
			
			return function(e){
				// update icon 
				ref_element.setAttribute("src",icon.img);
				
				popup.close();
			};
		}(icon);	
		
		list.appendChild(row);
	}
	
	return list;
};

tAssistance.ObselIconSelectorMaker = function(params){
	var user = params.user;
	var obsel = params.obsel;
	var popup = params.popup;
	var ref_element = params.ref_element;

	var params = {
		"icons": user.configs[0].icons,
		"popup": popup,
		"ref_element": ref_element
	};
	
	var selector = tAssistance.ObselIconListMaker(params);
		
	var params = {
		"popup": popup,
		"user": user,
		"element": ref_element
	}	
	
	var btn = tAssistance.IconBtnGroupMaker(params);
	selector.appendChild(btn);
	
	return selector;
};

tAssistance.IconEditorMaker = function(params) {
	var user = params.user;
	var obsel = params.obsel;
	var popup = params.popup;

	var editor = new tAssistance.dom.IconEditor();
	
	
	
	
	var params = {
		"popup": popup,
		"user": user
	}	
	
	var btn = tAssistance.IconEditorBtnGroupMaker(params);
	editor.appendChild(btn);
	
	return editor;
};

tAssistance.IconBtnGroupMaker = function(params){
	
	var icons = params.icons;
	var popup = params.popup;
	var user = params.user;
	
	var control =  document.createElement("div");
	control.setAttribute('class', 'in_group');
	control.setAttribute('style', 'padding: 5px');
	
	var btn_new = new tAssistance.dom.TextButton("Create an icon","btn_new");
	btn_new.onclick = function(e){
		popup.close();
		
		var params = {
				//"element": params.element,
				"event": e,
				//"obsel": obsel,
				"user": user
			};
			
		//var popup = new tAssistance.IconPopupMaker(params);
		//var popup = new tAssistance.IconSelectorPopupMaker(params);
		
		var new_popup = tAssistance.IconEditorPopupMaker(params);
	};
			
	control.appendChild(btn_new);
	
	var btn_cancel = new tAssistance.dom.TextButton("Cancel","btn_cancel");
	btn_cancel.onclick = function(){
		
		popup.close();
		
	};
			
	control.appendChild(btn_cancel);
		
	return control;
};

tAssistance.IconEditorBtnGroupMaker = function(params){
	
	var icons = params.icons;
	var popup = params.popup;
	var user = params.user;
	
	var control =  document.createElement("div");
	control.setAttribute('class', 'in_group');
	control.setAttribute('style', 'padding: 5px');
	
	var btn_new = new tAssistance.dom.TextButton("Create an icon","btn_new");
	btn_new.onclick = function(e){
		popup.close();
		
		var params = {
				//"element": params.element,
				"event": e,
				//"obsel": obsel,
				"user": user
			};
			
		//var popup = new tAssistance.IconPopupMaker(params);
		//var popup = new tAssistance.IconSelectorPopupMaker(params);
		
		//var new_popup = tAssistance.IconEditorPopupMaker(params);
	};
			
	control.appendChild(btn_new);
	
	var btn_cancel = new tAssistance.dom.TextButton("Cancel","btn_cancel");
	btn_cancel.onclick = function(){
		
		popup.close();
		
	};
			
	control.appendChild(btn_cancel);
		
	return control;
};