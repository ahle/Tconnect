tAssistance.OzaZoomMaker = function(container){
	
	var zoom_id = "abc";
	
	var zoom = new tAssistance.dom.OzaZoom();	
	zoom.id = zoom_id;
	
	var zoomEl = new tAssistance.dom.OzaZoom(zoom_id);
	zoom.element = zoomEl;
	container.appendChild(zoomEl);
	
	$("#"+zoom_id).slider({
		formater: function(value){
			return tAssistance.Datetime.unitTexts[parseInt(value)];
		},
		value: 0,
		min: 0,
		max: 19,
		step: 1,
		selection: 'none',
		tooltip: 'show',
		orientation: 'vertical'
	}).on('slideStop', function(ev){
		console.log(ev.value);
		var units = tAssistance.Datetime.units;
		var unitTexts = tAssistance.Datetime.unitTexts;
		//var rangevalue = document.getElementById('rangevalue');
		
		iUnit = parseInt(ev.value);
		
		//rangevalue.value = unitTexts[iUnit];
		// create an event for update the trace
		
		$("#"+zoom_id).trigger("changeSetting",{
			unit: iUnit,
			unitText: unitTexts[iUnit],
			time: new Date(),
		});
	});	
	return zoom;
};