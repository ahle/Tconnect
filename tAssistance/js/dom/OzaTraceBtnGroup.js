tAssistance.dom.OzaTraceBtnGroup = function(trc_id, width, height){
	this.width = width;
	this.height = height;
	
	
	var group = document.createElement("div");
	group.setAttribute("class","panel-default panel");
	group.setAttribute("style","width: 40px; margin: 5px");
	
//	var obsel_icon = document.createElement("img");
//	obsel_icon.setAttribute("src","img/icon.png");
//	obsel_icon.setAttribute("style","margin: 4px");
//	obsel_icon.setAttribute("class","trc_btn");
//	obsel_icon.setAttribute("height","32px");
//	obsel_icon.setAttribute("width","32px");
//	group.appendChild(obsel_icon);
	
	var setting_icon = document.createElement("img");
	setting_icon.setAttribute("src","img/setting.png");
	setting_icon.setAttribute("style","margin: 4px;");
	setting_icon.setAttribute("class","trc_btn");
	setting_icon.setAttribute("alt","setting");
	setting_icon.setAttribute("height","32px");
	setting_icon.setAttribute("width","32px");
	group.appendChild(setting_icon);
		
//	var magnifier_icon = document.createElement("img");
//	magnifier_icon.setAttribute("src","img/magnifier.png");
//	magnifier_icon.setAttribute("style","margin: 4px;");
//	magnifier_icon.setAttribute("class","trc_btn");
//	magnifier_icon.setAttribute("title","magnifier");
//	magnifier_icon.setAttribute("height","32px");
//	magnifier_icon.setAttribute("width","32px");	
//	group.appendChild(magnifier_icon);
	
	return group;
};

tAssistance.dom.ImgButton = function(img, class_name){
	
	var btn = document.createElement("button");
	btn.setAttribute("class","button");
	btn.setAttribute('style', 'margin: 5px; padding: 2px' );
	
	var icon = document.createElement("img");
	icon.setAttribute("src", img);
	icon.setAttribute("class",class_name);
	icon.setAttribute("alt","setting");
	icon.setAttribute("height","20px");
	icon.setAttribute("width","20px");
	
	btn.appendChild(icon);
	
	return btn;
};

tAssistance.dom.TextButton = function(text, class_name){
	
	var btn = document.createElement("button");
	btn.setAttribute("class","button");
	btn.setAttribute('style', 'margin: 5px; padding: 2px' );
	btn.innerHTML = text;
	
	return btn;
};

tAssistance.dom.PfilterButtons = function(){
	
	
	
	
};