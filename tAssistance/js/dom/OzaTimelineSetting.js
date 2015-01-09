tAssistance.dom.OzaTimelineSetting = function(id){
		
	var list = document.createElement("ul");
	list.setAttribute("class","list-group");
	
//	var list_heading = document.createElement("li");
//	list_heading.setAttribute("class","list-group-item active");
//	list_heading.innerHTML = "Timeline";
	
	var display = document.createElement("li");
	display.setAttribute("class","list-group-item");
	display.innerHTML = "Affichage";
	
	var icon = document.createElement("li");
	icon.setAttribute("class","list-group-item");
	icon.innerHTML = "Icon";
	
	//panel_body.appendChild(list);
	
	//list.appendChild(list_heading);
	list.appendChild(display);
	list.appendChild(icon);
	
	return list;
};

tAssistance.dom.OzaVElementsTable = function(id){
		
	var table = document.createElement("table");
	table.setAttribute("class","table table-striped table-condensed");
		
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);

	return table;
};

tAssistance.dom.OzaTimelineCondSetting = function(id, propertyList){
	var panel = document.createElement("div");
	panel.setAttribute("class","panel panel-primary");
	panel.setAttribute("style","display:inline-block");
	
	var panel_heading = document.createElement("div");
	panel_heading.setAttribute("class","panel-heading");
	panel_heading.setAttribute("style","padding: 0px; margin: 0px");
		
	var panel_title = document.createElement("div");
	panel_title.setAttribute("class","panel-title");
	panel_title.setAttribute("style","padding: 5px; margin: 0px");
	panel_title.innerHTML = "Condition Setting";
		
	var panel_body = document.createElement("div");
	panel_body.setAttribute("class","panel-body");
	
	var table = document.createElement("table");
	table.setAttribute("class","table");
	
	var icon1 = document.createElement("tr");
	
	var tr1 = document.createElement("tr");
	tr1.setAttribute('style', 'padding: 5px' );
	
	var td1 = document.createElement("td");
	
	var btn_dd = document.createElement("div");
	btn_dd.setAttribute('class', 'btn-group');
	
	var btn = document.createElement("div");
	btn.setAttribute("type","button");
	btn.setAttribute("class","btn btn-default dropdown-toggle");
	btn.setAttribute("style","margin: 5px");
	btn.setAttribute("data-toggle","dropdown");
	btn.innerHTML = "type";
	
	var caret = document.createElement("span");
	caret.setAttribute("class","caret");
	
	btn.appendChild(caret);
	
	var menu = document.createElement("ul");
	menu.setAttribute("class","dropdown-menu");
	menu.setAttribute("style","height: auto; max-height: 200px; overflow-y: scroll");
	menu.setAttribute("role","menu");
	
	for(var i in propertyList){
		menu.appendChild(propertyList[i]);
	}
	
	btn_dd.appendChild(btn);
	btn_dd.appendChild(menu);
	
	td1.appendChild(btn_dd);
	
	var td2 = document.createElement("td");
	td2.setAttribute('name', 'td2' );
	td2.setAttribute('width', '200px' );
	
	var btn_g1 = document.createElement("div");
	btn_g1.setAttribute('class', 'btn-group');

	tr1.appendChild(td1);
	tr1.appendChild(td2);
	
	
	panel.appendChild(panel_heading);
	//panel.appendChild(panel_body);
	panel.appendChild(table);
	
	panel_heading.appendChild(panel_title);
	
	//panel_body.appendChild(list);
	
	//list.appendChild(list_heading);
	table.appendChild(tr1);
	//list.appendChild(icon);
	
	return panel;
};

tAssistance.dom.OzaIconSetting = function(id){
	var panel = document.createElement("div");
	panel.setAttribute("class","panel panel-primary");
	panel.setAttribute("style","display:inline-block");
	
	var panel_heading = document.createElement("div");
	panel_heading.setAttribute("class","panel-heading");
	panel_heading.setAttribute("style","padding: 0px; margin: 0px");
		
	var panel_title = document.createElement("div");
	panel_title.setAttribute("class","panel-title");
	panel_title.setAttribute("style","padding: 5px; margin: 0px");
	panel_title.innerHTML = "Icon Setting";
	
	
	
	var panel_body = document.createElement("div");
	panel_body.setAttribute("class","panel-body");
	
	var table = document.createElement("table");
	table.setAttribute("class","table");

	
	var icon1 = document.createElement("tr");
	
	var tr1 = document.createElement("tr");
	tr1.setAttribute('style', 'padding: 5px' );
	
	var td1 = document.createElement("td");
	
	var icon = document.createElement("img");
	icon.setAttribute('width', '20' );
	icon.setAttribute('height', '20' );
	icon.setAttribute('style', 'margin: 5px' );
	icon.setAttribute('src','img/default.png');
	
	td1.appendChild(icon);
	
	var td2 = document.createElement("td");
	td2.setAttribute('width', '200px' );
	td2.innerHTML = "No Image";
	
	var td3 = document.createElement("td");
	
	//var chkbox = document.createElement("div");
	//chkbox.setAttribute("class","checkbox");
	//chkbox.setAttribute("style","margin: 5px; padding: 5px");
	
	var input_chkbox = document.createElement("input");
	input_chkbox.setAttribute("type","checkbox");
	input_chkbox.setAttribute("style","margin: 0px; padding: 0px");
	input_chkbox.setAttribute("value","1");
	
	//chkbox.appendChild(input_chkbox);
	
	//chkbox.appendChild(label);
	td3.appendChild(input_chkbox);
	
	var td4 = document.createElement("td");
	
	var btn = document.createElement("button");
	btn.setAttribute("class","button");
	btn.setAttribute('style', 'margin: 5px; padding: 2px' );
	
	var setting = document.createElement("img");
	setting.setAttribute('width', '20' );
	setting.setAttribute('height', '20' );
	setting.setAttribute('src','img/setting.png');
	
	btn.appendChild(setting);
	
	td4.appendChild(btn);
	
	
	
	tr1.appendChild(td1);
	tr1.appendChild(td2);
	tr1.appendChild(td3);
	tr1.appendChild(td4);
	
	
	panel.appendChild(panel_heading);
	//panel.appendChild(panel_body);
	panel.appendChild(table);
	
	panel_heading.appendChild(panel_title);
	
	//panel_body.appendChild(list);
	
	//list.appendChild(list_heading);
	table.appendChild(tr1);
	//list.appendChild(icon);
	
	return panel;
};

tAssistance.dom.PropertyList = function(list){
	var propertyList = [];
	
	
	for(var property in list){
		var li = document.createElement("li");
		
		var a = document.createElement("a");		
		var txt = document.createTextNode(property);
				
		var valueType = document.createElement("span");
		valueType.setAttribute('class', 'label label-default');
		valueType.innerHTML = list[property].type;
		
		var listable = document.createElement("span");
		listable.setAttribute('class', 'label label-default');
		listable.innerHTML = list[property].list ? "listable" : "";
		
		a.appendChild(txt);
		a.appendChild(valueType);
		a.appendChild(listable);
		
		li.appendChild(a);
		
		propertyList.push(li);
	}
	
//	var attr2 = document.createElement("li");
//	//attr2.innerHTML = "begin";
//	
//	var radio2 = document.createElement("input");
//	radio2.setAttribute('type', 'radio' );
//	radio2.setAttribute('id', 'opt2' );
//	radio2.setAttribute("name","opt2");
//	radio2.setAttribute('value', 'begin' );
//	
//	var attr2_label = document.createElement("label");
//	attr2_label.setAttribute('for', 'opt2' );
//	attr2_label.innerHTML = "begin";
//	
//	attr2.appendChild(radio2);
//	attr2.appendChild(attr2_label);
	
	return propertyList;
};

tAssistance.dom.NumberFilter = function(pfilter){
			
	var control =  document.createElement("div");
	control.setAttribute('class', 'pfilter-control');
	control.setAttribute('style', 'padding: 5px');
	
	var text1 = document.createElement("span");
	text1.innerHTML = "Filter the values between ";
	
	var min_wrap = document.createElement("div");
	min_wrap.setAttribute('class', 'form-control');
	min_wrap.setAttribute('style', 'padding: 3px; margin: 5px; width:100px; display: inline-block');
	
	var min = document.createElement("input");
	min.setAttribute('type', 'text');
	min.setAttribute('class', 'min');
	min.setAttribute('style', 'padding: 0; border: none; height: 100%; width: 100%');
	min.setAttribute('placeholder', 'Min');
	
	min_wrap.appendChild(min);
	
	var text2 = document.createElement("span");
	text2.innerHTML = " and ";
	
	var max_wrap = document.createElement("div");
	max_wrap.setAttribute('class', 'form-control');
	max_wrap.setAttribute('style', 'padding: 3px; margin: 5px; width:100px; display:inline-block');
	
	var max = document.createElement("input");
	max.setAttribute('type', 'text');
	max.setAttribute('class', 'max');
	max.setAttribute('style', 'padding: 0; border: none; height: 100%; width: 100%');
	max.setAttribute('placeholder', 'Max');
	
	max_wrap.appendChild(max);
	
	control.appendChild(text1);
	control.appendChild(min_wrap);
	control.appendChild(text2);
	control.appendChild(max_wrap);
	
	return control;
};

tAssistance.dom.PFilter = function(properties){
	var form_group =  document.createElement("div");
	form_group.setAttribute('class', 'form-group');
	
	return form_group;
};

tAssistance.dom.PropertySelectControl = function(properties){
	var control =  document.createElement("div");
	control.setAttribute('class', 'in_group');
	control.setAttribute('style', 'padding: 5px');
	
	var text1 = document.createElement("span");
	text1.innerHTML = "Filter on the property ";
	
	var btn_dd = document.createElement("div");
	btn_dd.setAttribute('class', 'btn-group');
	
	var btn = document.createElement("div");
	btn.setAttribute("type","button");
	btn.setAttribute("class","btn btn-default dropdown-toggle");
	btn.setAttribute("style","margin: 5px");
	btn.setAttribute("data-toggle","dropdown");
	btn.innerHTML = "";
	
	var caret = document.createElement("span");
	caret.setAttribute("class","caret");
	
	btn.appendChild(caret);
	
	var menu = document.createElement("ul");
	menu.setAttribute("class","dropdown-menu");
	menu.setAttribute("style","height: auto; max-height: 200px; overflow-y: scroll");
	menu.setAttribute("role","menu");
	
	for(var i in properties){
		var property = properties[i];
		
		var property_dom = new tAssistance.dom.PropertyRow(property);
		
		property_dom.onclick = function (e){
			btn.innerHTML = e.target.textContent;
		};		
		
		menu.appendChild(property_dom);
	}
	
	btn_dd.appendChild(btn);
	btn_dd.appendChild(menu);
	
	control.appendChild(text1);
	control.appendChild(btn_dd);
	
	return control;
};

tAssistance.dom.PFilterTemplateControl = function(templates){
	
	var control =  document.createElement("div");
	control.setAttribute('class', 'in_group');
	control.setAttribute('style', 'padding: 5px');
	
	var text1 = document.createElement("span");
	text1.innerHTML = "Templates for filter ";
	
	var btn_dd = document.createElement("div");
	btn_dd.setAttribute('class', 'btn-group');
	
	var btn = document.createElement("div");
	btn.setAttribute("type","button");
	btn.setAttribute("class","btn btn-default dropdown-toggle");
	btn.setAttribute("style","margin: 5px");
	btn.setAttribute("data-toggle","dropdown");
	btn.innerHTML = "";
	
	var caret = document.createElement("span");
	caret.setAttribute("class","caret");
	
	btn.appendChild(caret);
	
	var menu = document.createElement("ul");
	menu.setAttribute("class","dropdown-menu");
	menu.setAttribute("style","height: auto; max-height: 200px; overflow-y: scroll");
	menu.setAttribute("role","menu");
		
	btn_dd.appendChild(btn);
	btn_dd.appendChild(menu);
	
	control.appendChild(text1);
	control.appendChild(btn_dd);
	
	return control;	
};

tAssistance.dom.StringFilter = function(pfilter){
	
	var control =  document.createElement("div");
	control.setAttribute('class', 'pfilter-control');
	control.setAttribute('style', 'padding: 5px');
	
	var text = document.createElement("span");
	text.innerHTML = "Filter the values which match the regular expression ";
	
	var search_wrap = document.createElement("div");
	search_wrap.setAttribute('class', 'form-control');
	search_wrap.setAttribute('style', 'padding: 3px; margin: 5px; width:100px; display: inline-block');
	
	var search = document.createElement("input");
	search.setAttribute('type', 'text');
	search.setAttribute('style', 'padding: 0; border: none; width: 100%; height: 100%;');
	search.setAttribute('placeholder', 'Search');
	search.value = "";
	
	search_wrap.appendChild(search);

	control.appendChild(text);
	control.appendChild(search_wrap);
	
	return control;
};

tAssistance.dom.EditableValueList = function(prop_values){
	var form_group =  document.createElement("div");
	form_group.setAttribute('class', 'form-group');
		
//	var input_group =  document.createElement("div");
//	//input_group.setAttribute('class', 'input-group');
//	input_group.setAttribute('style', 'padding: 5px');
//	
//	form_group.appendChild(input_group);
	
//	var search_wrap = document.createElement("div");
//	search_wrap.setAttribute('class', 'form-control');
//	search_wrap.setAttribute('style', 'padding: 3px; margin: 5px; width:auto;');
	
	var selectedList = document.createElement("div");
	selectedList.setAttribute('class', 'panel panel-default');
	selectedList.innerHTML = "Selected values";
	selectedList.setAttribute('style', 'max-width: 200px; max-height: 200px; overflow: scroll');
		
	for(var i in prop_values){
		var selectedValue = document.createElement("span");
		selectedValue.setAttribute('class', 'label label-info');
		selectedValue.setAttribute('style', 'display: inline-block; margin: 3px');
		selectedValue.innerHTML = prop_values[i];
		
		var removeicon = document.createElement("span");
		removeicon.setAttribute('class', 'glyphicon glyphicon-remove');
		removeicon.setAttribute('style', 'margin: 3px');
		
		selectedValue.appendChild(removeicon);
		
		selectedList.appendChild(selectedValue);
	}
	
	var selectedList = document.createElement("div");
	//selectedList.setAttribute('class', 'panel panel-default');
	selectedList.setAttribute('style', 'max-width: 200px; max-height: 200px; overflow: scroll');
	
	var table = document.createElement("div");
	table.setAttribute('class', 'table');
	
	selectedList.appendChild(table);
	
	for(var i in prop_values){
		var value_row = document.createElement("tr");
		//selectedValue.setAttribute('class', 'label label-info');
		//value_row.setAttribute('style', 'margin: 3px');
		//value_row.innerHTML = prop_values[i];
				
		var td1 = document.createElement("td");
		
		var chkbx = document.createElement("input");
		chkbx.setAttribute("type","checkbox");
		chkbx.setAttribute("style","margin: 0px; padding: 0px");
		chkbx.setAttribute("value","1");
		
		td1.appendChild(chkbx);
		
		var td2 = document.createElement("td");
		
		var text = document.createElement("span");
		text.setAttribute('class', 'label label-info');
		text.setAttribute('style', 'margin: 3px');
		text.innerHTML = prop_values[i];
		
		td1.appendChild(text);
		
		value_row.appendChild(td1);
		value_row.appendChild(td2);
		
		table.appendChild(value_row);
	}
	
	form_group.appendChild(selectedList);
	
	return form_group;
};

tAssistance.dom.ValueListButtons = function(){
	
	var buttons = document.createElement("div");
	buttons.setAttribute("class","btn-group");
	
	var btn_selectAll = document.createElement("button");
	btn_selectAll.setAttribute("type","button");
	btn_selectAll.setAttribute("class","btn btn-default");
	btn_selectAll.setAttribute("title","Check All");
	
	var chk_all = document.createElement("input");
	chk_all.setAttribute("type","checkbox");
	chk_all.setAttribute("style","margin: 0px; padding: 0px");
	chk_all.setAttribute("disabled", true);
	chk_all.setAttribute("checked", true);
	
	btn_selectAll.appendChild(chk_all);
	
	var btn_unchkAll = document.createElement("button");
	btn_unchkAll.setAttribute("type","button");
	btn_unchkAll.setAttribute("class","btn btn-default");
	btn_unchkAll.setAttribute("title","Uncheck All");
	
	var unchk_all = document.createElement("input");
	unchk_all.setAttribute("type","checkbox");
	unchk_all.setAttribute("style","margin: 0px; padding: 0px");
	unchk_all.setAttribute("disabled", true);
	
	btn_unchkAll.appendChild(unchk_all);
	
	var btn_save = document.createElement("button");
	btn_save.setAttribute("type","button");
	btn_save.setAttribute("class","btn btn-default");
		
	var icon = document.createElement("i");
	icon.setAttribute("class","glyphicon glyphicon-save");
	
	btn_save.appendChild(icon);
	
	buttons.appendChild(btn_selectAll);
	buttons.appendChild(btn_unchkAll);
	buttons.appendChild(btn_save);
	
	return buttons;
};

tAssistance.dom.ValueList = function(params){
	
	var values = params.values;
	var onchange = params.onchange;
	
	var list = document.createElement("div");
	list.setAttribute('class', 'pfilter-control');
	$(list).css('padding', '5px');
	
	var title = document.createElement("span");
	title.innerHTML = " Selected values ";
	
	var list_body = document.createElement("div");
	list_body.setAttribute('style', 'max-width: 200px; max-height: 200px; overflow: auto; display: inline-block;border: 1px solid #ccc; border-radius: 4px; vertical-align: top');
		
	list.appendChild(title);
	list.appendChild(list_body);
	
	for(var i = 0; i<10;i++){
		var value_dom = document.createElement("input");
		value_dom.setAttribute('type', 'text');
		$(value_dom).css("padding","0");
		$(value_dom).css("border","none");
		$(value_dom).css("height","100%");
		$(value_dom).css("width","100%");
		value_dom.setAttribute('index', i);
		value_dom.setAttribute('placeholder', 'Value ['+i+']');
		if(i<values.length){
			value_dom.value = values[i];
		}
		else{
			value_dom.value = "";
		}
		
		value_dom.onchange = function(e){
			var index = parseInt(this.getAttribute("index"));
			onchange(list,index,this.value);
		};
		
		
		list_body.appendChild(value_dom);
	}
	
	return list;
};

tAssistance.dom.SelectorEditor = function(id){
	
	var panel = document.createElement("div");
	panel.setAttribute("class","panel panel-primary");
	panel.setAttribute("style","display:inline-block");
	
	var panel_heading = document.createElement("div");
	panel_heading.setAttribute("class","panel-heading");
	panel_heading.setAttribute("style","padding: 0px; margin: 0px");
		
	var panel_title = document.createElement("div");
	panel_title.setAttribute("class","panel-title");
	panel_title.setAttribute("style","padding: 5px; margin: 0px");
	panel_title.innerHTML = "Condition Setting";
	
	
	
	var panel_body = document.createElement("div");
	panel_body.setAttribute("class","panel-body");
	
	var table = document.createElement("table");
	table.setAttribute("class","table");

	
	var icon1 = document.createElement("tr");
	
	var tr1 = document.createElement("tr");
	tr1.setAttribute('style', 'padding: 5px' );
	
	var td1 = document.createElement("td");
	
	var btn_dd = document.createElement("div");
	btn_dd.setAttribute('class', 'btn-group');
	
	var btn = document.createElement("div");
	btn.setAttribute("type","button");
	btn.setAttribute("class","btn btn-default dropdown-toggle");
	btn.setAttribute("style","margin: 5px");
	btn.setAttribute("data-toggle","dropdown");
	btn.innerHTML = "type";
	
	var caret = document.createElement("span");
	caret.setAttribute("class","caret");
	
	btn.appendChild(caret);
	
	var menu = document.createElement("ul");
	menu.setAttribute("class","dropdown-menu");
	menu.setAttribute("style","height: auto; max-height: 200px; overflow-y: scroll");
	menu.setAttribute("role","menu");
	
	for(var i in propertyList){
		menu.appendChild(propertyList[i]);
	}
	
	btn_dd.appendChild(btn);
	btn_dd.appendChild(menu);
	
	td1.appendChild(btn_dd);
	
	var td2 = document.createElement("td");
	td2.setAttribute('name', 'td2' );
	td2.setAttribute('width', '200px' );
	
	var btn_g1 = document.createElement("div");
	btn_g1.setAttribute('class', 'btn-group');

//	var input =  document.createElement("input");
//	input.setAttribute('type', 'text' );
//	input.setAttribute('class', 'form-control' );
//	input.setAttribute("style","margin: 5px");
//	input.setAttribute('placeholder', 'Value' );
	
	//var number_filter = new tAssistance.dom.ListFilter(propertyList[0].values);
	
	//btn_g1.appendChild(number_filter);
	//td2.appendChild(btn_g1);
	//td2.appendChild(number_filter);
		
	tr1.appendChild(td1);
	tr1.appendChild(td2);
		
	panel.appendChild(panel_heading);
	//panel.appendChild(panel_body);
	panel.appendChild(table);
	
	panel_heading.appendChild(panel_title);
	
	//panel_body.appendChild(list);
	
	//list.appendChild(list_heading);
	table.appendChild(tr1);
	//list.appendChild(icon);
	
	return panel;
};

tAssistance.dom.FilterTable = function(properties){
	
	var table = document.createElement("table");
	table.setAttribute("class","table table-striped table-condensed");
		
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);
			
	return table;
};

tAssistance.dom.PFilterRow = function(pfilter){
	
	var tr = document.createElement("tr");
	//tr.setAttribute('style', 'padding: 5px' );

	var td1 = document.createElement("td");
	$(td1).css('vertical-align', 'middle');
	td1.setAttribute('width', '30px' );
	$(td1).css('padding', '0px');
	
	var chkbx = document.createElement("input");
	chkbx.setAttribute("type","checkbox");
	chkbx.setAttribute("style","margin: 0px; padding: 0px");
	chkbx.setAttribute("value","1");
	
	td1.appendChild(chkbx);
	
	var td2 = document.createElement("td");
	$(td2).css('vertical-align', 'middle');
	$(td2).css('padding', '0px');
	
	var text = document.createElement("span");
	text.setAttribute('class', 'label label-primary');
	text.setAttribute('style', 'margin: 3px');
	text.innerHTML = pfilter.property_name;
	
	td2.appendChild(text);
	
	var td3 = document.createElement("td");
	$(td3).css('vertical-align', 'middle');
	td3.setAttribute('width', '30px' );
	$(td3).css('padding', '0px');
	
	var type = document.createElement("span");
	type.setAttribute('class', 'label label-info');
	type.setAttribute('style', 'margin: 3px');
	type.innerHTML = pfilter.property_type;
	
	td3.appendChild(type);
	
	var td4 = document.createElement("td");
	$(td4).css('vertical-align', 'middle');
	$(td4).css('padding', '0px');
	
	var type = document.createElement("span");
	type.setAttribute('class', 'label label-info');
	type.setAttribute('style', 'margin: 3px');
	type.innerHTML = pfilter.filter_desc;
	
	td4.appendChild(type);
	
	var td5 = document.createElement("td");
	$(td5).css('vertical-align', 'middle');
	$(td5).css('padding', '0px');
	td5.setAttribute('width', '30px' );
	
	var edit = document.createElement("button");
	//edit.setAttribute('class', 'btn');
	edit.setAttribute('style', 'margin: 3px; padding: 2px');
	
	var edit_icon = document.createElement("i");
	edit_icon.setAttribute('class', 'glyphicon glyphicon-edit');
	edit_icon.setAttribute('style', 'margin: 3px');
	
	edit.appendChild(edit_icon);
	
	td5.appendChild(edit);
	
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	
	return tr;
};

tAssistance.dom.VElementRow = function(velement){
	
	var tr = document.createElement("tr");
	//tr.setAttribute('style', 'padding: 5px' );
	
	var td1 = document.createElement("td");
	$(td1).css('vertical-align', 'middle');
	td1.setAttribute('width', '30px' );
	$(td1).css('padding', '0px');
	
	var icon = document.createElement("img");
	icon.setAttribute('width', '20' );
	icon.setAttribute('height', '20' );
	icon.setAttribute('style', 'margin: 5px' );
	icon.setAttribute('src','img/default.png');
	
	td1.appendChild(icon);
	
	var td2 = document.createElement("td");
	$(td2).css('vertical-align', 'middle');
	$(td2).css('padding', '0px');
	td2.innerHTML = velement.id;
	
	var td3 = document.createElement("td");
	$(td3).css('vertical-align', 'middle');
	td3.setAttribute('width', '30px' );
	$(td3).css('padding', '0px');
	//var chkbox = document.createElement("div");
	//chkbox.setAttribute("class","checkbox");
	//chkbox.setAttribute("style","margin: 5px; padding: 5px");
	
	var input_chkbox = document.createElement("input");
	input_chkbox.setAttribute("type","checkbox");
	input_chkbox.setAttribute("style","margin: 0px; padding: 0px");
	input_chkbox.setAttribute("value", velement.active);
	
	//chkbox.appendChild(input_chkbox);
	
	//chkbox.appendChild(label);
	td3.appendChild(input_chkbox);
	
	var td4 = document.createElement("td");
	$(td4).css('vertical-align', 'middle');
	$(td4).css('padding', '0px');
	td4.setAttribute('width', '30px' );
	
	var btn = document.createElement("button");
	btn.setAttribute("class","button");
	btn.setAttribute('style', 'margin: 5px; padding: 2px' );
	
	var setting = document.createElement("img");
	setting.setAttribute('width', '20' );
	setting.setAttribute('height', '20' );
	setting.setAttribute('src','img/setting.png');
	
	btn.appendChild(setting);
	
	td4.appendChild(btn);
	
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	
	return tr;
};

tAssistance.dom.PropertyRow = function(property){
	var li = document.createElement("li");
	
	var a = document.createElement("a");		
	var txt = document.createTextNode(property);
		
	a.appendChild(txt);
	
	li.appendChild(a);
	
	return li;
};

tAssistance.dom.TemplRow = function(templ){
	var li = document.createElement("li");
	
	var a = document.createElement("a");
	var txt = document.createTextNode(templ);
	
	a.appendChild(txt);
	
	li.appendChild(a);
	
	return li;
};
