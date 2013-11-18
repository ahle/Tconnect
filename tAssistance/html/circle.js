tAssistance.CircleElement = function(element){
	this.element = element;
	this.getScript = function (){
		var element = this.element;
		var cx = element.querySelector("input['name'='cx']");
		var cy = element.querySelector("input['name'='cy']");
		var r =  element.querySelector("input['name'='r']");
		var color =  element.querySelector("input['name'='color']");
		
		var params = {"cx": cx, "cy": cy, "r": r, "color": color};
		
		var script_no_input = "function(obsel,auto){" +
		"drawnObsel = document.createElementNS(svgNS,'circle');" +
		"drawnObsel.setAttributeNS(null,'cx', '%cx%' || auto.x );" +
		"drawnObsel.setAttributeNS(null,'cy', '%cy%' || auto.y );" +
		"drawnObsel.setAttributeNS(null,'r', '%r%' || auto.r );" +
		"drawnObsel.setAttributeNS(null,'style','fill: '%color%'; stroke: black');" +
		"return drawnObsel;" +
		"}";
		var script_with_input = script_no_input;
		for(var name in params){
			script_with_input = script_with_input.replace('%'+name+'%', params[name]);
		}
		return script_with_input;
	};
	this.renderHtml = function (){
		var strVar="";
		strVar += "<div class='control-group'>";
		strVar += "<label class='col-xs-2 control-label'>Cx<\/label>";
		strVar += "  <div class='controls'>";
		strVar += "    <input type='number' name='cx' placeholder='auto' class='span1'>";
		strVar += "  <\/div>";
		strVar += "<\/div>";
		strVar += "<div class='control-group'>";
		strVar += "<label class='col-xs-2 control-label'>Cy<\/label>";
		strVar += "  <div class='controls'>";
		strVar += "    <input type='number' name='cy' placeholder='auto' class='span1'>";
		strVar += "  <\/div>";
		strVar += "<\/div>";
		strVar += "<div class='control-group'>";
		strVar += "  <label class='col-xs-2 control-label'>Radius<\/label>";
		strVar += "  <div class='controls'>";
		strVar += "    <input type='number' name='r' placeholder='auto' class='span1'>";
		strVar += "  <\/div>";
		strVar += "<\/div>";
		strVar += "";

		this.element.innerHTML = strVar;
	};
	this.attachEvents = function(){
		
	};	
};