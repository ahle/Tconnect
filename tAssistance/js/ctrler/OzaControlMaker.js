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