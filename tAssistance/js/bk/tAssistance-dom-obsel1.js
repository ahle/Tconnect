tAssistance.dom.obsel = {
	renderProperty: function(options){
		var obsel = options.obsel;
		var obsel_container = options.container;
		var obsel_str = JSON.stringify(obsel);
		
		$.get("index.php?page=Property&id=1&obsel="+encodeURIComponent(obsel_str),function(data){			
			
			$(obsel_container).append(data);
			$(".trace_property").find("code").tooltip();
		});
	},
};	