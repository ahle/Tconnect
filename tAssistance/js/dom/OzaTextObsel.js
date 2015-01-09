tAssistance.dom.OzaTextObsel = function(id,src_obsel){
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
	
	
	
	for(var p in src_obsel) {
		if(src_obsel.hasOwnProperty(p)){
	    	value = src_obsel[p];
	    	// presentation logic for the obsel
	    	if(p=="begin"){
				date = new Date(value);
				parts = tAssistance.Datetime.split(date);
				pText = "Begin";
				valueText = parts["hh"]+":"+parts["ii"]+":"+parts["ss"]+" on "+parts["DD"]+" "+parts["dd"]+"/"+parts["MM"]+"/"+parts["yyyy"];
				begin = valueText;
			}
	    	else if(p=="end"){
	    		date = new Date(value);
	    		parts = tAssistance.Datetime.split(date);
				pText = "End";
				valueText = parts["hh"]+":"+parts["ii"]+":"+parts["ss"]+" on "+parts["DD"]+" "+parts["dd"]+"/"+parts["MM"]+"/"+parts["yyyy"];
				end = valueText;
			}
	    	else if(p=="type"){
	    		ptext = "Type";
	    		valueText = type2text[value];
	    		type = value;
	    		typeText = valueText;
			}
			else if(p=="idSession"){
				ptext = "ID Session";
	    		valueText = value;
	    		idSession = valueText;
			}
			else if(p=="idDoc"){
				ptext = "ID Document";
	    		valueText = value;
	    		idDoc = valueText;
			}
			else if(p=="altoID"){
				ptext = "Alto ID";
	    		valueText = value;
	    		alto_id = valueText;
			}
			else if(p=="idPage"){
				ptext = "ID Page";
	    		valueText = value;
	    		idPage = valueText;
			}
			else if(p=="indPage"){
				ptext = "Page Index";
	    		valueText = value;
	    		ind_page = valueText;
			}
			else if(p=="info_before"){
				ptext = "Before";
	    		valueText = value;
	    		before = valueText;
			}
			else if(p=="info_after"){
				ptext = "After";
	    		valueText = value;
	    		after = valueText;
			}
			else if(p=="user"){
				ptext = "User";
	    		valueText = value;
	    		user = valueText;
			}
			else if(p=="info_titleDoc"){
				ptext = "Document Title";
	    		valueText = value;
	    		titleDoc = valueText;
			}
			else if(p=="info_userAgent"){
				ptext = "User Agent";
	    		valueText = value;
	    		userAgent = valueText;
			}
			else if(p=="info_tv"){
				ptext = "TV";
	    		valueText = value;
	    		tv = valueText;
			}
			else if(p=="info_v"){
				ptext = "V";
	    		valueText = value;
	    		v = valueText;
			}
			else if(p=="info_request"){
				ptext = "Request";
	    		valueText = value;
	    		request = valueText;
			}
			else if(p=="info_pageSelected"){
				ptext = "Selected Page";
	    		valueText = value;
	    		selectedPage = valueText;
			}
			else if(p=="info_author"){
				ptext = "Author";
	    		valueText = value;
	    		author = valueText;
			}
			else if(p=="m:info_pageNb"){
				ptext = "Page Number";
	    		valueText = value;
	    		pageNb = valueText;
			}
			else if(p=="info_numPage"){
				ptext = "Number Page";
	    		valueText = value;
	    		numPage = valueText;
			}
			else if(p=="info_rfW"){
				ptext = "Reference Word";
	    		valueText = value;
	    		rfW = valueText;
			}
			else if(p=="info_xywh"){
				ptext = "XYWH Word";
	    		valueText = value;
	    		info_xywh = valueText;
			}
			else if(p=="info_nbdocs"){
				ptext = "Number of documents";
	    		valueText = value;
	    		nbdocs = valueText;
			}
			else if(p=="info_idview"){
				ptext = "View ID";
	    		valueText = value;
	    		idview = valueText;
			}
			else if(p=="info_idsubview"){
				ptext = "Subview ID";
	    		valueText = value;
	    		idsubview = valueText;
			}
			else if(p=="info_button"){
				ptext = "Button";
	    		valueText = value;
	    		button = valueText;
			}
			else if(p=="info_goidview"){
				ptext = "Go ID View";
	    		valueText = value;
	    		goidview = valueText;
			}
			else if(p=="info_idPage"){
				ptext = "Number Page";
	    		valueText = value;
	    		info_idPage = valueText;
			}
			else if(p=="info_idDoc"){
				ptext = "Number Page";
	    		valueText = value;
	    		info_idDoc = valueText;
			}
			else if(p=="info_label"){
				ptext = "Number Page";
	    		valueText = value;
	    		label = valueText;
			}
			else if(p=="info_text"){
				ptext = "Number Page";
	    		valueText = value;
	    		info_text = valueText;
			}
			else if(p=="info_status"){
				ptext = "Number Page";
	    		valueText = value;
	    		status = valueText;
			}
			else if(p=="info_style"){
				ptext = "Corrected Style";
	    		valueText = value;
	    		corrected_style = valueText;
			}
			else if(p=="info_text"){
				ptext = "Text";
	    		valueText = value;
	    		info_text = valueText;
			}
			else if(p=="info_correctionCount"){
				ptext = "Number Page";
	    		valueText = value;
	    		correctionCount = valueText;
			}
			else{
				
			}
	    }	        
	}// end loop all properties
	
	//  
	
	
	
	
	
	
	
	
	
	// complete text
	
	if(type=="oze_idg"){
		obselTitle = "At "+begin+", the user (id="+user+") <span style='color:green'>"+typeText+" </span>";
		
		if(request=="deconnection"){
			details = "<span class='textobsel-attr'>Request</span>: "+request+" <br/>";
		}
		else{	
			
			details = "<span class='textobsel-attr'>User Agent</span>: "+userAgent+" <br/>";
			details+= "<span class='textobsel-attr'>TV</span>: "+tv+" <br/>";
			details+= "<span class='textobsel-attr'>View</span>: "+v+" <br/>";
		}
	}
	else if(type=="oze_view"){
		obselTitle = "At "+begin+", the user (id="+user+") <span style='color:#CCCC00'>"+typeText+"</span>";
		details = "<span class='textobsel-attr'>Request</span>: "+request+" <br/>";
		if(request=="vue page"){
			details+= "<span class='textobsel-attr'>Selected page</span>: "+pageSelected+" <br/>";
			details+= "<span class='textobsel-attr'>TV</span>: "+tv+" <br/>";
		}
		else if(request=="ws/sec/doc"){
			details+= "<span class='textobsel-attr'>Document Title</span>: "+titleDoc+" <br/>";
			details+= "<span class='textobsel-attr'>Author</span>: "+author+" <br/>";
			details+= "<span class='textobsel-attr'>Number of pages</span>: "+numPage+" <br/>";
		}
		else if(request=="ws/sec/docs"){
			details+= "<span class='textobsel-attr'>ID View</span>: "+idview+" <br/>";
			details+= "<span class='textobsel-attr'>Number of documents</span>: "+nbdocs+" <br/>";
		}
		else if(request=="ws/sec/page"){
			details+= "<span class='textobsel-attr'>Document Title</span>: "+titleDoc+" <br/>";
			details+= "<span class='textobsel-attr'>Author</span>: "+author+" <br/>";
			details+= "<span class='textobsel-attr'>Page</span>: "+numPage+" <br/>";
			details+= "<span class='textobsel-attr'>Page Link</span>: <a href='"+pageUri+"'>Go to the page</a> <br/>";
		}
		else if(request=="ws/sec/page"){
			details+= "<span class='textobsel-attr'>Document Title</span>: "+titleDoc+" <br/>";
			details+= "<span class='textobsel-attr'>Author</span>: "+author+" <br/>";
			details+= "<span class='textobsel-attr'>Page</span>: "+numPage+" <br/>";
			details+= "<span class='textobsel-attr'>Page Link</span>: <a href='"+pageUri+"'>Go to the page</a> <br/>";
		}
		else if(request=="retour sommaire"){
			details+= "<span class='textobsel-attr'>TV Title</span>: "+tv+" <br/>";
		}
		else if(request=="deconnection"){
			
		}
		else if(button){
			details+= "<span class='textobsel-attr'>Button</span>: "+button+" <br/>";
			details+= "<span class='textobsel-attr'>Go View</span>: "+goidview+" <br/>";
			details+= "<span class='textobsel-attr'>Go Page</span>: <a href='"+pageUri+"'>Go to the page</a> <br/>";
			details+= "<span class='textobsel-attr'>Go View*</span>: "+idview+" <br/>";
		}		
	}
	else if(type=="ozec_w"){
		obselTitle = "At "+begin+", the user (id="+user+") <span style='color:#CCCC00'>"+typeText+"</span> from [<span style='color:red'>"+before+"</span>] to [<span style='color:red'>"+after+"</span>]";
		details= "<span class='textobsel-attr'>Page Link</span>: <a href='"+pageUri+"'>Go to the page</a> <br/>";
		details+= "<span class='textobsel-attr'>Corrected Word</span>: <div id=\"word"+(new Date).getTime()+""+Math.floor((Math.random()*100))+"\" class=\"word\" data='"+alto_id+","+ind_page+","+rfW+","+info_xywh+"'></div><br/>";
		details+= "<span class='textobsel-attr'>Before</span>: "+before+"<br/>";
		details+= "<span class='textobsel-attr'>After</span>: "+after+"<br/>";
		details+= "<span class='textobsel-attr'>Corrected Style</span>: "+corrected_style+"<br/>";
		details+= "<span class='textobsel-attr'>Text</span>: "+info_text+"<br/>";
		
	}
	else if(type=="oze_subview"){
		obselTitle = "At "+begin+", the user (id="+user+") <span style='color:#CCCC00'>"+typeText+"</span>";
		details= "<span class='textobsel-attr'>Document</span>: <a href='"+docUri+"'>Go to the document</a> <br/>";
		details+= "<span class='textobsel-attr'>Sub View</span>: "+idsubview+"<br/>";
		details+= "<span class='textobsel-attr'>Label</span>: "+label+"<br/>";
		
		
	}
	else if(type=="ozev_w"){
		obselTitle = "At "+begin+", the user (id="+user+") <span style='color:#CCCC00'>"+typeText+"</span>";
		details= "<span class='textobsel-attr'>Reference word</span>: "+rfW+" <br/>";
		details+= "<span class='textobsel-attr'>Text</span>: "+info_text+"<br/>";	
	}
	else if(type=="ozem_fn"){
		if(request=="send corrections"){
			if(status=="begin"){
				
				obselTitle = "At "+begin+", the user (id="+user+") <span style='color:#CCCC00'> sent corrections</span>";
				details = "<span class='textobsel-attr'>Request</span>: "+request+" <br/>";
				details+= "<span class='textobsel-attr'>Status</span>: "+status+"<br/>";
				details+= "<span class='textobsel-attr'>Correction Count</span>: "+correctionCount+"<br/>";
				
			}else if(status=="end"){
				
				obselTitle = "At "+begin+", the corrections of the user (id="+user+") <span style='color:#CCCC00'> were sent</span>";
				details = "<span class='textobsel-attr'>Request</span>: "+request+"<br/>";
				details+= "<span class='textobsel-attr'>Status</span>: "+status+"<br/>";
				
			}else{
				obselTitle = "At "+begin+", the user (id="+user+") <span style='color:#CCCC00'> sent corrections</span>";
				details = "<span class='textobsel-attr'>Request</span>: "+request+"<br/>";
				details+= "<span class='textobsel-attr'>Status</span>: "+status+"<br/>";
			}
		}else{
			obselTitle = "At "+begin+", the user (id="+user+") <span style='color:#CCCC00'>"+typeText+"</span>";
			details = "<span class='textobsel-attr'>Request</span>: "+request+" <br/>";
			details+= "<span class='textobsel-attr'>Status</span>: "+status+"<br/>";
		}
	}
	else{
		obselTitle = "At "+begin+", the user (id="+user+") $action an unknown action";
	}
	
	html = beforeTitle+obselTitle+afterTitle+beforeDetail+details+afterDetail;
	
	textObsel.innerHTML = html;
		
	// add events to the element
	var moreBtn = textObsel.querySelector("a[data-more]");
	var detailP = textObsel.querySelector("p[name='detail']");
	
	moreBtn.onclick = function(){
		
		var display = detailP.style.display;
		if(display=="none"){
			moreBtn.innerHTML = moreBtn.dataset["less"];
			detailP.style.display = "block";
		}
		else{
			moreBtn.innerHTML = moreBtn.dataset["more"];
			detailP.style.display = "none";
		}	
	};	
	
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