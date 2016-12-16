tAssistance.dom.OzaObselIconByDefault = function(params){
	var obsel = params.obsel;
	var x = params.x;
	
	if(obsel.type=="oze_idg"){
		drawnObsel = document.createElementNS('http:\/\/www.w3.org\/2000\/svg','image');
		drawnObsel.setAttributeNS(null,'x', x );
		drawnObsel.setAttributeNS(null,'y', '40' );
		drawnObsel.setAttributeNS(null,'width', '20' );
		drawnObsel.setAttributeNS(null,'height', '20' );
		drawnObsel.setAttributeNS("http://www.w3.org/1999/xlink",'href','img/oze_idg.png');
		return drawnObsel;
	}
	else if(obsel.type=="oze_view"){
		drawnObsel = document.createElementNS('http:\/\/www.w3.org\/2000\/svg','image');
		drawnObsel.setAttributeNS(null,'x', x );
		drawnObsel.setAttributeNS(null,'y', '50' );
		drawnObsel.setAttributeNS(null,'width', '20' );
		drawnObsel.setAttributeNS(null,'height', '20' );
		drawnObsel.setAttributeNS("http://www.w3.org/1999/xlink",'href','img/oze_view.png');
		return drawnObsel;
	}
	else if(obsel.type=="oze_subview"){
		drawnObsel = document.createElementNS('http:\/\/www.w3.org\/2000\/svg','image');
		drawnObsel.setAttributeNS(null,'x', x );
		drawnObsel.setAttributeNS(null,'y', '60' );
		drawnObsel.setAttributeNS(null,'width', '20' );
		drawnObsel.setAttributeNS(null,'height', '20' );
		drawnObsel.setAttributeNS("http://www.w3.org/1999/xlink",'href','img/oze_subview.png');
		return drawnObsel;
	}
	
	else if(obsel.type=="ozec_w"){
		drawnObsel = document.createElementNS('http:\/\/www.w3.org\/2000\/svg','image');
		drawnObsel.setAttributeNS(null,'x', x );
		drawnObsel.setAttributeNS(null,'y', '70' );
		drawnObsel.setAttributeNS(null,'width', '20' );
		drawnObsel.setAttributeNS(null,'height', '20' );
		drawnObsel.setAttributeNS("http://www.w3.org/1999/xlink",'href','img/ozec_w.png');
		return drawnObsel;
	}
	else if(obsel.type=="ozev_w"){
		drawnObsel = document.createElementNS('http:\/\/www.w3.org\/2000\/svg','image');
		drawnObsel.setAttributeNS(null,'x', x );
		drawnObsel.setAttributeNS(null,'y', '80' );
		drawnObsel.setAttributeNS(null,'width', '20' );
		drawnObsel.setAttributeNS(null,'height', '20' );
		drawnObsel.setAttributeNS("http://www.w3.org/1999/xlink",'href','img/ozev_w.png');
		return drawnObsel;
	}
	else if(obsel.type=="ozem_fn"){
		drawnObsel = document.createElementNS('http:\/\/www.w3.org\/2000\/svg','image');
		drawnObsel.setAttributeNS(null,'x', x );
		drawnObsel.setAttributeNS(null,'y', '90' );
		drawnObsel.setAttributeNS(null,'width', '20' );
		drawnObsel.setAttributeNS(null,'height', '20' );
		drawnObsel.setAttributeNS("http://www.w3.org/1999/xlink",'href','img/ozem_fn.png');
		return drawnObsel;
	}
	else {
		drawnObsel = document.createElementNS('http:\/\/www.w3.org\/2000\/svg','image');
		drawnObsel.setAttributeNS(null,'x', x );
		drawnObsel.setAttributeNS(null,'y', '60' );
		drawnObsel.setAttributeNS(null,'width', '20' );
		drawnObsel.setAttributeNS(null,'height', '20' );
		drawnObsel.setAttributeNS("http://www.w3.org/1999/xlink",'href','img/default.png');
		return drawnObsel;
	}
};

tAssistance.dom.OzaObselIcon = function(params){
	var img = params.img;
	
	drawnObsel = document.createElementNS('http:\/\/www.w3.org\/2000\/svg','image');
	drawnObsel.setAttributeNS(null,'x', 0 );
	drawnObsel.setAttributeNS(null,'y', 0 );
	drawnObsel.setAttributeNS(null,'width', '20' );
	drawnObsel.setAttributeNS(null,'height', '20' );
	drawnObsel.setAttributeNS("http://www.w3.org/1999/xlink",'href', img);
	return drawnObsel;
};

tAssistance.dom.OzaObselTextBox = function(params){
	var text = params.text;
	
	drawnObsel = document.createElementNS('http:\/\/www.w3.org\/2000\/svg','text');
	drawnObsel.setAttributeNS(null,'x', 0 );
	drawnObsel.setAttributeNS(null,'y', 0 );
	//drawnObsel.setAttributeNS(null,'width', '20' );
	//drawnObsel.setAttributeNS(null,'height', '20' );
	drawnObsel.appendChild(document.createTextNode(text));
	return drawnObsel;
};