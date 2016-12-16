tAssistance.UserConfigPage = function(user_id){
	
	//var test1 = document.getElementById("test1");
	
	var store = new tAssistance.Store();
	store.getUserById("alain", function(data){
		
		var user = data;
		
		var params = {
			"user": user	
		};
		
		var widget = new tAssistance.UserConfigMaker(params);
		
		var params = {
				"icons": user.configs[0].icons,
				"obsel": "1",
				"popup": "1"
		};

//		var list = new tAssistance.ObselIconListMaker(params);
//		
//				
//		document.body.appendChild(list);
		
		$('.fileinput').fileinput();
	});
	
};

tAssistance.UserConfigMaker = function(params){
	var user = params.user;
	
	var page = document.querySelector("[placeholder='page']");
	
	var layout = tAssistance.dom.UserConfigLayout();
	page.appendChild(layout);
	
	var obsels_place = layout.querySelector("div[name='obsel-config']");
	
	var obsels = user.configs[0].obsels;
	
	var ofilter = new tAssistance.ObselListConfigMaker(user);
	obsels_place.appendChild(ofilter);
	
//	var icons_place = layout.querySelector("div[name='icon-config']");
//	
//	var icons = user.configs[0].icons;
//	
//	var icon_config = new tAssistance.IconConfigMaker(icons);
//	icons_place.appendChild(icon_config);
//	
	//var editor_place = layout.querySelector("div[name='editor']");
	
	//var velement = user.configs[0].velements[0];
	
//	var contraint_config = new tAssistance.ContraintMaker();
//	editor_place.appendChild(contraint_config);
	
};

tAssistance.dom.UserConfigLayout = function(){
	
	var container = document.createElement("div");
	container.setAttribute("class","panel");
		
	var obsels = document.createElement("div");
	obsels.setAttribute("name","obsel-config");	
	
	var icons = document.createElement("div");
	icons.setAttribute("name","icon-config");
	
	var detail = document.createElement("div");
	detail.setAttribute("name","editor");
		
	container.appendChild(obsels);
	container.appendChild(icons);
	container.appendChild(detail);
	
	return container;
};

tAssistance.ObselListConfigMaker = function(user){
	var config = user.configs[0];
	var obsels = config.obsels;
	
	var layout = new tAssistance.dom.NavTab1("Obsels to display");
	
	// save userconfig to page
	tAssistance.Page.UserConfig = user;
		
	var table = new tAssistance.dom.OzaTable("aaa1");
	var tbody = table.querySelector("tbody");
	var panel_body = layout.querySelector("[placeholder='navtab-body']");
	panel_body.appendChild(table);
	
	function find_icon_img(obsel, icons){
		
		for(var i in icons){
			var icon = icons[i];
			if(obsel.icon==icon.id){
				return icon.img;
			}
		}
		return  "img/default.png";
	}
	
	for(var i in obsels){
		var obsel = obsels[i];
		obsel.icon_img = find_icon_img(obsel, config.icons);		
		
		var params = {
			"obsel": obsel,
			"user": user
		};
		
		var row = new tAssistance.ObselConfigMaker(params);
		
		//var chk_box = row.querySelector("input[type='checkbox']");
		
//		chk_box.onclick = function(){
////			var chked = this.checked;
////			
////			prop_config.active = chked;
////			
////			var store = new tAssistance.Store();
////			store.updatePFilter("hoang","velement1", "pfilter1", "active", "1");
//		};		
		
		tbody.appendChild(row);		
	}	
	
	return layout;
};


tAssistance.ObselConfigMaker = function(params){
	var obsel = params.obsel;
	var user = params.user;
	
	var row = tAssistance.dom.ObselConfigRow(obsel);
	
	var properties_container = row.querySelector("div[name='properties']");
	
	var active_btn = row.querySelector(".active-btn");
	
	var icon_btn = row.querySelector(".obsel-icon");
	
	var params = {
		"btn": active_btn,
		"obsel": obsel
	};
	
	icon_btn.onclick = function(){
		return function(e){
			//contraint.clicked = true;
			
			var params = {
				"element": icon_btn,
				"event": e,
				"obsel": obsel,
				"user": user
			};
			
			//var popup = new tAssistance.IconPopupMaker(params);
			var popup = new tAssistance.IconSelectorPopupMaker(params);
		};
	}();
		
	var active_btn = new tAssistance.OzaObselConfigActiveBtnMaker(params);
	
	
	var properties = new tAssistance.PropertyListConfigMaker(obsel);
	
	properties_container.appendChild(properties);
	
	
	
	
	return row;
};

tAssistance.PropertyListConfigMaker = function(obsel){
	var properties = obsel.properties;
	
	//var layout = new tAssistance.dom.NavTab1("Obsels to display");
	
	//layout.querySelector("div.panel-title").innerHTML = "Timeline: Obsels to display";
	//$(layout.querySelector("div.panel-body")).css("height","300px");
	//$(layout.querySelector("div.panel-body")).css("overflow","scroll");
		
	var table = new tAssistance.dom.PropertiesTable("aaa1");
	var tbody = table.querySelector("tbody");
	//var panel_body = layout.querySelector("[placeholder='navtab-body']");
	//panel_body.appendChild(table);
		
	for(var i in properties){
		var property = properties[i];
		var contraint = property.contraint;
		
		var row = tAssistance.dom.PropertyConfigRow(property);
		
		var contraint_a = row.querySelector("a");
		
		
		
		contraint_a.onclick = (function(contraint_a, contraint){
			return function(e){
				contraint.clicked = true;
				
				var params = {
					"element": contraint_a,
					"event": e,
					"contraint": contraint
				};
				
				var popup = new tAssistance.ContraintPopupMaker(params);
			};			
		}(contraint_a, contraint));
		
		tbody.appendChild(row);		
	}	
	
	return table;
};

tAssistance.IconConfigMaker = function(icons){
	
	var layout = new tAssistance.dom.NavTab1("Icons to display");
		
	var table = new tAssistance.dom.OzaTable("aaa1");
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

tAssistance.ContraintParamsSelector = function(params){
	var control;
	var template = params.template;
	var contraint = params.contraint;
	
	//
	if(template=="string"){
				
		control = tAssistance.StringFilterMaker;	
	}
	else if(template=="number"){
				
		control = tAssistance.NumberFilterMaker;
	}
//	else if(template=="values"){
//		control = tAssistance.ValuesEditorMaker;
//	}
	
	return control;
};