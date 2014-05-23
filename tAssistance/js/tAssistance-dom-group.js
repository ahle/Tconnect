tAssistance.dom.group = function(parentNode,group){
	var svgNS = tAssistance.svg.svgNS;
	var id = "group"+(new Date()).getTime()+Math.random()*1000;
	this.id = id;
	var g_dom = document.createElementNS(svgNS,"g");
	g_dom.setAttribute("transform","translate(0 0) scale(1 1)");
	g_dom.setAttribute("data-id",id);	
	parentNode.appendChild(g_dom);
	// save the bi-references
	group.element = g_dom;
	tAssistance.data[id] = group;
};

tAssistance.dom.group_utils = {
	parse_transform: function(g_dom){
		// parse the transform property
		  var charTransformSplit = ' ';
		  var charNumberSplit = ' ';
	      
		  var transform = g_dom.getAttribute('transform');
	      var translate = transform.split(')'+charTransformSplit)[0]+')';
	      var translateValues = translate.replace("translate(","").slice(0,-1).split(charNumberSplit);
	      var scale = transform.split(')'+charTransformSplit)[1];
	      var scaleValues = scale.replace("scale(","").slice(0,-1).split(charNumberSplit);
	      var translate_x = 0;
	      var translate_y = 0;
	      var scale_x = 0;
	      var scale_y = 0;
	      
	      translate_x = parseFloat(translateValues[0]);	// Represent the x-coordinate on the transform attribute.
	      if(translateValues.length>1){
	    	  translate_y = parseFloat(translateValues[1]);	// Represent the y coordinate on the transform attribute.
		  }
	      else{// IE
	    	  translate_y = translate_x;
	      }
	      
	      scale_x = parseFloat(scaleValues[0]); // Represent the x-scale on the transform attribute.
	      if(scaleValues.length>1){
	    	  scale_y = parseFloat(scaleValues[1]);	// Represent the y scale on the transform attribute.
		  }
	      else{// IE
	    	  scale_y = scale_x;
	      }	      
	      
	      ret = {
	          "translate.x": translate_x,
	          "translate.y": translate_y,
	          "scale.x": scale_x,
	          "scale.y": scale_y
	      };
	      return ret;	      
	 },
	make_transform_str: function(transform_obj){
			var charTransformSplit = ' ';
			var charNumberSplit = ' ';
			
			return "translate("+transform_obj["translate.x"]+charNumberSplit+transform_obj["translate.y"]+") scale("+transform_obj["scale.x"]+charNumberSplit+transform_obj["scale.y"]+")";		
	},
};