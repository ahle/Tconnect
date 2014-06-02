tAssistance.OzaTraceList = function(element){
	//element = document.getElementById(id);
	traces = element.querySelector("div[name='traces']");
	
	more_buttons = element.querySelectorAll("a[name='more']");
	$(more_buttons).click(function(){
		var details_node = this.parentNode.getElementsByTagName("p")[0];
		if(details_node){
			var display = details_node.style.display;
			if(display=="none"){
				this.innerHTML = this.dataset["less"];
				details_node.style.display = "block";
			}
			else{
				this.innerHTML = this.dataset["more"];
				details_node.style.display = "none";
			}
		}
	});
};