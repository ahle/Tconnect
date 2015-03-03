	// make setting
	
	// make sidebar layout
	
//	var sidebar = new tAssistance.dom.SidebarLayout();
//	
//	document.body.appendChild(sidebar);
//	
//	// make 4 layout
//	var layout = new tAssistance.dom.Gird4Layout();
//	
//	sidebar.querySelector("div[name='right']").appendChild(layout);
//	
//	var setting = new tAssistance.OzaTimelineConfigMaker();
//	sidebar.querySelector("div[name='left']").appendChild(setting);	
//	
//	
//	
//	//var model = tAssistance.TraceModelMaker("ééé", trace.obsels);
//	
//	//var propertyList =  tAssistance.dom.PropertyList(model);
//	
//	//var listSelect = tAssistance.dom.ValueList(model[Object.keys(model)[2]].values);
//	
//	//var setting2 = new tAssistance.dom.OzaTimelineCondSetting("aaa2", propertyList);
//	//document.body.appendChild(setting2);
//	
//	var store = new tAssistance.Store();
//	store.getFilter("hoang", "velement1", function(filter){
//		
//		//var selector = {"properties": model};
//		
//		var setting2 = new tAssistance.FilterEditorMaker(filter);
//		layout.querySelector("div[name='top-right']").appendChild(setting2);
//		
//		var pfilter = filter.pfilters[0];
//		
//		var maker_in = {
//			"pfilter": pfilter,
//			"user_id": "hoang",
//			"velement_id": "velement1",
//			"pfilter_id": "pfilter1"
//		};
//		
//		var setting1 = new tAssistance.PFilterPanelMaker(maker_in);
//		layout.querySelector("div[name='bot-left']").appendChild(setting1);
//	});
//	
//	store.getUserById("hoang", function(user){
//		var velements = user.configs[0].velements;
//		
//		
//		var setting1 = new tAssistance.OzaVElementsEditorMaker(velements);
//		layout.querySelector("div[name='top-left']").appendChild(setting1);
//	});
//	
//	
//		
//	var setting3 = new tAssistance.dom.OzaIconSetting("aaa2");
//	layout.querySelector("div[name='bot-right']").appendChild(setting3);
//	
//	//var valueList = new tAssistance.ValueListEditorMaker();
//	
//	
//	//setting2.querySelector("td[name='td2']").appendChild(valueList);
//	// make model
//	
//	var store = new tStore.OzaTStoreClient();
//	var trace_uri = store.getTraceUri("t_all");
//	
//	
//	
//	jQuery.getJSON(trace_uri,function(data){
//		var trace = data;
//		
//		var model = [];		
//		
//		tAssistance.TraceModelMaker("ééé", trace.obsels);
//	});