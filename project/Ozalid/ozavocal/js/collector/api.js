$.get("trace.json", function(data){
		
		/* var sds = getSds(data);		
		document.querySelector("div[name='level1']").appendChild(sds); */
		
		var sd = getSd(data);		
		document.querySelector("div[name='level1']").appendChild(sd);
		
		/* var sv = getSv(data);		
		document.querySelector("div[name='level1']").appendChild(sv);
		
		var sh = getSh(data);		
		document.querySelector("div[name='level1']").appendChild(sh); */
		//list.push(sequences);
		
		
});