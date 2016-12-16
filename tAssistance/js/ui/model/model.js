tAssistance.ui.model = {
	"data": {},	
	"ctler": {},
	"dom": {}
};


tAssistance.ui.model.ctler.ModelMaker = function(params){
	
	var model = params.model;
	
	var obsels = model.obsels;
	
	var layout = tAssistance.ui.model.dom.ModelLayout();
		
	for(var i in obsels){
		
		var obsel = obsels[i];
		
		var params = {
			"obsel": obsel,
			"configs": tAssistance.ui.model.data.example1
		};
		
		var obsel_el = tAssistance.ui.sequenceobsel.ctler.ObselIconMaker(params);
		
		layout.querySelector("div.list").appendChild(obsel_el);
		
	}
	
	return layout;	
};

tAssistance.ui.model.dom.ModelLayout = function(params){
	
	var box = document.createElement('div');
	$(box).css("overflow-x","scroll");
	//$(box).css("overflow-y","scroll");
	//$(box).css('display', "inline" );
	$(box).css("height","40px");
	$(box).css("width","1000px");
	
	var list = document.createElement('div');
	list.setAttribute("class","list");
	$(list).css('white-space', "nowrap" );
	$(list).css('display', "inline" );
	
	box.appendChild(list);
	
	return box;
};

tAssistance.ui.model.dom.ObselRow = function(params){
	var obsel = params.obsel;	
	
	var box = document.createElement('div');
	$(box).css("overflow-x","scroll");
	//$(box).css("overflow-y","scroll");
	//$(box).css('display', "inline" );
	$(box).css("height","40px");
	$(box).css("width","1000px");
	
	var list = document.createElement('div');
	list.setAttribute("class","list");
	$(list).css('white-space', "nowrap" );
	$(list).css('display', "inline" );
	
	box.appendChild(list);
	
	return box;
};