tAssistance.OzaMaker = function(){
	
};

tAssistance.OzaTimelineConfigMaker = function(){
	
	var layout = new tAssistance.dom.PanelLayout();
	
	layout.querySelector("div.panel-title").innerHTML = "Timeline";
	//$(layout.querySelector("div.panel-body")).css("height","300px");
	//$(layout.querySelector("div.panel-body")).css("overflow","scroll");
		
	var ul = new tAssistance.dom.OzaTimelineSetting("aaa1");
	layout.querySelector("div.panel-body").appendChild(ul);
	
	return layout;
};

tAssistance.OzaVElementsEditorMaker = function(velements){
	
	var layout = new tAssistance.dom.NavTab1("Obsels to display");
	
	//layout.querySelector("div.panel-title").innerHTML = "Timeline: Obsels to display";
	//$(layout.querySelector("div.panel-body")).css("height","300px");
	//$(layout.querySelector("div.panel-body")).css("overflow","scroll");
		
	var table = new tAssistance.dom.OzaVElementsTable("aaa1");
	var tbody = table.querySelector("tbody");
	var panel_body = layout.querySelector("[placeholder='navtab-body']");
	panel_body.appendChild(table);
	
	for(var i in velements){
		var velement = velements[i];
		velement;
		
		var row = tAssistance.dom.VElementRow(velement);
		
		var chk_box = row.querySelector("input[type='checkbox']");
		
		chk_box.onclick = function(){
//			var chked = this.checked;
//			
//			prop_config.active = chked;
//			
//			var store = new tAssistance.Store();
//			store.updatePFilter("hoang","velement1", "pfilter1", "active", "1");
		};		
		
		tbody.appendChild(row);		
	}	
	
	return layout;
};

tAssistance.IconConfigMaker = function(icons){
	
	var layout = new tAssistance.dom.NavTab1("Icons to display");
		
	var table = new tAssistance.dom.OzaVElementsTable("aaa1");
	var tbody = table.querySelector("tbody");
	var panel_body = layout.querySelector("[placeholder='navtab-body']");
	panel_body.appendChild(table);
	
	for(var i in icons){
		var icon = icons[i];
		icon;
		
		var row = tAssistance.dom.IconRow(icon);
		
		var chk_box = row.querySelector("input[type='checkbox']");
		
		chk_box.onclick = function(){

		};		
		
		tbody.appendChild(row);		
	}	
	
	return layout;
};

tAssistance.ValuesEditorMaker = function(pfilter){
	
	var values = pfilter.params.values;
	
	var params = {
		values: values,
		onchange: function(control,i, new_value){
			pfilter.params.values[i] = new_value;
			console.log(pfilter);
		}
	};
	// create an DOM instance
	var control = new tAssistance.dom.ValueList(params);
	
	return control;
};

tAssistance.FilterEditorMaker = function(filter){
	
	var table = new tAssistance.FilterTableMaker(filter);
	
	var layout = new tAssistance.dom.PanelLayout("aa3");
	layout.querySelector("div.panel-title").innerHTML = "Filter Setting";
	//$(layout.querySelector("div.panel-body")).css("height","300px");
	//$(layout.querySelector("div.panel-body")).css("overflow","scroll");
	layout.querySelector("div.panel-body").appendChild(table);
	
	return layout;
};

tAssistance.FilterTableMaker = function(filter){
	var pfilters = filter.pfilters;
	
	var table = new tAssistance.dom.FilterTable();
	
	for(var i in pfilters){
		var pfilter = pfilters[i];
		var tbody = table.querySelector("tbody");
		
		var row = tAssistance.dom.PFilterRow(pfilter);
		
		var chk_box = row.querySelector("input[type='checkbox']");
		
		chk_box.onclick = function(){
			var chked = this.checked;
			
			pfilter.active = chked;
			
			var store = new tAssistance.Store();
			store.updatePFilter("hoang","velement1", "pfilter1", { "active": chked });
		};
				
		tbody.appendChild(row);
	}
	return table;
};

tAssistance.OzaPFilterRowMaker = function(pfilter){
	
	
	
};

tAssistance.NumberPFilterMaker = function(params){
	var pfilter = params.pfilter;
	
	// create an DOM instance for StringPFilter
	var control = new tAssistance.dom.NumberFilter(pfilter);
	
	// bind the events to the pfilter
	var min_dom = control.querySelector("input.min");
	var max_dom = control.querySelector("input.max");
	
	min_dom.onchange = function(){
		pfilter.params.min = this.value;
		console.log(pfilter);
	};
	
	max_dom.onchange = function(){
		pfilter.params.max = this.value;
		console.log(pfilter);
	};	
	
	return control;
};

tAssistance.StringPFilterMaker = function(params){
	var pfilter = params.pfilter;
	
	// create an DOM instance for StringPFilter
	var pfilter_dom = new tAssistance.dom.StringFilter(pfilter);
	
	// bind the events to the pfilter
	var input = pfilter_dom.querySelector("input");
	input.onchange = function(){
		pfilter.params.regex = this.value;
		console.log(pfilter);
	};	
	
	return pfilter_dom;
};

tAssistance.PFilterPanelBodyMaker = function(params){
	
	var pfilter = params.pfilter;
	var user_id = params.user_id;
	var velement_id = params.velement_id;
	var pfilter_id = params.pfilter_id;
		
	var pfilter_dom = new tAssistance.dom.PFilter();
	
	var buttons_params = params;
		
	var btns_control = new tAssistance.PFilterBtnControlMaker(buttons_params);
	
	pfilter_dom.appendChild(btns_control);
	
	var properties = ["id","string", "begin"];
	
	var property_control = new tAssistance.dom.PropertySelectControl(properties);
	
	pfilter_dom.appendChild(property_control);
	
	var templates = ["string","number","values"];
	
	var template_params = {
		"templates": templates,
		"afterClick": function(value){
			var params = {
				"template": value,
				"pfilter": pfilter
			};
			
			var control = new tAssistance.PFilterControlMaker(params);
			
			var control_dom_old = pfilter_dom.querySelector(".pfilter-control");
			control_dom_old.parentNode.replaceChild(control, control_dom_old);
		}
	};
	
	var template_control = new tAssistance.PFilterTemplateControlMaker(template_params);
	
	pfilter_dom.appendChild(template_control);
	
	var control_params = {
			"pfilter": pfilter,
			"template": "string"
		};
	
	var pfilter_control = new tAssistance.PFilterControlMaker(control_params);
	
	pfilter_dom.appendChild(pfilter_control);
		
	return pfilter_dom;	
};

tAssistance.PFilterBinder = function(params){
	var pfilter = params.pfilter;
	var el = params.element;
	
	
	
	
	
	
	
};

tAssistance.PFilterPanelMaker = function(params){
	
	var pfilter = params.pfilter;
	//var template = params.template;
		
	var body = new tAssistance.PFilterPanelBodyMaker(params);
	
	var layout = new tAssistance.dom.PanelLayout("aa3");
	layout.querySelector("div.panel-title").innerHTML = "Timeline: Attribute Contraints";
	layout.querySelector("div.panel-body").appendChild(body);
	
	return layout;
};

tAssistance.PFilterControlMaker = function(params){
	var control;
	var template = params.template;
	var pfilter = params.pfilter;
	
	//
	if(template=="string"){
		var params = {
			pfilter: pfilter
		};
		
		control = new tAssistance.StringPFilterMaker(params);
	}
	else if(template=="number"){
		var params = {
				"pfilter": pfilter
		};
		
		control = new tAssistance.NumberPFilterMaker(params);
	}
	else if(template=="values"){
		control = new tAssistance.ValuesEditorMaker(pfilter);
	}
	
	return control;
};

tAssistance.PFilterTemplateControlMaker = function(params){
	
	var templates = params.templates;
	var afterClick = params.afterClick;
	
	var control = new tAssistance.dom.PFilterTemplateControl(templates);
	var btn = control.querySelector("div[type='button']");
	
	var menu = control.querySelector("ul");
	
	for(var i in templates){
		var templ = templates[i];
		
		var templ_dom = new tAssistance.dom.TemplRow(templ);
				
		templ_dom.onclick = function (e){
			btn.innerHTML = e.target.textContent;
			if(afterClick){
				afterClick(e.target.textContent);
			}
		};
		
		menu.appendChild(templ_dom);
	}
	
	return control;
};

tAssistance.PFilterBtnControlMaker = function(params){
	
	var pfilter = params.pfilter;
	var user_id = params.user_id;
	var velement_id = params.velement_id;
	var pfilter_id = params.pfilter_id;	
	
	var control =  document.createElement("div");
	control.setAttribute('class', 'in_group');
	control.setAttribute('style', 'padding: 5px');
	
	var btn_save = new tAssistance.dom.TextButton("Save","btn_save");
	btn_save.onclick = function(){
		
		var store = new tAssistance.Store();
		store.replacePFilter(user_id, velement_id, pfilter_id, pfilter);
		
	};
	
	
		
	control.appendChild(btn_save);
	
	
	return control;
};

tAssistance.UserConfigMaker = function(user){
	var page = document.querySelector("[placeholder='page']");
	
	///jsonviewer(, user);
	
	var layout = tAssistance.dom.UserConfigLayout();
	page.appendChild(layout);
	
	var obsels_place = layout.querySelector("div[name='obsel-config']");
	
	var velements = user.configs[0].velements;
	
	var ofilter = new tAssistance.OzaVElementsEditorMaker(velements);
	obsels_place.appendChild(ofilter);
	
	var icons_place = layout.querySelector("div[name='icon-config']");
	
	var icons = user.configs[0].icons;
	
	var icon_config = new tAssistance.IconConfigMaker(icons);
	icons_place.appendChild(icon_config);
	
	var editor_place = layout.querySelector("div[name='editor']");
	
	var velement = user.configs[0].velements[0];
	
	var obsel_config = new tAssistance.ObselConfigMaker(velement);
	editor_place.appendChild(obsel_config);
	
};

tAssistance.OzaTraceHeaderMaker = function(trace){
	
	if(trace.properties.type == "UserDoc"){
		
	}	
};


tAssistance.ObselSelectorMaker = function(model){
	
	
	
	
};

tAssistance.OzaDocMaker = function(doc){
	var article = document.createElement("article");
	article.setAttribute("id", "ARTICLE_1");
	
	var html="";
	html += "	<div id=\"DIV_2\">";
	html += "";
	html += "		<img id=\"CANVAS_3\" src='"+doc.img+"'>";
	html += "		<\/img>";
	html += "	<\/div>";
	html += "	<div id=\"DIV_4\">";
	html += "		<h2 id=\"H2_5\">";
	html += "			"+doc.title+"";
	html += "		<\/h2>";
	html += "		<dl id=\"DL_6\">";
	html += "			<dt id=\"DT_7\">";
	html += "				Auteur :";
	html += "			<\/dt>";
	html += "			<dd id=\"DD_8\">";
	html += "				"+doc.author+"";
	html += "			<\/dd>";
	html += "			<dt id=\"DT_9\">";
	html += "				Editeur :";
	html += "			<\/dt>";
	html += "			<dd id=\"DD_10\">";
	html += "				"+doc.publisher+"";
	html += "			<\/dd>";
	html += "			<dt id=\"DT_11\">";
	html += "				Année :";
	html += "			<\/dt>";
	html += "			<dd id=\"DD_12\">";
	html += "				"+doc.date+"";
	html += "			<\/dd> <!--";
	html += "			<dt>";
	html += "				Genre :";
	html += "			<\/dt>";
	html += "			<dd>";
	html += "				"+doc.genre+"";
	html += "			<\/dd> -->";
	html += "			<dt id=\"DT_13\">";
	html += "				Nombre de pages :";
	html += "			<\/dt>";
	html += "			<dd id=\"DD_14\">";
	html += "				"+"";
	html += "			<\/dd>";
	html += "		<\/dl>";
	html += "	<\/div>";

	article.innerHTML = html;
	
	document.querySelector("[placeholder='page']").appendChild(article);
	
	
};