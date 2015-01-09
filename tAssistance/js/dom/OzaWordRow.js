tAssistance.dom.OzaWordRow = function(id, m_word){
	
	var word = m_word;
	
	var row = document.createElement("div");
	
	var word_icon = document.createElement("img");
	word_icon.setAttribute("width","14px");
	word_icon.setAttribute("height","14px");
	word_icon.setAttribute("src","img/icon-word.png");
	
	row.appendChild(word_icon);
	
	var y_label = document.createElement("div");			
	y_label.setAttribute("style","width: 120px");
	y_label.setAttribute("class","y_label");
	y_label.innerHTML = word.label;
	
	row.appendChild(y_label);
	
	
	var bar = document.createElement("div");			
	bar.setAttribute("style","width: "+ parseInt(word.value *20) + "px");
	bar.setAttribute("class","bar");
	bar.innerHTML = word.value;
	
	row.appendChild(bar);
	
	return row;
};