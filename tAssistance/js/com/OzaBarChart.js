tAssistance.OzaBarChart = function(id, parent, dataset){
			
		//alert("hello");
		var chart = document.createElement("div");	
		chart.setAttribute("class","chart");
		
		for(var i=0;i<dataset.length;i++){
			var item = dataset[i];
			
			var row = document.createElement("div");			
						
			chart.appendChild(row);
			
			var y_label = document.createElement("div");			
			y_label.setAttribute("style","width: 120px");
			y_label.setAttribute("class","y_label");
			y_label.innerHTML = item.label;
			
			row.appendChild(y_label);
			
			
			var bar = document.createElement("div");			
			bar.setAttribute("style","width: "+ parseInt(item.value *20) + "px");
			bar.setAttribute("class","bar");
			bar.innerHTML = item.value;
			
			row.appendChild(bar);
		}
		
		parent.appendChild(chart);
};