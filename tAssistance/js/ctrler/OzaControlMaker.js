tAssistance.NumberFilterMaker = function(params) {
	var contraint = params.contraint;

	// create an DOM instance for StringPFilter
	var control = new tAssistance.dom.NumberFilterControl(contraint);

	// bind the events to the pfilter
	var min_dom = control.querySelector("input.min");
	var max_dom = control.querySelector("input.max");

	min_dom.onchange = function() {
		contraint.min = this.value;
		contraint.name = "number";
		console.log(tAssistance.Page.UserConfig);
	};

	max_dom.onchange = function() {
		contraint.max = this.value;
		contraint.name = "number";
		console.log(tAssistance.Page.UserConfig);
	};

	return control;
};

tAssistance.StringFilterMaker = function(params) {
	var contraint = params.contraint;

	// create an DOM instance for StringPFilter
	var control = new tAssistance.dom.StringFilterControl(contraint);

	// bind the events to the pfilter
	var input = control.querySelector("input");
	input.onchange = function() {
		contraint.regex = this.value;
		contraint.name = "string";
		console.log(tAssistance.Page.UserConfig);
	};

	return control;
};

tAssistance.ValuesEditorMaker = function(pfilter) {

	var values = pfilter.params.values;

	var params = {
		values : values,
		onchange : function(control, i, new_value) {
			pfilter.params.values[i] = new_value;
			console.log(pfilter);
		}
	};
	// create an DOM instance
	var control = new tAssistance.dom.ValueList(params);

	return control;
};

tAssistance.ContraintEditorMaker = function(params) {
	var templates = params.templates;
	var contraint = params.contraint;
	var popup = params.popup;

	var editor = new tAssistance.dom.ContraintEditor();

	var onclick = function(value) {

		var old_control = editor.querySelector(".contraint-params-control");

		var params = {
				"template": value,
				"contraint": contraint
			}
		
		var control = tAssistance.ContraintParamsMaker(params);
				
		old_control.parentNode.replaceChild(control, old_control);

	};

	var selector = tAssistance.dom.ContraintSelectControl(templates, onclick);

	editor.appendChild(selector);
	
	var params = {
		"template": "string",
		"contraint": contraint
	}

	var contraint_params = tAssistance.ContraintParamsMaker(params);

	editor.appendChild(contraint_params);

	// buttons
	var params = {
		"contraint": contraint,
		"popup": popup
	}
	
	var btn = tAssistance.ContraintBtnGroupMaker(params);
	editor.appendChild(btn);
	
	return editor;
};

tAssistance.ContraintParamsMaker = function(params) {
	
	var control_fn = tAssistance.ContraintParamsSelector(params);
		
	var control = control_fn(params);

	return control;
};

tAssistance.ContraintBtnGroupMaker = function(params){
	
	var contraint = params.contraint;
	var popup = params.popup;
	
	var control =  document.createElement("div");
	control.setAttribute('class', 'in_group');
	control.setAttribute('style', 'padding: 5px');
	
	var btn_save = new tAssistance.dom.TextButton("Save","btn_save");
	btn_save.onclick = function(){
		
		var store = new tAssistance.Store();
		var user = tAssistance.Page.UserConfig;
		
		store.updateUserConfig(user);
		popup.close();
	};
			
	control.appendChild(btn_save);
	
	var btn_cancel = new tAssistance.dom.TextButton("Close","btn_cancel");
	btn_cancel.onclick = function(){
		
		popup.close();
		
	};
			
	control.appendChild(btn_cancel);
		
	return control;
};

tAssistance.TraceListBtnMaker = function(params){
	var shared = params.shared;
	var traces = params.traces;
	var mode = params.mode;	 
	
	var btns = new tAssistance.dom.TraceListMode();
	
	var doc_btn = btns.querySelector("button[name='doc']");
	var user_btn = btns.querySelector("button[name='user']");
	
	if(mode=="user"){
		$(user_btn).attr("autofocus","autofocus");
	}
	else if(mode=="doc"){
		$(doc_btn).attr("autofocus","autofocus");
	}
	
	var click_doc = function(params){
		var traces = params.traces;
		var container = params.shared.container;
		
		var params = {
				"id": "abc",
				"traces": traces
		};
		//$(this).addClass("active").siblings().removeClass("active");
		
		var list = new tAssistance.OzaTraceListByDocMaker(params);
		
		container.parentNode.replaceChild(list, container);
		shared.container = list;
	};
	
	var click_user = function(params){
		var traces = params.traces;
		var container = params.shared.container;
		
		var params = {
				"id": "abc",
				"traces": traces
		};	
		//$(this).addClass("active").siblings().removeClass("active");
		
		var list = new tAssistance.OzaTraceListByUserMaker(params);
		
		container.parentNode.replaceChild(list, container);
		shared.container = list;
	};
	
	var params = {
		shared: shared,
		traces: traces
	};
	
	doc_btn.onclick = function(){ 
		
		return function(e){
			click_doc(params);
		};
	}();
		
	user_btn.onclick = function(){ 
		
		return function(e){
			click_user(params);
		};
	}();
	
	
	
	
	return btns;
};

tAssistance.IconEditorBtnGroupMaker = function(params){
	
	var user = params.user;
	var popup = params.popup;
	
	var control =  document.createElement("div");
	control.setAttribute('class', 'in_group');
	control.setAttribute('style', 'padding: 5px');
	
	var btn_save = new tAssistance.dom.TextButton("Save","btn_save");
	btn_save.onclick = function(){
		
//		var store = new tAssistance.Store();
//		var user = tAssistance.Page.UserConfig;
//		
//		store.updateUserConfig(user);
//		popup.close();
	};
			
	control.appendChild(btn_save);
	
	var btn_cancel = new tAssistance.dom.TextButton("Close","btn_cancel");
	btn_cancel.onclick = function(){
		
		popup.close();
		
	};
			
	control.appendChild(btn_cancel);
		
	return control;
};
