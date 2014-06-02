tAssistance.OzaObselSearch = function(id, parent, parentNode, list_element, trace, combo){
	this.id = id;
	this.element;
	this.trace = trace;
	this.combo = combo;
	this.parent = parent;
	
	var html = '<form class="obselsearch-form" role="form">';
		//html+= '<div class="control-group">';
		html+= '<label class="" for="from">From: </label>';
		//html+= '<input name="from" type="text" class="span2 input-search" placeholder="From">';
		html+= '<div class="input-append date" name="from" style="margin-bottom:0px">';
		html+= '<input class="span2" size="16" type="text" value="">';
		html+= '<span class="add-on"><i class="icon-calendar"></i></span>';
		html+= '</div>';
		html+= '<input name="from" type="hidden" value="">';
		//html+= '<div class="control-group">';
		html+= '<label class="" for="to">To: </label>';
		//html+= '<input name="to" type="text" class="span2 input-search" placeholder="To">';
		html+= '<div class="input-append date" name="to" style="margin-bottom:0px">';
		html+= '<input class="span2" size="16" type="text" value="">';
		html+= '<span class="add-on"><i class="icon-calendar"></i></span>';
		html+= '</div>';
		html+= '<input name="to" type="hidden" value="">';
		//html+= '<div class="control-group">';
		html+= '<label class="" for="search">Text: </label>';
		html+= '<input name="search" type="text" class="span2 input-search" placeholder="Text">';
		//html+= '</div>';
		html+= '<button type="button" class="btn btn-default">Rechecher</button>';
		//html+= '</div>';
		html+= '</form>';
		
	$(html).appendTo(parentNode);
	var element = parentNode.lastChild;
	this.element = element;
	
	var btn = element.querySelector("button");
	var fromDiv = element.querySelector("div[name='from']");
	var fromInput = element.querySelector("input[name='from']");
	var toDiv = element.querySelector("div[name='to']");
	var toInput = element.querySelector("input[name='to']");
	var searchInput = element.querySelector("input[name='search']");
	
	// set select date widgets for date input 
	$(fromDiv).datetimepicker({
        language:  'fr',		        
        format: 'dd/MM/yyyy hh:mm:ss',		       
    }).on('changeDate', function(e){
    	//console.log(e.localDate);
    	var dateInt = e.localDate.getTime();
    	fromInput.value = dateInt;
    });
	
	$(toDiv).datetimepicker({
        language:  'fr',		        
        format: 'dd/MM/yyyy hh:mm:ss',		       
    }).on('changeDate', function(e){
    	//console.log(e.localDate);
    	var dateInt = e.localDate.getTime();
    	toInput.value = dateInt;
    });
	
	var that = this;
	// add events to elements
	btn.onclick = function(){
		var from = fromInput.value;
		var to = toInput.value;
		var search = searchInput.value;
		that.search(from, to, search);
	};
	// save reference
	tAssistance.data[element.id] = this;
	// methods
	this.search = function(from, to, search){
		
		if(search==""){
			search="*";
		}
		var trace_id = that.trace.id;
		
		var store = new tStore.OzaTStore();
		var new_trace = store.createTrace(trace_id, from, to, search);
		
		var id = "obselist23445";
		list_element.innerHTML = "";
		var list = new tAssistance.OzaObselList(id, list_element, new_trace.obsels);
		
		//this.domTrace.element.innerHTML = "";
		
		this.parent.changeTrace(new_trace.id);
	};
};