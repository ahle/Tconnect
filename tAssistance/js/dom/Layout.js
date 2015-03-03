tAssistance.dom.TBTLayout = function(id){
	
	var container = document.createElement("div");
	container.setAttribute("class","panel");
		
	var title = document.createElement("p");
	title.setAttribute("name","title");
	title.innerHTML = "Listing";	
	
	var buttons = document.createElement("div");
	buttons.setAttribute("name","buttons");
	
	var object = document.createElement("div");
	object.setAttribute("name","object");
		
	container.appendChild(title);
	container.appendChild(buttons);
	container.appendChild(object);
	
	return container;
};

tAssistance.dom.PanelLayout = function(id){
	
	var panel = document.createElement("div");
	panel.setAttribute("class","panel panel-primary");
	panel.setAttribute("style","display:block");
	
	var panel_heading = document.createElement("div");
	panel_heading.setAttribute("class","panel-heading");
	panel_heading.setAttribute("style","padding: 0px; margin: 0px;");
	
	panel.appendChild(panel_heading);
		
	var panel_title = document.createElement("div");
	panel_title.setAttribute("class","panel-title");
	panel_title.setAttribute("style","padding: 5px; margin: 0px;  font-size: 14px");
	panel_title.innerHTML = "Condition Setting";
	
	panel_heading.appendChild(panel_title);
	
	var panel_body = document.createElement("div");
	panel_body.setAttribute("class","panel-body");
		
	panel.appendChild(panel_body);
	
	return panel;
};

tAssistance.dom.Gird4Layout = function(id){
	
	var panel = document.createElement("div");
	panel.setAttribute("class","container-fluid");
	
	var top = document.createElement("div");
	top.setAttribute("class","row");
	
	var bot = document.createElement("div");
	bot.setAttribute("class","row");
		
	panel.appendChild(top);
	panel.appendChild(bot);
		
	var left1 = document.createElement("div");
	left1.setAttribute("name","top-left");
	left1.setAttribute("class","col-md-6");
	
	var right1 = document.createElement("div");
	right1.setAttribute("name","top-right");
	right1.setAttribute("class","col-md-6");
	
	top.appendChild(left1);
	top.appendChild(right1);
	
	var left2 = document.createElement("div");
	left2.setAttribute("name","bot-left");
	left2.setAttribute("class","col-md-6");
	
	var right2 = document.createElement("div");
	right2.setAttribute("name","bot-right");
	right2.setAttribute("class","col-md-6");
	
	bot.appendChild(left2);
	bot.appendChild(right2);
	
	
	return panel;
};

tAssistance.dom.SidebarLayout = function(id){
	
	var panel = document.createElement("div");
	panel.setAttribute("class","container-fluid");
	panel.setAttribute("style","border: 1px dotted black");
	
	var row = document.createElement("div");
	row.setAttribute("class","row");
	
	panel.appendChild(row);
		
	var left = document.createElement("div");
	left.setAttribute("name","left");
	left.setAttribute("class","col-md-2");
	left.setAttribute("style","border: 1px dotted black");
	
	var right = document.createElement("div");
	right.setAttribute("name","right");
	right.setAttribute("class","col-md-8");
	right.setAttribute("style","border: 1px dotted black");
	
	row.appendChild(left);
	row.appendChild(right);
		
	return panel;
};

tAssistance.dom.MainLayout = function(params){
	
	var collector_uri = params.collector_uri;
	var editor_uri = params.editor_uri;
	
	var container = document.createElement("div");
	container.setAttribute("class","container-fluid");
	
	var top = document.createElement("div");
	top.setAttribute("class","row");
	
	container.appendChild(top);
	
	var body = document.createElement("div");
	body.setAttribute("class","row");
	
	container.appendChild(body);
		
	var left = document.createElement("div");
	left.setAttribute("role","navigation");
	left.setAttribute("name","left");
	left.setAttribute("class","col-md-3 sidebar-offcanvas");
	jQuery(left).css("width","200px");
	
	var menu = document.createElement("ul");
	menu.setAttribute("class","nav");
	
	left.appendChild(menu);
	
	var user =  document.createElement("li");
	menu.appendChild(user);
	
	var user_a = document.createElement("a");
	user_a.innerHTML = "User";
	user_a.href = "index.php?page=Users";
	user.appendChild(user_a);
	
	var doc =  document.createElement("li");
	menu.appendChild(doc);
	
	var doc_a = document.createElement("a");
	doc_a.innerHTML = "Document";
	doc_a.href = "index.php?page=Docs";
	doc.appendChild(doc_a);	
	
	var trace =  document.createElement("li");
	menu.appendChild(trace);
	
	var trace_a = document.createElement("a");
	trace_a.innerHTML = "Trace";
	trace_a.href = "index.php?page=Traces";
	trace.appendChild(trace_a);
	
	var userconfig =  document.createElement("li");
	menu.appendChild(userconfig);
	
	var userconfig_a = document.createElement("a");
	userconfig_a.innerHTML = "Configuration";
	userconfig_a.href = "index.php?page=UserConfig";
	userconfig.appendChild(userconfig_a);	
	
	var dashboard_config =  document.createElement("li");
	menu.appendChild(dashboard_config);
	
	var dashboard_a = document.createElement("a");
	dashboard_a.innerHTML = "Dashboard";
	dashboard_a.href = "index.php?page=Dashboard";
	dashboard_config.appendChild(dashboard_a);
	
	var collector_config =  document.createElement("li");
	menu.appendChild(collector_config);
	
	var collector_a = document.createElement("a");
	collector_a.innerHTML = "Collector";
	collector_a.href = collector_uri;
	collector_config.appendChild(collector_a);
	
	var editor_config =  document.createElement("li");
	menu.appendChild(editor_config);
	
	var editor_a = document.createElement("a");
	editor_a.innerHTML = "Editor";
	editor_a.href = editor_uri;
	editor_config.appendChild(editor_a);
	
	var dev =  document.createElement("li");
	menu.appendChild(dev);
	
	var dev_a = document.createElement("a");
	dev_a.innerHTML = "Development";
	dev_a.href = "https://github.com/ahle/tconnect";
	dev.appendChild(dev_a);
	
	var right = document.createElement("div");
	right.setAttribute("placeholder","page");
	right.setAttribute("name","right");
	right.setAttribute("class","col-md-9");
	right.setAttribute("style","border: 1px dotted black");
	
	body.appendChild(left);
	body.appendChild(right);
		
	return container;
};

tAssistance.dom.NavBarTop = function(user_id){
	
	var navbar_top = document.createElement("div");
	navbar_top.setAttribute("class","navbar navbar-inverse navbar-static-top");
//	
//	var navbar_inner = document.createElement("div");
//	navbar_inner.setAttribute("class","navbar-inner");
//	navbar_top.appendChild(navbar_inner);
//	
//	var container = document.createElement("div");
//	container.setAttribute("class","container");
//	navbar_inner.appendChild(container);
//	
//	var navbar_header = document.createElement("div");
//	navbar_header.setAttribute("class","navbar-header");
//	container.appendChild(navbar_header);
//	
//	var navbar_brand = document.createElement("a");
//	navbar_brand.setAttribute("class","navbar-brand");
//	navbar_brand.setAttribute("href","#");
//	navbar_brand.innerHTML="Trace Assistant";
//	navbar_header.appendChild(navbar_brand);
//	
//	var navbar_right = document.createElement("ul");
//	navbar_right.setAttribute("class","nav navbar-nav navbar-right");
//	container.appendChild(navbar_right);
//	
//	var li_drop = = document.createElement("li");
//	li_drop.setAttribute("class","dropdown");
//	navbar_right.appendChild(li_drop);
//	
//	var a_user = document.createElement("a");
//	a_user.setAttribute("class","dropdown-toggle");
//	a_user.setAttribute("role","button");
//	a_user.setAttribute("data-toggle","dropdown");
//	a_user.setAttribute("href","#");	
//	li_drop.appendChild(a_user);
//	
//	var i_user = document.createElement("i");
//	i_user.setAttribute("class","glyphicon glyphicon-user");
//	a_user.appendChild(i_user);
//	
//	var user_id = document.createTextNode(user_id);
//	a_user.appendChild(user_id);
//	
//	var span_caret = document.createElement("span");
//	a_user.appendChild(span_caret);
	
	navbar_top.innerHTML = 
	
	
	  '<div class="navbar-inner"> \
	    <div class="container">\
	    	<div class="navbar-header">    	\
	    	<a class="navbar-brand" href="index.php">Trace Assistant: Ozalid</a>\
	    	</div>\
	      <ul class="nav navbar-nav navbar-right">\
	      	<li class="dropdown">\
	          <a class="dropdown-toggle" role="button" data-toggle="dropdown" href="#"><i class="glyphicon glyphicon-user"></i> '+user_id+' <span class="caret"></span></a>\
	          <ul id="g-account-menu" class="dropdown-menu" role="menu">\
	            <li><a href="#">My Profile</a></li>\
	          </ul>\
	        </li>\
	        <li><a href="index.php?page=logout"><i class="glyphicon glyphicon-lock"></i> Logout</a></li>\
	      </ul>\
	    </div>\
	  </div>';
	
	return navbar_top;
	
}

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

tAssistance.dom.ObselTypeList = function(model){
	
	var navbar_top = document.createElement("div");
	navbar_top.setAttribute("class","navbar navbar-inverse navbar-static-top");
	
	var html="";
	html += "<div class=\"list-group\" id=\"list1\">";
	html += "    <a href=\"#\" class=\"list-group-item active\">List 1 <input title=\"toggle all\" type=\"checkbox\" class=\"all pull-right\"><\/a>";
	html += "    <a href=\"#\" class=\"list-group-item\">Second item <input type=\"checkbox\" class=\"pull-right\"><\/a>";
	html += "    <a href=\"#\" class=\"list-group-item\">Third item <input type=\"checkbox\" class=\"pull-right\"><\/a>";
	html += "    <a href=\"#\" class=\"list-group-item\">More item <input type=\"checkbox\" class=\"pull-right\"><\/a>";
	html += "    <a href=\"#\" class=\"list-group-item\">Another <input type=\"checkbox\" class=\"pull-right\"><\/a>";
	html += "    <\/div>";
		
};

tAssistance.dom.NavTab1 = function(title){
	var container = document.createElement("div");
	container.setAttribute("class","container");
	
	var tab = document.createElement("ul");
	tab.setAttribute("class","nav nav-tabs");
	$(tab).css("margin-bottom","10px");
	container.appendChild(tab);
	
	var li = document.createElement("li");
	li.setAttribute("role","presentation");
	li.setAttribute("class","active");	
	tab.appendChild(li);
	
	var a = document.createElement("a");
	a.setAttribute("href","#");	
	a.innerHTML = title;
	li.appendChild(a);
	
	var body = document.createElement("div");
	body.setAttribute("placeholder","navtab-body");
	container.appendChild(body);
	
	return container;
	
};

tAssistance.dom.PopupLayout = function(title){
	
	var container = document.createElement("div");
	container.setAttribute("class","popup_container");
	
	var title_div = document.createElement("div");
	title_div.setAttribute("class","popup_title");
	title_div.innerHTML = title;
	
	container.appendChild(title_div);
	
	var body = document.createElement("div");
	body.setAttribute("class","popup_body");
	container.appendChild(body);
	
	return container;
};

tAssistance.dom.GroupLayout = function(params){
	
	var group = document.createElement("div");
	group.setAttribute("class","container");
	$(group).css("margin","5px");
	
	var heading =  document.createElement("div");
	heading.setAttribute("class","group-heading");
	
	group.appendChild(heading);
	
	var items = document.createElement("div");
	items.setAttribute("class","group-items");
	
	group.appendChild(items);
	
	return group;	
};