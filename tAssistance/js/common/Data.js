tAssistance.data = {// an another implementation like jQuery.data
	"_data": [],
	setData: function(node, data){
		var pos = tAssistance.data.indexOf(node);
		if(pos==-1){
			tAssistance.data["_data"].push([node, data]);
		}
		else{
			tAssistance.data["_data"][pos] = [node, data];
		}
		
	},
	indexOf: function(node){
		for(var i=0;i<tAssistance.data["_data"].length;i++){
			var data = tAssistance.data["_data"][i];
			if(node==data[0]) return i;
		}
		return -1;
	},
	getData: function(node){
		var pos = tAssistance.data.indexOf(node);
		if(pos!=-1){
			return tAssistance.data["_data"][pos][1];
		}
		else{
			return null;
		}
	},	
};
tAssistance.data = {};
