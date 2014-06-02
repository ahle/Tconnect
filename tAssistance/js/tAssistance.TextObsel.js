tAssistance.TextObsel = {
	toogleCollapse: function(btn){
		var details_node = btn.parentNode.getElementsByTagName("p")[0];
		if(details_node){
			var display = details_node.style.display;
			if(display=="none"){
				btn.innerHTML = btn.dataset["less"];
				details_node.style.display = "block";
			}
			else{
				btn.innerHTML = btn.dataset["more"];
				details_node.style.display = "none";
			}
		}
	}	
};