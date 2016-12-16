tAssistance.DashBoardPage = function(){
	
	var dashboard = new tAssistance.page.DashBoard.ctler.Main();
	//var dashboard = new tAssistance.OzaDashBoardMaker();
	
	//var modal = tAssistance.dom.Modal();
};

tAssistance.page.DashBoard = {
	"model": {},
	"dom": {},
	"ctler": {},
	"data": {}
};

tAssistance.page.DashBoard.UserListSection = function(params){
	
	var users = params.users;
	var config = params.config;
	
	var section = tAssistance.dom.Section();
	
	var h1 = document.createElement("h4");
	h1.innerHTML = "Users";
		
	section.appendChild(h1);
	
	var list = tAssistance.page.DashBoard.UserListMaker(params);
	
	section.appendChild(list);
	
	return section;
	
	
};

tAssistance.page.DashBoard.DocListSection = function(params){
	
	var docs = params.docs;
	var config = params.config;
	
	var section = tAssistance.dom.Section();
	
	var h1 = document.createElement("h4");
	h1.innerHTML = "Documents";
		
	section.appendChild(h1);
	
	var list = tAssistance.page.DashBoard.DocListMaker(params);
	
	section.appendChild(list);
	
	return section;
};

tAssistance.page.DashBoard.UserListMaker = function(params){
	
	var users = params.users;
	
	var list_ = document.createElement("div");
	
	var vars = {
		"list": null,
		"control": null
	};
	
	var params = {
		"vars": vars			
	};
	
	var btn = tAssistance.page.DashBoard.UserListControlsMaker(params);
	
	vars.control = btn;
	
	var list = document.createElement("div");
	$(list).css("display","none");
	$(list).css("border-collapse","collapse");
			
	for(i=0; i<users.length;i++){
		var user = users[i];
		// add the computed information to the user
		
		var params = {
			"user": user
		};
		
		var row = new tAssistance.page.DashBoard.dom.UserRow(params);
		
		list.appendChild(row);
	}
	
	list_.appendChild(btn);
	list_.appendChild(list);
	
	vars.list = list;
	
	return list_;
};

tAssistance.page.DashBoard.dom.UserListControls = function(){
	
	var label = document.createElement("span");
	label.innerHTML = "All";	
	
	var check_all = document.createElement("input");
	check_all.setAttribute("type","checkbox");
	check_all.setAttribute("name","all_users");
	check_all.setAttribute("checked","checkbox");
	
	label.appendChild(check_all);
	
	return label;
};

tAssistance.page.DashBoard.UserListControlsMaker = function(params){
	
	var vars = params.vars;
	var list = vars.list;
	
	var btn = tAssistance.page.DashBoard.dom.UserListControls();
	
	var checkbox = btn.querySelector("input");
	checkbox.onclick = function(){
		if(checkbox.checked){
			$(vars.list).css("display","none");
			
		}
		else{
			$(vars.list).css("display","table");
		}
		console.log(vars);
	};
	
	
	return btn;
};

tAssistance.page.DashBoard.dom.UserRow = function(params){
	var user = params.user;
	
	userid = user.id;
	user_uri = user.uri;
	as_user_uri = user.as_user_uri;
	
	var user_row = document.createElement("div");
	user_row.setAttribute("class","ozatracelist-trace");
	$(user_row).css("padding","5px");
	$(user_row).css("border-bottom","3px white solid");
	$(user_row).css("display","table-row");
	
	user_icon = new tAssistance.dom.UserIcon();
	$(user_icon).css("display","table-cell");
	user_row.appendChild(user_icon);
	
	var user_id = document.createElement("a");
	user_id.setAttribute("href", as_user_uri);
	user_id.innerHTML = userid || "Tous";
	$(user_id).css("display","table-cell");
	
	user_row.appendChild(user_id);
	
	var checkbox = document.createElement("input");
	checkbox.setAttribute("type","checkbox");
	checkbox.setAttribute("name","user");
	checkbox.setAttribute("userid",user.id);
	$(checkbox).css("margin","5px");
	$(checkbox).css("padding","5px");
	$(checkbox).css("display","table-cell");
	
	user_row.appendChild(checkbox);
			
	return user_row;	
};

tAssistance.page.DashBoard.DocListMaker = function(params){
	
	var docs = params.docs;
	
	var list_ = document.createElement("div");
	
	var vars = {
		"list": null,
		"control": null
	};
	
	var params = {
		"vars": vars			
	};
	
	var btn = tAssistance.page.DashBoard.DocListControlsMaker(params);
	
	vars.control = btn;
	
	var list = document.createElement("div");
	$(list).css("display","none");
	$(list).css("border-collapse","collapse");
			
	for(i=0; i<docs.length;i++){
		var doc = docs[i];
		// add the computed information to the user
		
		var params = {
			"doc": doc
		};
		
		var row = new tAssistance.page.DashBoard.dom.DocRow(params);
		
		list.appendChild(row);
	}
	
	list_.appendChild(btn);
	list_.appendChild(list);
	
	vars.list = list;
	
	return list_;
};

tAssistance.page.DashBoard.dom.DocRow = function(params){
	var doc = params.doc;
	var doc_title = doc.title;
	
	if(doc_title){
		doc_title = doc_title.substr(0,50);
	}
	
	doc_id = doc.id;
	user_uri = doc.uri;
	as_user_uri = doc.as_user_uri;
	
	var doc_row = document.createElement("div");
	doc_row.setAttribute("class","ozatracelist-trace");
	$(doc_row).css("padding","5px");
	$(doc_row).css("border-bottom","3px white solid");
	$(doc_row).css("display","table-row");
	
	var icon = new tAssistance.dom.DocIcon();
	
	$(icon).css("display","table-cell");
	
	doc_row.appendChild(icon);
	
	var title = document.createElement("a");
	$(title).css("display","table-cell");
	title.setAttribute("href", as_user_uri);
	title.innerHTML = doc_title || "Tous";
	
	doc_row.appendChild(title);
	
	var checkbox = document.createElement("input");
	checkbox.setAttribute("type","checkbox");
	checkbox.setAttribute("name","doc");
	checkbox.setAttribute("docid",doc.id);
	checkbox.setAttribute("doc_title",doc.title);
	$(checkbox).css("margin","5px");
//	$(configadd_btn).css("border","1px solid green");
//	$(configadd_btn).css("border-radius","3px");
	$(checkbox).css("padding","5px");
	$(checkbox).css("display","table-cell");
	
	doc_row.appendChild(checkbox);
			
	return doc_row;	
};

tAssistance.page.DashBoard.dom.DocListControls = function(){
	
	var label = document.createElement("span");
	label.innerHTML = "All";	
	
	var check_all = document.createElement("input");
	check_all.setAttribute("name","all_docs");
	check_all.setAttribute("type","checkbox");
	check_all.setAttribute("checked","false");
	
	label.appendChild(check_all);
	
	return label;
};

tAssistance.page.DashBoard.DocListControlsMaker = function(params){
	
	var vars = params.vars;
	var list = vars.list;
	
	var btn = tAssistance.page.DashBoard.dom.DocListControls();
	
	var checkbox = btn.querySelector("input");
	checkbox.onclick = function(){
		if(checkbox.checked){
			$(vars.list).css("display","none");
			
		}
		else{
			$(vars.list).css("display","table");
		}
		console.log(vars);
	};
	
	
	return btn;
};

tAssistance.page.DashBoard.ctler.StatConfigBtnMaker = function(){
	
};

tAssistance.page.DashBoard.dom.StatConfigBtn = function(params){
	
	var a = document.createElement("div");
	a.setAttribute("class","ozatracelist-trace"); 
	
	return a;
};

tAssistance.page.DashBoard.ctler.Main = function(params){
	
	//var page = params.page;
	
	var user = "alain";
	var page = document.querySelector("[placeholder='page']");
	
	var onLoad = function(params){
		
		var config = params.config;
		
		var params = {
			"config": config,
			"dashboards": config.dashboards
		};
		
		var section = tAssistance.page.DashBoard.ctler.ListSectionMaker(params);
		page.appendChild(section);
	};
	
	var params = {
		onLoad: onLoad	
	};
	
	var loader = tAssistance.page.DashBoard.ctler.UserConfigLoader(params);	
};


tAssistance.page.DashBoard.ctler.ListMaker = function(params){
	var config = params.config;
	var dashboards = params.dashboards;
	
	// combine the userdocs and userconfig to create a new list
	
	var list_ = document.createElement("div");
	
	var vars = {
		"list": null,
		"control": null
	};
	
	var params = {
		"vars": vars			
	};
	
	var list = document.createElement("div");
	$(list).css("display","table");
	$(list).css("border-collapse","separate");
	//list.setAttribute("border","1");
	
	var header = tAssistance.page.DashBoard.dom.DashboardTableHeader();
	
	list.appendChild(header);
	
	for(i=0; i<dashboards.length;i++){
		var dashboard = dashboards[i];
		// add the computed information to the user
		
		var params = {
			"dashboard": dashboard,
			"config": config
		};
		
		var row = new tAssistance.page.DashBoard.dom.Dashboard(params);
		
		list.appendChild(row);
	}
	
	
	list_.appendChild(list);
	
	vars.list = list;
	
	var params = {
			"dashboards": dashboards,
			"config": config
	};
	
	var button = tAssistance.page.DashBoard.ctler.ButtonAddNew(params);
	
	list_.appendChild(button);
	
	return list_;
};

tAssistance.page.DashBoard.dom.DashboardTableHeader = function(){
	
	var header = document.createElement("div");
	$(header).css("display","table-row");
	
	var icon = document.createElement("div");
	$(icon).css("display","table-cell");
	
	var title = document.createElement("div");
	$(title).css("display","table-cell");
	$(title).css("padding","5px");
	title.innerHTML = "Name";
	
	var users =  document.createElement("div");
	$(users).css("display","table-cell");
	$(users).css("padding","5px");
	users.innerHTML = "Users";
	
	var docs =  document.createElement("div");
	$(docs).css("display","table-cell");
	$(docs).css("padding","5px");
	docs.innerHTML = "Documents";
	
	var creationDate =  document.createElement("div");
	$(creationDate).css("display","table-cell");
	$(creationDate).css("padding","5px");
	creationDate.innerHTML = "Creation Date";
	
	header.appendChild(icon);
	header.appendChild(title);
	header.appendChild(users);
	header.appendChild(docs);
	header.appendChild(creationDate);
	
	return header;
};

tAssistance.page.DashBoard.dom.Dashboard = function(params){
	
	function joinDocs(docs){
		
		var strings = [];
		
		for(var property in docs){
			var doc = docs[property];
			strings.push(doc.title);
		}
		return strings.join(",");
	};
	
	function joinUsers(users){
		
		var strings = [];
		
		for(var property in users){
			var user = users[property];
			strings.push(user.id);
		}
		return strings.join(",");
	};
	
	
	var dashboard = params.dashboard;
	var config = params.config;
	
	var row = document.createElement("div");
	$(row).css("display","table-row");
	
	var wraper = document.createElement("div");
	$(wraper).css("display","table-cell");	
	$(wraper).css("padding","3px");
	
	var icon = new tAssistance.dom.DashboardIcon();
	
	
	wraper.appendChild(icon);
	
	row.appendChild(wraper);
	
	var title = document.createElement("a");
	//title.setAttribute("href", as_user_uri);
	title.innerHTML = dashboard.id || "Tous";
	$(title).css("display","table-cell");
	$(title).css("padding","5px");
	row.appendChild(title);
	
	var users = document.createElement("a");
	//title.setAttribute("href", as_user_uri);
	
	users.innerHTML = dashboard.params.users===true ? "All" : joinUsers(dashboard.params.users);
	
	$(users).css("display","table-cell");
	$(users).css("padding","5px");
	row.appendChild(users);
	
	users.onclick = function(){
		
		var params = {
			"users": dashboard.params.users	
		};
		
		tAssistance.page.DashBoard.ctler.UsersDetail(params);
	};
	
	var docs = document.createElement("a");
	//title.setAttribute("href", as_user_uri);
	docs.innerHTML = dashboard.params.docs===true ? "All" : joinDocs(dashboard.params.docs).substr(0,50) ;
	$(docs).css("display","table-cell");
	$(docs).css("padding","5px");
	row.appendChild(docs);
	
	docs.onclick = function(){
		
		var params = {
			"docs": dashboard.params.docs	
		};
		
		tAssistance.page.DashBoard.ctler.DocsDetail(params);
	};
	
	var creationDate = document.createElement("a");
	creationDate.innerHTML = jQuery.timeago(new Date(dashboard.creationDate));
	$(creationDate).css("display","table-cell");
	$(creationDate).css("padding","5px");
	row.appendChild(creationDate);
	
	var status = document.createElement("div");
	$(status).css("display","table-cell");
	
	var checked = document.createElement("checkbox");
	
	if(config.selected==dashboard.id){
		status.appendChild(checked);
	}
	
	row.appendChild(status);
	
	$(row).hover(function(){
		$(this).css("background-color","orange");
	},function(){
		$(this).css("background-color","white");
	});
			
	return row;
};



tAssistance.page.DashBoard.ctler.ListSectionMaker = function(params){
	var dashboards = params.dashboards;
	var config = params.config;
	
	var section = tAssistance.dom.Section();
	
	var h1 = document.createElement("h3");
	h1.innerHTML = "Your dashboards";
	
	var params = {
		"dashboards": dashboards,
		"config": config,
	};
		
	var list = tAssistance.page.DashBoard.ctler.ListMaker(params);
		
	section.appendChild(h1);
	section.appendChild(list);
	
	return section;
};

tAssistance.page.DashBoard.ctler.CreatingSectionMaker = function(params){
	
	var modal = params.modal;
	
	var section = tAssistance.dom.Section();	
	
//	var h1 = document.createElement("h3");
//	h1.innerHTML = "Create a new dashboard";
//	
//	section.appendChild(h1);
	
	// load the data for docList
	var store = new tStore.OzaTStoreClient();	
	var url = store.getAllUsers();
	
	var self = this;
	
	jQuery.getJSON(url,function(data){
		
		var users = data;
		
		var params = {
			"users": users	
		};
		
		var list = tAssistance.page.DashBoard.UserListSection(params);
		section.replaceChild(list,section.querySelector("[placeholder='UserListSection']"));
		
	});
	
	// load the data for docList
	var store = new tStore.OzaTStoreClient();	
	var url = store.getAllDocs();
	
	jQuery.getJSON(url,function(data){
		
		var docs = data;
		
		var params = {
			"docs": docs	
		};
		
		var list = tAssistance.page.DashBoard.DocListSection(params);
		section.replaceChild(list,section.querySelector("[placeholder='DocListSection']"));
		
	});
	
	var placeholder = document.createElement("div");
	placeholder.setAttribute("placeholder","UserListSection");
	
	section.appendChild(placeholder);
	
	var placeholder = document.createElement("div");
	placeholder.setAttribute("placeholder","DocListSection");
	
	section.appendChild(placeholder);
	
	var name_title = document.createElement("h4");
	name_title.innerHTML = "Name";
	
	var name_controls = document.createElement("div");
	
	var name_input = tAssistance.dom.TextInput("");
	name_input.setAttribute("name","dashboard_id");
	name_controls.appendChild(name_input);
	
	section.appendChild(name_title);
	section.appendChild(name_controls);
	
	var params = {
		"section": section
	};
	
	var button = tAssistance.page.DashBoard.ctler.ButtonSave(params);
	
	var footer = modal.querySelector(".modal-footer");
	footer.insertBefore(button, footer.firstChild);
	
	return section;
};

//tAssistance.page.DashBoard.ctler.CreatingPopupMaker = function(params){
//	
//	
//	
//	
//};

tAssistance.page.DashBoard.ctler.ButtonAddNew = function(params){
	var button = tAssistance.dom.TextButton("New","btn_newdashboard");
	
	button.onclick = function(){
//		var article = tAssistance.page.DashBoard.ctler.CreatingSectionMaker(params);
//		document.querySelector("[placeholder='page']").appendChild(article);
		
		var modal = tAssistance.DashBoardModalMaker(params);
		$(modal).modal("show");
	};	
	
	return button;
};

tAssistance.page.DashBoard.ctler.ButtonSave = function(params){
	var section = params.section;
	
	var button = tAssistance.dom.TextButton("Save","btn_save");
	
	button.onclick = function(){
		
		var all_docs = section.querySelector("[name='all_docs']").checked;
		var all_users = section.querySelector("[name='all_users']").checked;
		
		var checked_docs = [];
		$(section).find('input[name="doc"]:checked').each(function() {
			checked_docs.push([$(this).attr('docid'),$(this).attr('doc_title')]);
		});
		
		var checked_users = [];
		$(section).find('input[name="user"]:checked').each(function() {
			checked_users.push($(this).attr('userid'));
		});
		
		var id = section.querySelector("[name='dashboard_id']").value;
		
		var params = {
			"all_doc": all_docs,
			"all_user": all_users,
			"docs": checked_docs,
			"users": checked_users,
			"id": id
		};
		
		alert("aaa");
		
		var new_dashboard = tAssistance.data.DashboardConfigMaker(params);
		
		var userconfig = new tAssistance.model.UserConfig({"userconfig": tAssistance.page.DashBoard.data.userconfig});
		userconfig.appendDashBoard(new_dashboard);
		var new_userconfig = userconfig.data();
		
		var params = {
			"after_update_userconfig": function(){
				alert("hello");			
			}	
		};
		
		var store = new tAssistance.Store(params);
		store.updateUserConfig(new_userconfig);
		
	};	
	
	return button;
};

tAssistance.page.DashBoard.ctler.UsersDetail = function(params){
	
	var users = params.users;
	
	var params = {
		"title"	: "User Detail"
	};
	
	var modal = tAssistance.dom.Modal(params);
	
	var body = modal.querySelector(".modal-body");
	
	var list = document.createElement("ul");
	
	for(var i in users){
		var user = users[i];
		
		var user_dom = document.createElement("li");
		user_dom.innerHTML = user.id;
		list.appendChild(user_dom);
	}
	
	body.innerHTML = "";
	body.appendChild(list);
	
	$(modal).modal("show");
};

tAssistance.page.DashBoard.ctler.DocsDetail = function(params){
	
	var docs = params.docs;
	
	var params = {
		"title"	: "Document Detail"
	};
	
	var modal = tAssistance.dom.Modal(params);
	
	var body = modal.querySelector(".modal-body");
	
	var list = document.createElement("ul");
	
	for(var i in docs){
		var doc = docs[i];
		
		var doc_dom = document.createElement("li");
		doc_dom.innerHTML = doc.title;
		list.appendChild(doc_dom);
	}
	
	body.innerHTML = "";
	body.appendChild(list);
	
	$(modal).modal("show");
};