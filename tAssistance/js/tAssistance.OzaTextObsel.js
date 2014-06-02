tAssistance.OzaTextObsel = function(id,parent,src_obsel){
	// properties and events for the object controller
	this.src_obsel = src_obsel;
	this.parent = parent;
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
	
	this.click = function(){
		var src_obsel_id = this.src_obsel.id;
		this.parent.markObsel(src_obsel_id);
		
		var obsel_list = this.parent;
		var group = obsel_list.trace_graph.group;
		
		if(!group) return;
		
		group.markObsel(obsel.src_obsel.id);
	}
	
	var beforeTitle = "<div class='textobsel' data-id='"+id+"'>",
		afterTitle = " <a data-less='[Less]' data-more='[More]'>[More]</a>",
		beforeDetail = "<p name='detail' style='display:none'>",
		afterDetail = "</p></div>",
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
		idsubview,
		label,
		info_text,
		status,
		correctionCount;
		
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
			else if(p=="idPage"){
				ptext = "ID Page";
	    		valueText = value;
	    		idPage = valueText;
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
			else if(p=="info_correctionCount"){
				ptext = "Number Page";
	    		valueText = value;
	    		correctionCount = valueText;
			}
			else{
				
			}
	    }	        
	}// end loop all properties
	
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
		else if(isset(button)){
			details+= "<span class='textobsel-attr'>Button</span>: "+button+" <br/>";
			details+= "<span class='textobsel-attr'>Go View</span>: "+goidview+" <br/>";
			details+= "<span class='textobsel-attr'>Go Page</span>: <a href='"+pageUri+"'>Go to the page</a> <br/>";
			details+= "<span class='textobsel-attr'>Go View*</span>: "+idview+" <br/>";
		}		
	}
	else if(type=="ozec_w"){
		obselTitle = "At "+begin+", the user (id="+user+") <span style='color:#CCCC00'>"+typeText+"</span> from [<span style='color:red'>"+before+"</span>] to [<span style='color:red'>"+after+"</span>]";
		details= "<span class='textobsel-attr'>Page Link</span>: <a href='"+pageUri+"'>Go to the page</a> <br/>";
		details+= "<span class='textobsel-attr'>Corrected Word</span>: "+rfW+"<br/>";
		details+= "<span class='textobsel-attr'>Before</span>: "+before+"<br/>";
		details+= "<span class='textobsel-attr'>After</span>: "+after+"<br/>";
		
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
		obselTitle = "At "+begin+", the user (id="+user+") $action (before="+before+",after="+after+") on the page "+idPage+" of the document(<a href='"+docId+"'>"+titleDoc+"</a>) ";
	}
	
	html = beforeTitle+obselTitle+afterTitle+beforeDetail+details+afterDetail;
	
	$(html).appendTo(parent.element);
	var element = parent.element.lastChild;
	this.element = element;
	parent.childs.push(this);
	
	// add events to the element
	var moreBtn = element.querySelector("a[data-more]");
	var detailP = element.querySelector("p[name='detail']");
	
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
	
	var obsel = this;
	element.onclick = function(){
		obsel.click();
	};
	
	
	
};