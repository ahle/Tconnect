tAssistance.svg = {
	svgNS: "http://www.w3.org/2000/svg",
	lines: {"major": 25, "minor": 35, "line0": 50 },
	fonts: {"arial": {}},
	getCenter: function(svgElement){
		var bbox = svgElement.getBBox();
		var width = bbox.width;
		var height = bbox.height;
		
		var center = {
			x: bbox.x + width/2,
			y: bbox.y + height/2
		};
		return center;
	},
	align_middle: function(target, source){			
		var center = tAssistance.svg.getCenter(source);						
		target.setAttributeNS(null,"x",center.x);
	},	
};