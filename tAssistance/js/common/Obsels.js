tAssistance.obsels = {
	filter: function(obsels, start, end) {
		var filteredObsels = [];
		for (i = 0; i < obsels.length; i++) {
			var obsel = obsels[i];
			if (obsel.begin >= start && obsel.begin <= end) {
				filteredObsels.push(obsel);
			}
		}

		if (tAssistance.debug) {
			console.log(filteredObsels.length);
		}

		return filteredObsels;
	},
	filter1: function(svgElements, start, end) {
		var filteredSvgElements = [];
		for (i = 0; i < svgElements.length; i++) {
			var svgElement = svgElements[i];
			if (svgElement.data["time"] >= start
					&& svgElement.data["time"] <= end) {
				filteredSvgElements.push(svgElement);
			}
		}

		if (tAssistance.debug) {
			console.log(filteredSvgElements.length);
		}

		return filteredSvgElements;
	},
	diff: function(drawObsels, obsels) {
		var ret = {
			"=" : [],// drawn obsels exist
			"-" : [],// drawn obsels need to be removed
			"+" : [],// obsels need to be added
		};
		var matchedIds = [];

		for ( var i = 0; i < obsels.length; i++) {
			var obsel = obsels[i];
			var isMatched = false;

			for (j = 0; j < drawObsels.length; j++) {// need to be improved
				var drawObsel = drawObsels[j];
				if (obsel.begin == drawObsel.data["obsel"].begin) {
					isMatched = true;
					matchedIds.push(j);
					break;
				}
			}
			if (isMatched) {
				ret["="].push(drawObsel);
			} else {
				ret["+"].push(obsel);
			}
		}

		for (i = 0; i < drawObsels.length; i++) {
			var drawObsel = drawObsels[i];
			if (matchedIds.indexOf(i) == -1) {
				ret["-"].push(drawObsel);
			}
		}
		return ret;
	},
	getLocalObsels: function() {
		var str_obsels = localStorage["tAssistance.obsels"];
		return JSON.parse(str_obsels);

	},
	setLocalObsels: function(obsels) {
		localStorage["tAssistance.obsels"] = JSON.stringify(obsels);
	},
	selectObselTypes: function(obsels) {
		var obsel_types = [];
		for ( var i = 0; i < obsels.length; i++) {
			var obsel = obsels[i];
			if (obsel_types.indexOf(obsel[tAssistance.obsel.type]) == -1) {
				obsel_types.push(obsel[tAssistance.obsel.type]);
			}
		}
		return obsel_types;
	}
};