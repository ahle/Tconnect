tAssistance.dom.OzaTextObsel = function(params){
	var id = params.id;
	var src_obsel = params.obsel;
	
	// properties and events for the object controller
	this.src_obsel = src_obsel;
	//this.parent = parent;
	this.id = id;
	this.type="obsel";
	
	var type2text = {
		"oze_idg": "opened a dialog",
		"ozec_w": "correct a word",
		"oze_view": " opened a view",
		"ozev_w": "validate a word",
		"oze_subview": "open a subview",
		"ozem_fn": "do a function"
	}
		
	var textObsel = document.createElement('div');
	textObsel.setAttribute("data-id", id);
	
	var beforeTitle = "",
		afterTitle = " <a data-less='[Less]' data-more='[More]'>[More]</a>",
		beforeDetail = "<p name='detail' style='display:none'>",
		afterDetail = "</p>",
		obselTitle = "",
		details = "";
	
	var begin,
		end,
		type,
		idDoc,
		idPage,
		before,
		after,
		titleDoc,
		alto_id,
		ind_page,
		info_xywh,
		userAgent,
		tv,
		v,
		request,
		pageSelected,
		author,
		pageNb,
		numPage,
		rfW,
		nbdocs,
		idview,
		button,
		goidview,
		info_idpage,
		info_idDoc,
		info_text,
		idsubview,
		label,
		info_text,
		status,
		correctionCount,
		corrected_style;
		
	var pageUri = "#",
		docUri = "#";
	
	var type = src_obsel.type;
	
//	for(var p in src_obsel) {
////		if(src_obsel.hasOwnProperty(p)){
////	    	value = src_obsel[p];
////	    	// presentation logic for the obsel
////	    	if(p=="begin"){
////				date = new Date(value);
////				parts = tAssistance.Datetime.split(date);
////				pText = "Begin";
////				valueText = parts["hh"]+":"+parts["ii"]+":"+parts["ss"]+" on "+parts["DD"]+" "+parts["dd"]+"/"+parts["MM"]+"/"+parts["yyyy"];
////				valueText = parts["hh"]+":"+parts["ii"]+":"+parts["ss"]+" on "+parts["dd"]+"/"+parts["M"]+"/"+parts["yy"];
////				begin = valueText;
////			}
////	    	else if(p=="end"){
////	    		date = new Date(value);
////	    		parts = tAssistance.Datetime.split(date);
////				pText = "End";
////				valueText = parts["hh"]+":"+parts["ii"]+":"+parts["ss"]+" on "+parts["DD"]+" "+parts["dd"]+"/"+parts["M"]+"/"+parts["yy"];
////				end = valueText;
////			}
////	    	else if(p=="type"){
////	    		ptext = "Type";
////	    		valueText = type2text[value];
////	    		type = value;
////	    		typeText = valueText;
////			}
////			else if(p=="idSession"){
////				ptext = "ID Session";
////	    		valueText = value;
////	    		idSession = valueText;
////			}
////			else if(p=="idDoc"){
////				ptext = "ID Document";
////	    		valueText = value;
////	    		idDoc = valueText;
////			}
////			else if(p=="altoID"){
////				ptext = "Alto ID";
////	    		valueText = value;
////	    		alto_id = valueText;
////			}
////			else if(p=="idPage"){
////				ptext = "ID Page";
////	    		valueText = value;
////	    		idPage = valueText;
////			}
////			else if(p=="indPage"){
////				ptext = "Page Index";
////	    		valueText = value;
////	    		ind_page = valueText;
////			}
////			else if(p=="info_before"){
////				ptext = "Before";
////	    		valueText = value;
////	    		before = valueText;
////			}
////			else if(p=="info_after"){
////				ptext = "After";
////	    		valueText = value;
////	    		after = valueText;
////			}
////			else if(p=="user"){
////				ptext = "User";
////	    		valueText = value;
////	    		user = valueText;
////			}
////			else if(p=="info_titleDoc"){
////				ptext = "Document Title";
////	    		valueText = value;
////	    		titleDoc = valueText;
////			}
////			else if(p=="info_userAgent"){
////				ptext = "User Agent";
////	    		valueText = value;
////	    		userAgent = valueText;
////			}
////			else if(p=="info_tv"){
////				ptext = "TV";
////	    		valueText = value;
////	    		tv = valueText;
////			}
////			else if(p=="info_v"){
////				ptext = "V";
////	    		valueText = value;
////	    		v = valueText;
////			}
////			else if(p=="info_request"){
////				ptext = "Request";
////	    		valueText = value;
////	    		request = valueText;
////			}
////			else if(p=="info_pageSelected"){
////				ptext = "Selected Page";
////	    		valueText = value;
////	    		selectedPage = valueText;
////			}
////			else if(p=="info_author"){
////				ptext = "Author";
////	    		valueText = value;
////	    		author = valueText;
////			}
////			else if(p=="m:info_pageNb"){
////				ptext = "Page Number";
////	    		valueText = value;
////	    		pageNb = valueText;
////			}
////			else if(p=="info_numPage"){
////				ptext = "Number Page";
////	    		valueText = value;
////	    		numPage = valueText;
////			}
////			else if(p=="info_rfW"){
////				ptext = "Reference Word";
////	    		valueText = value;
////	    		rfW = valueText;
////			}
////			else if(p=="info_xywh"){
////				ptext = "XYWH Word";
////	    		valueText = value;
////	    		info_xywh = valueText;
////			}
////			else if(p=="info_nbdocs"){
////				ptext = "Number of documents";
////	    		valueText = value;
////	    		nbdocs = valueText;
////			}
////			else if(p=="info_idview"){
////				ptext = "View ID";
////	    		valueText = value;
////	    		idview = valueText;
////			}
////			else if(p=="info_idsubview"){
////				ptext = "Subview ID";
////	    		valueText = value;
////	    		idsubview = valueText;
////			}
////			else if(p=="info_button"){
////				ptext = "Button";
////	    		valueText = value;
////	    		button = valueText;
////			}
////			else if(p=="info_goidview"){
////				ptext = "Go ID View";
////	    		valueText = value;
////	    		goidview = valueText;
////			}
////			else if(p=="info_idPage"){
////				ptext = "Number Page";
////	    		valueText = value;
////	    		info_idPage = valueText;
////			}
////			else if(p=="info_idDoc"){
////				ptext = "Number Page";
////	    		valueText = value;
////	    		info_idDoc = valueText;
////			}
////			else if(p=="info_label"){
////				ptext = "Number Page";
////	    		valueText = value;
////	    		label = valueText;
////			}
////			else if(p=="info_text"){
////				ptext = "Number Page";
////	    		valueText = value;
////	    		info_text = valueText;
////			}
////			else if(p=="info_status"){
////				ptext = "Number Page";
////	    		valueText = value;
////	    		status = valueText;
////			}
////			else if(p=="info_style"){
////				ptext = "Corrected Style";
////	    		valueText = value;
////	    		corrected_style = valueText;
////			}
////			else if(p=="info_text"){
////				ptext = "Text";
////	    		valueText = value;
////	    		info_text = valueText;
////			}
////			else if(p=="info_correctionCount"){
////				ptext = "Number Page";
////	    		valueText = value;
////	    		correctionCount = valueText;
////			}
////			else{
////				
////			}
//	    }	        
//	}// end loop all properties
	
	//  
	
	
	
	
	
	
	
	
	
	// complete text
	
	if(type=="oze_idg"){
		textObsel = tAssistance.dom.OzaObsel.OpenDialog(src_obsel);
	}
	else if(type=="oze_view"){
		textObsel = tAssistance.dom.OzaObsel.OpenView(src_obsel);
	}
	else if(type=="ozec_w"){
//		obselTitle = "At "+begin+", the user (id="+user+") <span style='color:#CCCC00'>"+typeText+"</span> from [<span style='color:red'>"+before+"</span>] to [<span style='color:red'>"+after+"</span>]";
//		details= "<span class='textobsel-attr'>Page Link</span>: <a href='"+pageUri+"'>Go to the page</a> <br/>";
//		details+= "<span class='textobsel-attr'>Corrected Word</span>: <div id=\"word"+(new Date).getTime()+""+Math.floor((Math.random()*100))+"\" class=\"word\" data='"+alto_id+","+ind_page+","+rfW+","+info_xywh+"'></div><br/>";
//		details+= "<span class='textobsel-attr'>Before</span>: "+before+"<br/>";
//		details+= "<span class='textobsel-attr'>After</span>: "+after+"<br/>";
//		details+= "<span class='textobsel-attr'>Corrected Style</span>: "+corrected_style+"<br/>";
//		details+= "<span class='textobsel-attr'>Text</span>: "+info_text+"<br/>";
		textObsel = tAssistance.dom.OzaObsel.Correction(src_obsel);
	}
	else if(type=="oze_subview"){
		textObsel = tAssistance.dom.OzaObsel.Subview(src_obsel);	
	}
	else if(type=="ozev_w"){
		textObsel = tAssistance.dom.OzaObsel.Validation(src_obsel);	
	}
	else if(type=="ozem_fn"){
		textObsel = tAssistance.dom.OzaObsel.Fn(src_obsel);	
	}
	else{
		textObsel = tAssistance.dom.OzaObsel.Defaut(src_obsel);	
	}
	
	//html = beforeTitle+obselTitle+afterTitle+beforeDetail+details+afterDetail;
	
	//textObsel.innerHTML = html;
		
	
	
	//var obsel = this;
	//textObsel.onclick = function(){
	//	obsel.click();
	//};
	// add word-image
//	var word_div = textObsel.querySelector("div.word");
//	if(word_div){	
//	    //console.log(word_div);
//		var data = word_div.getAttribute("data");
//		var word_container = word_div.getAttribute("id");
//		var list = data.split(",");
//		
//		var doc = {
//			altoId : list[0]
//		};
//		var page = {
//			indPage : (parseInt(list[1])+1).toString()
//		};
//		var refW = parseInt(list[2]);
//		var word = {
//			x : parseInt(list[3]),
//			y : parseInt(list[4]),
//			w : parseInt(list[5]),
//			h : parseInt(list[6])			
//		};
//	
//		
//		//instance d'un objet BlockImageCorrecT
//		  var block = Object.create(BlockImageCorrecT);
//		  
//		  //on initialise l'instance avec une valeur de zoom 
//		  block.init({
//		    deltaZoomView: -1  // zoom = image Haute Définition
//		  });
//		  
//		  //on initialise l'instance avec informations du document/page 
//		  block.getInfoTiles({
//		    altoId : doc.altoId,
//		    indPage :  page.indPage,
//		    callback : manageText // 'manageText' est une fonction callback appelée lorsque la connection au serveur d'image est prête 
//		  });
//		  
////		  var new_b = block.addMarge(
////				    {
////				      x: word.x,
////				      y: word.y,
////				      w: word.w,
////				      h: word.h,
////				    }, 2);  // marge de 2 px
//		  
//		  //La connection au serveur d'image est prête
//		  function manageText() {
//		      //ajoute le dessin du bloc 'word' au conteneur de id='word', et d'index '1'     
//			  block.addImage({
//		        container : word_container,
//		        idWord: (new Date()).getTime(),
//		        block: word
//		      });
//		  }
//		
//		
//	}
	
	
	
	return textObsel;
};

tAssistance.TraceModel = {};

tAssistance.TraceModel.Oza = {
	"text": {}
};

tAssistance.TraceModel.Oza.text = {
	"oze_idg": "opened a dialog",
	"ozec_w": "correct a word",
	"oze_view": " opened a view",
	"ozev_w": "validate a word",
	"oze_subview": "open a subview",
	"ozem_fn": "do a function",
	"idSession": "ID Session",
	"idDoc": "Document ID",
	"altoID": "Alto ID",
	"idPage": "Page ID",
	"indPage": "Page Index",
	"info_before": "Before",
	"info_after": "After",
	"user": "User",
	"info_titleDoc": "Document Title",
	"info_userAgent": "User Agent",
	"info_tv": "TV",
	"info_v": "View",
	"info_request": "Request",
	"info_pageSelected": "Selected Page",
	"info_author": "Author",
	"m:info_pageNb": "Number of Pages",
	"info_numPage": "Page Number",
	"info_rfW": "Word Reference",
	"info_xywh": "XYWH of Block",
	"info_idview": "View ID", 
	"info_nbdocs": "Number of documents",
	"info_idsubview": "Subview ID",
	"info_button": "Button",
	"info_goidview": "Go ID View",
	"info_idPage": "Number Page",
	"info_idDoc": "Document ID",
	"info_label": "Label",
	"info_text": "Text",
	"info_status": "Status",
	"info_style": "Corrected Style",
	"info_correctionCount": "Correction Count"	
};

tAssistance.dom.OzaObsel = {};

tAssistance.dom.OzaObsel.OpenDialog = function(obsel){
	
	var layout = tAssistance.dom.OzaTextObselLayout();
	
	var begin_holder = layout.querySelector(".obselbegin");
	var type_holder = layout.querySelector(".obseltype");
	var user_holder = layout.querySelector(".obseluser");
	var attr_list = layout.querySelector(".attr_list");
	
	// deconnection
	
	begin_holder.innerHTML = moment(obsel.begin).format("MMMM Do YY, h:mm a");
	type_holder.innerHTML = tAssistance.TraceModel.Oza.text[obsel.type];
	user_holder.innerHTML = obsel.user;
	
	if(obsel.info_request=="deconnection"){
		var prop_row = tAssistance.dom.PropertyLayout();
		
		var prop_holder = prop_row.querySelector(".obsel_prop");
		var value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_request"];
		value_holder.innerHTML = obsel.info_request;
		
		attr_list.appendChild(prop_row);
	}
	else{// connection
		var prop_row = tAssistance.dom.PropertyLayout();
		
		var prop_holder = prop_row.querySelector(".obsel_prop");
		var value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_tv"];
		value_holder.innerHTML = obsel.info_tv;
		
		attr_list.appendChild(prop_row);
		
		prop_row = tAssistance.dom.PropertyLayout();
		
		prop_holder = prop_row.querySelector(".obsel_prop");
		value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_userAgent"];
		value_holder.innerHTML = obsel.info_userAgent;
		
		attr_list.appendChild(prop_row);
		
		prop_row = tAssistance.dom.PropertyLayout();
		
		prop_holder = prop_row.querySelector(".obsel_prop");
		value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_v"];
		value_holder.innerHTML = obsel.info_v;
		
		attr_list.appendChild(prop_row);
		
	}
	
	return layout;
};

tAssistance.dom.OzaObsel.OpenView = function(obsel){
	
	var layout = tAssistance.dom.OzaTextObselLayout();
	
	var begin_holder = layout.querySelector(".obselbegin");
	var type_holder = layout.querySelector(".obseltype");
	var user_holder = layout.querySelector(".obseluser");
	var attr_list = layout.querySelector(".attr_list");
	
	begin_holder.innerHTML = moment(obsel.begin).format("MMMM Do YY, h:mm a");
	type_holder.innerHTML = tAssistance.TraceModel.Oza.text[obsel.type];
	user_holder.innerHTML = obsel.user;
	
	var request = obsel.info_request;
	
	var prop_row = tAssistance.dom.PropertyLayout();
	
	var prop_holder = prop_row.querySelector(".obsel_prop");
	var value_holder = prop_row.querySelector(".obsel_value");
	
	prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_request"];
	value_holder.innerHTML = obsel.info_request;
	
	attr_list.appendChild(prop_row);
	
	if(request=="vue page"){
		// selected page
		var prop_row = tAssistance.dom.PropertyLayout();
		
		var prop_holder = prop_row.querySelector(".obsel_prop");
		var value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_pageSelected"];
		value_holder.innerHTML = obsel.info_pageSelected;
		
		attr_list.appendChild(prop_row);
		
		// tv
		
		var prop_row = tAssistance.dom.PropertyLayout();
		
		var prop_holder = prop_row.querySelector(".obsel_prop");
		var value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_tv"];
		value_holder.innerHTML = obsel.info_tv;
		
		attr_list.appendChild(prop_row);		
	}
	else if(request=="ws/sec/doc"){
		// info_titleDoc
		var prop_row = tAssistance.dom.PropertyLayout();
		
		var prop_holder = prop_row.querySelector(".obsel_prop");
		var value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_titleDoc"];
		value_holder.innerHTML = obsel.info_titleDoc;
		
		attr_list.appendChild(prop_row);
		
		// info_author
		
		var prop_row = tAssistance.dom.PropertyLayout();
		
		var prop_holder = prop_row.querySelector(".obsel_prop");
		var value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_author"];
		value_holder.innerHTML = obsel.info_author;
		
		attr_list.appendChild(prop_row);	
		
		// info_numPage
		
		var prop_row = tAssistance.dom.PropertyLayout();
		
		var prop_holder = prop_row.querySelector(".obsel_prop");
		var value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_numPage"];
		value_holder.innerHTML = obsel.info_numPage;
		
		attr_list.appendChild(prop_row);
	}
	else if(request=="ws/sec/docs"){
		
		// info_idview
		var prop_row = tAssistance.dom.PropertyLayout();
		
		var prop_holder = prop_row.querySelector(".obsel_prop");
		var value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_idview"];
		value_holder.innerHTML = obsel.info_idview;
		
		attr_list.appendChild(prop_row);
		
		// info_nbdocs
		
		var prop_row = tAssistance.dom.PropertyLayout();
		
		var prop_holder = prop_row.querySelector(".obsel_prop");
		var value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_nbdocs"];
		value_holder.innerHTML = obsel.info_nbdocs;
		
		attr_list.appendChild(prop_row);		
	}
	else if(request=="ws/sec/page"){
		
		// info_titleDoc
		var prop_row = tAssistance.dom.PropertyLayout();
		
		var prop_holder = prop_row.querySelector(".obsel_prop");
		var value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_titleDoc"];
		value_holder.innerHTML = obsel.info_titleDoc;
		
		attr_list.appendChild(prop_row);
		
		// info_author
		
		var prop_row = tAssistance.dom.PropertyLayout();
		
		var prop_holder = prop_row.querySelector(".obsel_prop");
		var value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_author"];
		value_holder.innerHTML = obsel.info_author;
		
		attr_list.appendChild(prop_row);
		
		// info_numPage
		
		var prop_row = tAssistance.dom.PropertyLayout();
		
		var prop_holder = prop_row.querySelector(".obsel_prop");
		var value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_numPage"];
		value_holder.innerHTML = obsel.info_numPage;
		
		attr_list.appendChild(prop_row);
		
	}
	else if(request=="retour sommaire"){
		// tv
		
		var prop_row = tAssistance.dom.PropertyLayout();
		
		var prop_holder = prop_row.querySelector(".obsel_prop");
		var value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_tv"];
		value_holder.innerHTML = obsel.info_tv;
		
		attr_list.appendChild(prop_row);		
	}
	else if(request=="deconnection"){
		
	}
	else if(obsel.info_button){
		// info_button
		var prop_row = tAssistance.dom.PropertyLayout();
		
		var prop_holder = prop_row.querySelector(".obsel_prop");
		var value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_button"];
		value_holder.innerHTML = obsel.info_button;
		
		attr_list.appendChild(prop_row);
		
		// info_goidview
		
		var prop_row = tAssistance.dom.PropertyLayout();
		
		var prop_holder = prop_row.querySelector(".obsel_prop");
		var value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_goidview"];
		value_holder.innerHTML = obsel.info_goidview;
		
		attr_list.appendChild(prop_row);
		
		// info_idPage
		
		var prop_row = tAssistance.dom.PropertyLayout();
		
		var prop_holder = prop_row.querySelector(".obsel_prop");
		var value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_idPage"];
		value_holder.innerHTML = obsel.info_idPage;
		
		attr_list.appendChild(prop_row);		
	}
	
	return layout;
};

tAssistance.dom.OzaObsel.Correction = function(obsel){
	
	var layout = tAssistance.dom.OzaTextObselLayout();
	
	var begin_holder = layout.querySelector(".obselbegin");
	var type_holder = layout.querySelector(".obseltype");
	var user_holder = layout.querySelector(".obseluser");
	var attr_list = layout.querySelector(".attr_list");

	
	begin_holder.innerHTML = moment(obsel.begin).format("MMMM Do YY, h:mm a");
	type_holder.innerHTML = tAssistance.TraceModel.Oza.text[obsel.type];
	user_holder.innerHTML = obsel.user;
		
	var prop_row = tAssistance.dom.PropertyLayout();
	
	var prop_holder = prop_row.querySelector(".obsel_prop");
	var value_holder = prop_row.querySelector(".obsel_value");
	
	prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_rfW"];
	value_holder.innerHTML = obsel.info_rfW;
	
	attr_list.appendChild(prop_row);
	
	prop_row = tAssistance.dom.PropertyLayout();
	
	prop_holder = prop_row.querySelector(".obsel_prop");
	value_holder = prop_row.querySelector(".obsel_value");
	
	prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_before"];
	value_holder.innerHTML = obsel.info_before;
	
	attr_list.appendChild(prop_row);
	
	prop_row = tAssistance.dom.PropertyLayout();
	
	prop_holder = prop_row.querySelector(".obsel_prop");
	value_holder = prop_row.querySelector(".obsel_value");
	
	prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_after"];
	value_holder.innerHTML = obsel.info_after;
	
	attr_list.appendChild(prop_row);
	
	prop_row = tAssistance.dom.PropertyLayout();
	
	prop_holder = prop_row.querySelector(".obsel_prop");
	value_holder = prop_row.querySelector(".obsel_value");
	
	prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_style"];
	value_holder.innerHTML = obsel.info_style;
	
	attr_list.appendChild(prop_row);
	
	prop_row = tAssistance.dom.PropertyLayout();
	
	prop_holder = prop_row.querySelector(".obsel_prop");
	value_holder = prop_row.querySelector(".obsel_value");
	
	prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_text"];
	value_holder.innerHTML = obsel.info_text;
	
	attr_list.appendChild(prop_row);
		
	return layout;
};

tAssistance.dom.OzaObsel.Subview = function(obsel){
	
	var layout = tAssistance.dom.OzaTextObselLayout();
	
	var begin_holder = layout.querySelector(".obselbegin");
	var type_holder = layout.querySelector(".obseltype");
	var user_holder = layout.querySelector(".obseluser");
	var attr_list = layout.querySelector(".attr_list");
	
	// deconnection
	
	begin_holder.innerHTML = moment(obsel.begin).format("MMMM Do YY, h:mm a");
	type_holder.innerHTML = tAssistance.TraceModel.Oza.text[obsel.type];
	user_holder.innerHTML = obsel.user;
		
	var prop_row = tAssistance.dom.PropertyLayout();
	
	var prop_holder = prop_row.querySelector(".obsel_prop");
	var value_holder = prop_row.querySelector(".obsel_value");
	
	prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_idDoc"];
	value_holder.innerHTML = obsel.info_idDoc;
	
	attr_list.appendChild(prop_row);
	
	prop_row = tAssistance.dom.PropertyLayout();
	
	prop_holder = prop_row.querySelector(".obsel_prop");
	value_holder = prop_row.querySelector(".obsel_value");
	
	prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_idsubview"];
	value_holder.innerHTML = obsel.info_idsubview;
	
	attr_list.appendChild(prop_row);
	
	prop_row = tAssistance.dom.PropertyLayout();
	
	prop_holder = prop_row.querySelector(".obsel_prop");
	value_holder = prop_row.querySelector(".obsel_value");
	
	prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_label"];
	value_holder.innerHTML = obsel.info_label;
	
	attr_list.appendChild(prop_row);
		
	return layout;
};

tAssistance.dom.OzaObsel.Validation = function(obsel){
	
	var layout = tAssistance.dom.OzaTextObselLayout();
	
	var begin_holder = layout.querySelector(".obselbegin");
	var type_holder = layout.querySelector(".obseltype");
	var user_holder = layout.querySelector(".obseluser");
	var attr_list = layout.querySelector(".attr_list");
	
	// deconnection
	
	begin_holder.innerHTML = moment(obsel.begin).format("MMMM Do YY, h:mm a");
	type_holder.innerHTML = tAssistance.TraceModel.Oza.text[obsel.type];
	user_holder.innerHTML = obsel.user;
		
	var prop_row = tAssistance.dom.PropertyLayout();
	
	var prop_holder = prop_row.querySelector(".obsel_prop");
	var value_holder = prop_row.querySelector(".obsel_value");
	
	prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_rfW"];
	value_holder.innerHTML = obsel.info_rfW;
	
	attr_list.appendChild(prop_row);
	
	prop_row = tAssistance.dom.PropertyLayout();
	
	prop_holder = prop_row.querySelector(".obsel_prop");
	value_holder = prop_row.querySelector(".obsel_value");
	
	prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_text"];
	value_holder.innerHTML = obsel.info_text;
	
	attr_list.appendChild(prop_row);
			
	return layout;
};

tAssistance.dom.OzaObsel.Fn = function(obsel){
	
	var layout = tAssistance.dom.OzaTextObselLayout();
	
	var begin_holder = layout.querySelector(".obselbegin");
	var type_holder = layout.querySelector(".obseltype");
	var user_holder = layout.querySelector(".obseluser");
	var attr_list = layout.querySelector(".attr_list");
	
	var request = obsel.info_request;
	
	begin_holder.innerHTML = moment(obsel.begin).format("MMMM Do YY, h:mm a");
	type_holder.innerHTML = "";
	user_holder.innerHTML = obsel.user;
	
	if(request=="send corrections"){
		if(status=="begin"){
			type_holder.innerHTML= "sent corrections";

			var prop_row = tAssistance.dom.PropertyLayout();
			
			var prop_holder = prop_row.querySelector(".obsel_prop");
			var value_holder = prop_row.querySelector(".obsel_value");
			
			prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_correctionCount"];
			value_holder.innerHTML = obsel.info_correctionCount;
			
			attr_list.appendChild(prop_row);
			
			prop_row = tAssistance.dom.PropertyLayout();
			
			prop_holder = prop_row.querySelector(".obsel_prop");
			value_holder = prop_row.querySelector(".obsel_value");
			
			prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_request"];
			value_holder.innerHTML = obsel.info_request;
			
			attr_list.appendChild(prop_row);

			prop_holder = prop_row.querySelector(".obsel_prop");
			value_holder = prop_row.querySelector(".obsel_value");
			
			prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_status"];
			value_holder.innerHTML = obsel.info_status;
			
			attr_list.appendChild(prop_row);
			
		}else if(status=="end"){
			type_holder.innerHTML= "the corrections was sent";
			
			prop_row = tAssistance.dom.PropertyLayout();
			
			prop_holder = prop_row.querySelector(".obsel_prop");
			value_holder = prop_row.querySelector(".obsel_value");
			
			prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_request"];
			value_holder.innerHTML = obsel.info_request;
			
			attr_list.appendChild(prop_row);

			prop_holder = prop_row.querySelector(".obsel_prop");
			value_holder = prop_row.querySelector(".obsel_value");
			
			prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_status"];
			value_holder.innerHTML = obsel.info_status;
			
			attr_list.appendChild(prop_row);
		}
	}else{
		type_holder.innerHTML= "do an unknow action";
		
		prop_row = tAssistance.dom.PropertyLayout();
		
		prop_holder = prop_row.querySelector(".obsel_prop");
		value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_request"];
		value_holder.innerHTML = obsel.info_request;
		
		attr_list.appendChild(prop_row);

		prop_holder = prop_row.querySelector(".obsel_prop");
		value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = tAssistance.TraceModel.Oza.text["info_status"];
		value_holder.innerHTML = obsel.info_status;
		
		attr_list.appendChild(prop_row);
	}
				
	return layout;
};

tAssistance.dom.OzaObsel.Defaut = function(obsel){
	
	var layout = tAssistance.dom.OzaTextObselLayout();
	
	var begin_holder = layout.querySelector(".obselbegin");
	var type_holder = layout.querySelector(".obseltype");
	var user_holder = layout.querySelector(".obseluser");
	var attr_list = layout.querySelector(".attr_list");
	
	var request = obsel.info_request;
	
	begin_holder.innerHTML = moment(obsel.begin).format("MMMM Do YY, h:mm a");
	type_holder.innerHTML= "do an action";
	user_holder.innerHTML = obsel.user;	
	
	for(var i in obsel){
		prop_row = tAssistance.dom.PropertyLayout();
		
		prop_holder = prop_row.querySelector(".obsel_prop");
		value_holder = prop_row.querySelector(".obsel_value");
		
		prop_holder.innerHTML = i;
		value_holder.innerHTML = obsel[i];
		
		attr_list.appendChild(prop_row);
	}
				
	return layout;
};

tAssistance.dom.OzaTextObselLayout = function(){
	
	var layout = tAssistance.dom.More();
	
	var title = layout.querySelector(".title");
	var details = layout.querySelector(".details");
	
	var moment = document.createElement("span");
	moment.setAttribute("class","obselbegin");
	
	var user = document.createElement("span");
	user.setAttribute("class","obseluser");
	
	var type = document.createElement("span");
	type.setAttribute("class","obseltype");
	$(type).css("color","green");
	
	var attr_list = document.createElement("div");
	attr_list.setAttribute("class","attr_list");
	
	title.appendChild(moment);
	title.appendChild(document.createTextNode(", "));
	title.appendChild(tAssistance.dom.UserIcon());
	//title.appendChild(document.createTextNode(", the user(id="));	
	title.appendChild(user);
	title.appendChild(document.createTextNode(" "));
	//title.appendChild(document.createTextNode(") "));
	title.appendChild(type);
	details.appendChild(attr_list);
	
	return layout;
};

tAssistance.dom.PropertyLayout = function(){
	var row = document.createElement("div");
	
	var prop = document.createElement("span");
	prop.setAttribute("class","textobsel-attr obsel_prop");
	
	var value = document.createElement("span");
	value.setAttribute("class","obsel_value");
		
	row.appendChild(prop);
	row.appendChild(value);
	
	return row;
};
