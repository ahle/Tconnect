tAssistance.OzaMaker = function(){
	
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
		
		var row = new tAssistance.ObselConfigMaker(obsel);
		
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

tAssistance.ObselConfigMaker = function(obsel){
	
	var row = tAssistance.dom.ObselConfigRow(obsel);
	
	var properties_container = row.querySelector("div[name='properties']");
	
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
				
				var popup = new tAssistance.ContraintPopupMaker(contraint_a, e, contraint);
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
	else if(template=="values"){
		control = tAssistance.ValuesEditorMaker;
	}
	
	return control;
};

tAssistance.UserConfigMaker = function(user){
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


