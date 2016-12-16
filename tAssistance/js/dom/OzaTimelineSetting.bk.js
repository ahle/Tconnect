tAssistance.dom.ContraintForm = function(models, contraints){
	
	var form = document.createElement("div");
	//tr.setAttribute('style', 'padding: 5px' );
	
	var model_div = tAssistance.dom.ModelSelectControl(models);
	
	form.appendChild(model_div);
	
	var model = models[0];
	
	var obsels = model.obsels; 
	
	var obsel_types_div = tAssistance.dom.ObselSelectControl(obsels);
	
	form.appendChild(obsel_types_div);
	
	// properties
	
	var properties = obsels[0].properties;
	
	var properties_div = tAssistance.dom.PropertySelectControl(properties);
		
	form.appendChild(properties_div);
	
	// contraints
	
	var contraints_div = tAssistance.dom.ContraintSelectControl(contraints);
		
	form.appendChild(contraints_div);
	
	// contraint control
	
	var popup = tAssistance.dom.PopupLayout("ho");
	
	form.appendChild(popup);
		
	return form;
};