tAssistance.T2Page = function(){
	
	//var controls = tAssistance.dom.DateTime();
	
	var layout = tAssistance.page.T2.dom.Layout();
	
	//var controls = tAssistance.dom.DateTime();
	
	var selected = tAssistance.page.T1.ctler.ConfigPicker();	
	
	var params = {
			"success": function(params){
				
				//params.panel = panel_body;
								
				var validation = tAssistance.page.T2.ctler.ValidationSection(params);
				
				var wordlist = tAssistance.page.T2.ctler.WordListSection(params);
				
				var correctionlist = tAssistance.page.T2.ctler.CorrectionListSection();
				
				var modalityList = tAssistance.page.T2.ctler.ModalityListSection();
				
				var histogram = tAssistance.page.T2.ctler.WordHistogramSection();
				
			},
			"page": tAssistance.page.T2
	};
		
	var chart = tAssistance.page.T1.ctler.TraceLoader(params);
	
	
};

tAssistance.page.T2 = {
	"model": {},
	"dom": {},
	"ctler": {},
	"data": {}
};

tAssistance.page.T2.ctler.ValidationSection = function(params){
	
	var page = document.body.querySelector("[placeholder='validation']");
	$(page).empty();
	
	var trace = tAssistance.page.T2.data.trace;
	
	var params = {
		"title": "Dated Validations"	
	};
	
	var panel = tAssistance.dom.Panel(params);
	$(panel).css("width","400px");
	$(panel).css("display","inline-block");
	
	var panel_body = panel.querySelector(".panel-body");
	$(panel_body).css("height","300px");
	
	page.appendChild(panel);
	
	var params = {
			"panel": panel_body,
			"trace": trace,
			//"width": 300,
			//"height": 250
		};
		
	var list = tAssistance.page.T2.ctler.ValidationListMaker(params);
	
};

tAssistance.page.T2.ctler.WordListSection = function(params){
	
	var page = document.body.querySelector("[placeholder='word']");
	$(page).empty();
	
	var trace = tAssistance.page.T2.data.trace;
	
	var params = {
		"title": "Validated Word List"	
	};
	
	var panel = tAssistance.dom.Panel(params);
	$(panel).css("width","400px");
	//$(panel).css("display","inline-block");
	
	var panel_body = panel.querySelector(".panel-body");
	//$(panel_body).css("height","300px");
	
	page.appendChild(panel);
	
	var params = {
			"panel": panel_body,
			"trace": trace,
			//"width": 300,
			//"height": 250
		};
		
	var list = tAssistance.page.T2.ctler.WordListMaker(params);
	
};

tAssistance.page.T2.ctler.ValidationListMaker = function(params){
	
	var panel = params.panel;
	var trace = params.trace;
	var obsels = trace.obsels;
	
	var table = document.createElement("table");
	table.setAttribute("class","display");
	table.setAttribute("cellspacing","0");
	table.setAttribute("width","100%");
	
	var thead = document.createElement("thead");
	table.appendChild(thead);
	
	var tr = document.createElement("tr");
	thead.appendChild(tr);
	
	var th =  document.createElement("th");
	th.innerHTML = "Date";
	tr.appendChild(th);
	
	var th =  document.createElement("th");
	th.innerHTML = "Validation";
	tr.appendChild(th);
	
	var tbody  = document.createElement("tbody");
	table.appendChild(tbody);
	
	for(var i in obsels){
		
		var obsel =  obsels[i];
		if (obsel.type!="ozev_w") continue;
		
		var params = {
			"obsel": obsels[i]
		};
		
		var row = tAssistance.page.T2.dom.ValidationRow(params);
		tbody.appendChild(row);
	}	
	
	panel.appendChild(table);
	
	$(table).DataTable({
		pageLength: 5,
		searching: false,
		lengthChange: false,
		pagingType: "simple"
	});	
};

tAssistance.page.T2.dom.ValidationRow = function(params){
	
	var obsel = params.obsel;
	
	var row = document.createElement("tr");
	
	var td1 =  document.createElement("td");
	
	row.appendChild(td1);
	
	td1.innerHTML = (new Date(obsel.begin)).toLocaleString();
	
	var td2 =  document.createElement("td");
	
	row.appendChild(td2);
		
	var text = obsel.info_rfW + "(" + obsel.info_text;
	
	if(obsel.info_before){
		text+= "," + obsel.info_before + "=>" + obsel.after;
	}
	
	text+= ")";
	
	td2.innerHTML = text;
	
	row.appendChild(td2);
	
	return row;	
};

tAssistance.page.T2.ctler.WordListMaker = function(params){
	
	var panel = params.panel;
	var trace = params.trace;
	var obsels = trace.obsels;
	
	var table = document.createElement("table");
	table.setAttribute("class","display");
	table.setAttribute("cellspacing","0");
	table.setAttribute("width","100%");
	
	var thead = document.createElement("thead");
	table.appendChild(thead);
	
	var tr = document.createElement("tr");
	thead.appendChild(tr);
	
	var th =  document.createElement("th");
	th.innerHTML = "Word";
	th.setAttribute("title", "AltoID IndexPage WordRef");
	tr.appendChild(th);
	
	var th =  document.createElement("th");
	th.innerHTML = "Validated Text";
	tr.appendChild(th);
	
	var tbody  = document.createElement("tbody");
	table.appendChild(tbody);
	
	for(var i in obsels){
		
		var obsel =  obsels[i];
		if (obsel.type!="ozev_w") continue;
		
		var params = {
			"obsel": obsels[i]
		};
		
		var row = tAssistance.page.T2.dom.WordRow(params);
		tbody.appendChild(row);
	}	
	
	panel.appendChild(table);
	
	$(table).DataTable({
		pageLength: 5,
		searching: false,
		lengthChange: false,
		pagingType: "simple"
	});	
};

tAssistance.page.T2.ctler.CorrectionListSection = function(params){
	
	var page = document.body.querySelector("[placeholder='correction']");
	
	var params = {
		"title": "Correction List"	
	};
	
	var panel = tAssistance.dom.Panel(params);
	$(panel).css("width","400px");	
	//$(panel).css("display","inline-block");
	
	var panel_body = panel.querySelector(".panel-body");
	//$(panel_body).css("height","300px");
	
	page.appendChild(panel);
	
	var params = {
			"panel": panel_body,
			"trace": trace,
			//"width": 300,
			//"height": 250
		};
		
	var list = tAssistance.page.T2.ctler.CorrectionListMaker(params);
};

tAssistance.page.T2.ctler.CorrectionListMaker = function(params){
	
	var panel = params.panel;
	var trace = params.trace;
	var obsels = trace.obsels;
	
	var table = document.createElement("table");
	table.setAttribute("class","display");
	table.setAttribute("cellspacing","0");
	table.setAttribute("width","100%");
	
	var thead = document.createElement("thead");
	table.appendChild(thead);
	
	var tr = document.createElement("tr");
	thead.appendChild(tr);
	
	var th =  document.createElement("th");
	th.innerHTML = "Word";
	tr.appendChild(th);
	
	var th =  document.createElement("th");
	th.innerHTML = "Correction";
	tr.appendChild(th);
	
	var tbody  = document.createElement("tbody");
	table.appendChild(tbody);
	
	for(var i in obsels){
		
		var obsel =  obsels[i];
		if (obsel.type!="ozec_w") continue;
		
		var params = {
			"obsel": obsels[i]
		};
		
		var row = tAssistance.page.T2.dom.CorrectionRow(params);
		tbody.appendChild(row);
	}	
	
	panel.appendChild(table);
	
	$(table).DataTable({
		pageLength: 5,
		searching: false,
		lengthChange: false,
		pagingType: "simple"
	});	
};

tAssistance.page.T2.dom.WordRow = function(params){
	
	var obsel = params.obsel;
	
	var row = document.createElement("tr");
	
	var td1 =  document.createElement("td");
	
	row.appendChild(td1);
	
	//td1.innerHTML = obsel.altoID + " " + obsel.indPage + " " + obsel.info_rfW;
	var image = document.createElement("img");
	image.src = "http://localhost/tconnect/project/Ozalid/TStore/db/img/ajouter.jpg";
	
	td1.appendChild(image);
	
	var td2 =  document.createElement("td");
	
	row.appendChild(td2);
		
	var text = obsel.info_text;
	
	td2.innerHTML = text;
	
	row.appendChild(td2);
	
	return row;	
};

tAssistance.page.T2.dom.CorrectionRow = function(params){
	
	var obsel = params.obsel;
	
	var row = document.createElement("tr");
	
	var td1 =  document.createElement("td");
	
	row.appendChild(td1);
	
	//td1.innerHTML = obsel.altoID + " " + obsel.indPage + " " + obsel.info_rfW;
	
	var image = document.createElement("img");
	image.src = "http://localhost/tconnect/project/Ozalid/TStore/db/img/ajouter.jpg";
	
	td1.appendChild(image);
	
	var td2 =  document.createElement("td");
	
	row.appendChild(td2);
		
	var text = obsel.info_text;

	if(obsel.info_before){
		text = "" + obsel.info_before + "=>" + obsel.info_after;
	}
	else if(obsel.info_text){
		text = "" + obsel.info_text + " => " + obsel.info_style;
	}
	
	td2.innerHTML = text;
	
	row.appendChild(td2);
	
	return row;	
};

tAssistance.page.T2.ctler.ModalityListSection = function(params){
	
	var page = document.body.querySelector("[placeholder='page']");
	var trace = tAssistance.page.T2.data.trace;
	
	var params = {
		"title": "Modality List"
	};
	
	var panel = tAssistance.dom.Panel(params);
	$(panel).css("width","400px");
	$(panel).css("display","inline-block");
	
	var panel_body = panel.querySelector(".panel-body");
	$(panel_body).css("height","300px");
	
	page.appendChild(panel);
		
	
	
	var params = {
		"panel": panel_body,
		"trace": trace
	};
	
	var bar = tAssistance.page.T2.dom.HorizonBar(params);
};

tAssistance.page.T2.dom.HorizonBar = function(params){
	var panel = params.panel;
	var data = params.data;
	
	var placeholder = document.createElement("div");
	$(placeholder).css("width","100%");
	$(placeholder).css("height","100%");
	//placeholder.innerHTML = "12";
	
	panel.appendChild(placeholder);
	
	var data = [ [10, 0], [8, 1], [4, 2], [13, 3],  [13, 4]];

	var ticks = [ [0, "text"], [1, "page"], [2, "line"], [3, "page-text"],  [4, "para"]];
	
	$.plot(placeholder, [ data ], {
		series: {
			bars: {
				show: true,
				barWidth: 0.4,
				align: "center",
				horizontal: true
			}
		},
		xaxis: {
			tickDecimals: 0,
			tickLength: 0
		},
		yaxis: {
			
			ticks: ticks,
			tickLength: 0
		},
		grid: {
	        hoverable: true,
	        clickable: true
	    }
	});	
}

tAssistance.page.T2.ctler.WordHistogramSection = function(params){
	
	var page = document.body.querySelector("[placeholder='page']");
	
	var params = {
		"title": "Word Histogram"
	};
	
	var panel = tAssistance.dom.Panel(params);
	$(panel).css("width","600px");
	$(panel).css("display","inline-block");
	
	page.appendChild(panel);
	
//	var panel_body = panel.querySelector(".panel-body");
//	$(panel_body).css("height","300px");
//	$(panel_body).css("width","100%");
//	$(panel_body).css("display","table");
	
//	var row = document.createElement("div");
//	$(row).css("width","100%");
//	$(row).css("height","100%");
//	$(row).css("display","table-row");
	
//	panel_body.appendChild(row);
		
	var params = {
			"panel": panel,
			"page": tAssistance.page.T2,
			"success": function(params){
				
				params.panel = panel;
				params.trace = tAssistance.page.T2.data.trace;
				
				//var bar = tAssistance.page.T2.ctler.WordBarMaker(params);
				
				var bar = tAssistance.page.T2.ctler.AllWordBarMaker(params);
			}
	};
	
	var loader = tAssistance.page.T1.ctler.TraceLoader(params);
	
	
};

tAssistance.page.T2.ctler.WordBarMaker = function(params){
	
	var panel = params.panel;
	var word = params.word;
	var words = params.words;
	
	var placeholder = document.createElement("div");
	$(placeholder).css("width","150px");
	$(placeholder).css("height","100%");
	$(placeholder).css("display","inline-block");
	
	panel.appendChild(placeholder);
	
	var data = [ [1, 10] ];

	
	$.plot(placeholder, data, {
		series: {
			bars: {
				show: true,
				barWidth: 0.6,
				align: "center",
				label: {
					show: true
				}
			}
		},
		xaxis: {
			//mode: "categories",
			tickLength: 0
		},
		yaxis: {
			tickDecimals: 0,
		},
		grid: {
	        hoverable: true,
	        clickable: true
	    }
	});
};

tAssistance.page.T2.ctler.AllWordBarMaker = function(params){
	
	var panel = params.panel;
	var trace = params.trace;
	//var words = params.words;
	
	var placeholder = document.createElement("div");
	$(placeholder).css("width","400px");
	$(placeholder).css("height","300px");
	//$(placeholder).css("display","inline-block");
	
	panel.appendChild(placeholder);
	
	var data = tAssistance.page.T2.ctler.AllWordStatsMaker({trace: trace});
	
	//var data = [ ["1", 10], ["2", 14]];

	
	$.plot(placeholder, [ data ], {
		series: {
			bars: {
				show: true,
				barWidth: 0.6,
				align: "center",
				label: {
					show: true
				}
			}
		},
		xaxis: {
			mode: "categories",
			tickLength: 0
		},
//		yaxis: {
//			tickDecimals: 0,
//		},
		grid: {
	        hoverable: true,
	        clickable: true
	    }
	});
};

tAssistance.page.T2.ctler.WordStatsMaker = function(params){
	var trace = params.trace;
	var word = params.word;
	
	var counter = 0;
	for(var i in obsels){
		
		var obsel =  obsels[i];
		if (obsel.type=="ozec_w" && obsel.word_id==word.id){
			counter++;
		}
	}	
	
	return {
		"word": word, 
		"count": counter
	};
};

tAssistance.page.T2.ctler.AllWordStatsMaker = function(params){
	var trace = params.trace;
	var obsels = trace.obsels;
	//var word = params.word;
	
	var groups = {};
		
	for(var i in obsels){
		
		var obsel =  obsels[i];
		if (obsel.type=="ozec_w"){
			var word_id = obsel.altoID + " " + obsel.indPage + " " + obsel.info_rfW;
			
			if(groups[word_id]==null){
				groups[word_id]=1;
			}else{
				groups[word_id]+=1;
			}
		}
	}
	
	var data = [];
	
	
	for(var i in groups){
		var word_id = i;
		var count = groups[i];
		data.push([word_id, count]);
	}
	
	return data;
};


tAssistance.page.T2.dom.Layout = function(params){
	var page = document.body.querySelector("[placeholder='page']");
	
	var breadcrumb = document.createElement("div");
	breadcrumb.setAttribute("placeholder","breadcrumb");
	
	page.appendChild(breadcrumb);
	
	var controls = document.createElement("div");
	controls.setAttribute("placeholder","controls");
	
	page.appendChild(controls);
	
	var widgets = document.createElement("div");
	widgets.setAttribute("placeholder","widgets");
	
	var validation = document.createElement("div");
	validation.setAttribute("placeholder","validation");
	$(validation).css("display","inline-block");
	widgets.appendChild(validation);
	
	var word = document.createElement("div");
	word.setAttribute("placeholder","word");
	$(word).css("display","inline-block");
	widgets.appendChild(word);
	
	var correction = document.createElement("div");
	correction.setAttribute("placeholder","correction");
	$(correction).css("display","inline-block");
	widgets.appendChild(correction);
	
	var modality = document.createElement("div");
	modality.setAttribute("placeholder","modality");
	$(modality).css("display","inline-block");
	widgets.appendChild(modality);
	
	var histogram = document.createElement("div");
	histogram.setAttribute("placeholder","histogram");	
	$(histogram).css("display","inline-block");
	widgets.appendChild(histogram);
	
	page.appendChild(widgets);
	
};