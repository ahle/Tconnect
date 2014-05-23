tAssistance.dom.obsel = function(parent, obsel,rules){
	var id = "obsel"+(new Date()).getTime()+Math.random()*1000;
	this.id = id;
	var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	var y = tAssistance.svg.lines["line0"],
	r = 8;
	
	var base = {
		"x": obsel.x, "y": y, "color": color, "r": '10'
	}
	
	dom_obsel = tAssistance.makeObsel(obsel.src_obsel, base.x);
	if(dom_obsel){
		dom_obsel.setAttribute("data-id",id);		
		parent.appendChild(dom_obsel);		
		// add the event
		$(dom_obsel).click(function(e){
			var obsel_in_html = obsel.renderProperty("#controlPanel");
		});
		
		// save the bi-references
		obsel.element = dom_obsel;
		tAssistance.data[id] = obsel;
	}	
};