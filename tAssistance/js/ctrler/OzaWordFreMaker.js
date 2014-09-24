tAssistance.OzaWordFreMaker = function(id, parent){
	//this.element = element;
	
	var url = "http://localhost/tconnect/tAssistance/index.php?test=test";
	
	jQuery.getJSON(url,function(countedItems){
		console.log(countedItems);
		
		var dataset = [];
		
		for(var i=0;i<countedItems.length;i++){
			var countedItem = countedItems[i];
						
			var item = {
				"label": countedItem.textWord,
				"value": countedItem.occurenceNb
			};
			dataset.push(item);			
		}
		
		
		
		
		
		
		var row = new tAssistance.OzaBarChart("abd", document.body, dataset);
				
	});
	
	
	
};