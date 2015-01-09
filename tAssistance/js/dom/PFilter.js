tAssistance.dom.PFilter = function(){
	var form_group =  document.createElement("div");
	form_group.setAttribute('class', 'form-group');
		
	var input_group =  document.createElement("div");
	input_group.setAttribute('class', 'in_group');
	input_group.setAttribute('style', 'padding: 5px');
	
	form_group.appendChild(input_group);
	
	var text1 = document.createElement("span");
	text1.innerHTML = "Filter on the property ";
	
	var label1 = document.createElement("span");
	//label1.setAttribute('class', 'form-control');
	label1.innerHTML = "Min ";
	
	var min_wrap = document.createElement("div");
	min_wrap.setAttribute('class', 'form-control');
	min_wrap.setAttribute('style', 'padding: 3px; margin: 5px; width:100px; display: inline-block');
	
	var min = document.createElement("input");
	min.setAttribute('type', 'text');
	min.setAttribute('style', 'padding: 0; border: none; height: 100%; width: 100%');
	min.setAttribute('placeholder', 'Min');
	
	min_wrap.appendChild(min);
	
	var text2 = document.createElement("span");
	text2.innerHTML = "Max ";
	
	var max_wrap = document.createElement("div");
	max_wrap.setAttribute('class', 'form-control');
	max_wrap.setAttribute('style', 'padding: 3px; margin: 5px; width:100px; display:inline-block');
	
	var max = document.createElement("input");
	max.setAttribute('type', 'text');
	max.setAttribute('style', 'padding: 0; border: none; height: 100%; width: 100%');
	max.setAttribute('placeholder', 'Max');
	
	max_wrap.appendChild(max);
	
	var text3 = document.createElement("span");
	text3.innerHTML = "Has the string, search pattern (Regex) ";
	
	var regex_wrap = document.createElement("div");
	regex_wrap.setAttribute('class', 'form-control');
	regex_wrap.setAttribute('style', 'padding: 3px; margin: 5px; width:200px; display:inline-block');
	
	var regex = document.createElement("input");
	regex.setAttribute('type', 'text');
	regex.setAttribute('style', 'padding: 0; border: none; height: 100%; width: 100%');
	regex.setAttribute('placeholder', 'Regular expression');
	
	regex_wrap.appendChild(regex);
	
	input_group.appendChild(text1);
	input_group.appendChild(document.createElement("br"));
	input_group.appendChild(label1);
	input_group.appendChild(min_wrap);
	input_group.appendChild(text2);
	input_group.appendChild(max_wrap);
	input_group.appendChild(document.createElement("br"));
	input_group.appendChild(text3);
	input_group.appendChild(regex_wrap);
		
	return form_group;
};
