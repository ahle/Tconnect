tAssistance.Json = function(){
	
	this.listProperties = function(objList){
		var properties = [];
		
		
		for (var i in objList) {
			var obj = objList[i];
			//console.log(obj);
			
			for (var prop_name in obj) {
		        if (obj.hasOwnProperty(prop_name)) {
		        	var pro_info = properties[prop_name];
		        	var value = obj[prop_name];		        	
		        	
		        	if(pro_info){		        		
		        				        		
		        		pro_info.count++;
		        		if(value===null){
		        			pro_info.nullable = false;
		        		}
		        		else if( typeof value !== pro_info.type){
		        			pro_info.type = "?";
		        		}
		        		
		        		if(pro_info.values.indexOf(value)==-1){
		        			if(pro_info.values.length>10){
		        				pro_info.list = false;
		        			}
		        			else{
		        				pro_info.values.push(value);
		        			}
		        		}
		        	}
		        	else{
		        		properties[prop_name] = {"count": 1, "type": typeof value, "nullable": false, "values": [value], "list": true};
		        	}
		        	
		        	//console.log(properties);
		        	
		        	//console.log(property + "   " + obj[property]);
		        	
		            if (typeof value == "object") {
		                
		            } else {
		               // console.log(property + "   " + obj[property]);
		                
		            }
		        }
		    }		
		}
		
		return properties;
	};
};