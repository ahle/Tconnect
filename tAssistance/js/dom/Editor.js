tAssistance.dom.ContraintEditor = function(contraints){
	
	var form = document.createElement("div");
	
	return form;
	
};

tAssistance.dom.IconEditor = function(params){
	
	var form = document.createElement("form");
	form.setAttribute("action","");
	//form.setAttribute("method","post");
	form.setAttribute("enctype","multipart/form-data");
	
//	var preview = new tAssistance.dom.ImagePreview();
//	
//	form.appendChild(preview);
	
	var input = document.createElement("input");
	input.setAttribute("type","file");
	input.setAttribute("name","image");
	
	var upload_btn = document.createElement("button");
	//upload_btn.setAttribute("type","submit");
	upload_btn.innerHTML = "Upload";
	
	form.appendChild(input);
	form.appendChild(upload_btn);
	
	
	
	
	
	
	
	return form;
};