ozavocal = {};

ozavocal.TraceParser = function(trace){
	
	for(var i in trace){
		
		var pck = trace[i];
		
		var data = pck.data;
		var pt = data.pT;
		var vocal = pt[0].vocal;
		
		if(!vocal) continue;
		
		var sds = "Sds";
		var sd = "Sd";
		var sh = "Sh";
		var sv = "Sv";
		
		var type = "";
		
		
		if(vocal.substr(0,sds.length)== sds){
			type = sds;
		}
		else if(vocal.substr(0,sd.length)== sd){
			type = sd;
		}
		else if(vocal.substr(0,sh.length)== sh){
			type = sh;
		}
		else if(vocal.substr(0,sv.length)== sv){
			type = sv;
		}
		
		var rest = vocal.substr(type.length);
		// machine		
		var rest = rest.substr("M".length);
		
		var computer = rest.substr(0,rest.indexOf("S")); // "3"
		
		var rest = rest.substr(computer.length);
		// sujet
		var rest = rest.substr("S".length);
		
		var subject = rest.substr(0,rest.indexOf("_")); // "3"
		
		var rest = rest.substr(subject.length+"_".length);
		// time
		
		var time =rest.substr(0,rest.indexOf("_")); // "3"
		
		var rest = rest.substr(time.length+"_".length);
		
		var date = new Date(time);
		// symbols	
		
		var symbols = rest;
		
		params = {
			"symbols": symbols,
			"date": date,
			"computer": computer,
			"subject": subject,
			"type": type
		};
		
		if(type == sd){			
			ozavocal.createSdTrace(params);
		}
		else if(type == sds){			
			ozavocal.createSdsTrace(params);
		}
		
	}
	
};

ozavocal.createSdTrace = function(params){
	var symbols = params.symbols;
	var date = params.date;
	var computer = params.computer;
	var subject = params.subject;
	var type = params.type;
	
	var trace = {
			"id": "xxx",
			"obsels": [],
			"type": type,
			"subject": subject,
			"computer": computer
		}
	
	var list = [];
	
	ozavocal.SdParser(symbols, list);
	
	for(var i in list){
		
		var obsel = {
			"begin": date.getTime(),
			"end": date.getTime(),
			"type": "action",
			"user": subject,
			"index": i,
			"value": list[i]				
		}
		
		trace.obsels.push(obsel);
	}
	
	console.log(JSON.stringify(trace));
};

ozavocal.createSdsTrace = function(params){
	var symbols = params.symbols;
	var date = params.date;
	var computer = params.computer;
	var subject = params.subject;
	var type = params.type;
	
	var trace = {
		"id": "xxx",
		"obsels": [],
		"type": type,
		"subject": subject,
		"computer": computer
	}
	
	var list = [];
	
	ozavocal.SdsParser(symbols, list);
	
	for(var i in list){
		
		var obsel = {
			"begin": date.getTime(),
			"end": date.getTime(),
			"user": subject,
			"index": i,
			"type": "action",
			"value": list[i]
		}
		
		trace.obsels.push(obsel);
	}
	
	console.log(JSON.stringify(trace));
};

ozavocal.SdParser = function(str, list){
	var rest = str;
	
	if(rest.substr(0,"|in".length) == "|in"){
		list.push("|in");
		
		rest = rest.substr("|in".length);
		
		var hasIndex = rest.match(/^[-+]?\d+/) !== null;
		
		if(hasIndex){
		
			index = rest.match(/^[-+]?\d+/)[0] // "3"
					
			rest = rest.substr(index.length);
			
			rest = rest.substr("_".length);
			
			list.push(index+"_");
		}
		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"l".length) == "l"){
		list.push("l");
		
		rest = rest.substr("l".length);
		
		zoom = rest.match(/^[-+]?\d+/)[0] // "3"
		
		list.push("l"+zoom);
		
		rest = rest.substr(zoom.length);
		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,3) == "|rt"){
		list.push("|rt");
		
		rest = rest.substr(3);		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,3) == "|ri"){
		list.push("|ri");
		
		rest = rest.substr(3);		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,3) == "|Rn"){
		list.push("|Rn");
		
		rest = rest.substr(3);		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,2) == "Qu"){
		list.push("Qu");
		
		rest = rest.substr(2);	
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"Bt".length) == "Bt"){
		list.push("Bt");
		
		rest = rest.substr("Bt".length);	
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"Tp".length) == "Tp"){
		list.push("Tp");
		
		rest = rest.substr("Tp".length);	
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,2) == "ES"){
		list.push("ES");
		
		rest = rest.substr(2);	
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,1) == "L"){
		list.push("L");
		
		rest = rest.substr(1);	
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,1) == "*"){
		
		
		rest = rest.substr(1);
		
		index = rest.match(/^[-+]?\d+/)[0] // "3"
		
		list.push("*"+index);
		
		rest = rest.substr(index.length);
		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"R".length) == "R" && rest.substr(0,"Rn".length) !== "Rn"){
		list.push("R");
		
		rest = rest.substr("R".length);	
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"Rn".length) == "Rn"){
		list.push("Rn");
		
		rest = rest.substr("Rn".length);	
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,1) == "D"){
		
		
		rest = rest.substr("D".length);
		
		var hasIndex = rest.match(/^[-+]?\d+/) !== null;
		
		if(hasIndex){
		
			index = rest.match(/^[-+]?\d+/)[0] // "3"
					
			rest = rest.substr(index.length);
			
			list.push("D"+index);
		}
		else{
			list.push("D");
		}
		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"U".length) == "U"){
		
		
		rest = rest.substr("U".length);
		
		var hasIndex = rest.match(/^[-+]?\d+/) !== null;
		
		if(hasIndex){
		
			index = rest.match(/^[-+]?\d+/)[0] // "3"
					
			rest = rest.substr(index.length);
			
			list.push("U"+index);
		}
		else{
			list.push("U");
		}
		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,2) == "En"){
		list.push("En");
		
		rest = rest.substr("En".length);	
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,2) == "Ii"){
		list.push("Ii");
		
		rest = rest.substr("Ii".length);
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"Ia".length) == "Ia" && rest.substr(0,"Iae".length)!== "Iae"){
		
		
		rest = rest.substr("Ia".length);
		
		input = rest.match(/\[(.*?)\]/)[0] // "3"
		
		list.push("Ia"+input);
		
		rest = rest.substr(input.length);
				
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"Iae".length) == "Iae"){
		
		
		rest = rest.substr("Iae".length);
		
		input = rest.match(/\[(.*?)\]/)[0] // "3"
		
		list.push("Iae"+input);
		
		rest = rest.substr(input.length);		
		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"Id".length) == "Id"){
		
		
		rest = rest.substr("Id".length);
		
		//input = rest.match(/\[(.*?)\]/)[0] // "3"
		
		list.push("Id");
		
		//rest = rest.substr(input.length);
				
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,2) == "Mf"){
		
		
		rest = rest.substr("Mf".length);
		
		cf = rest.match(/\[(.*?)\]/)[0] // "3"
		
		list.push(cf);
			
		rest = rest.substr(cf.length);
		
		nbd = rest.match(/\[(.*?)\]/)[0] // "3"
		
		list.push(nbd);
			
		rest = rest.substr(nbd.length);
				
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,2) == "Gd"){
		
		rest = rest.substr("Gd".length);
		
		index = rest.match(/^[-+]?\d+/)[0] // "3"
		
		list.push("Gd"+index);
		
		rest = rest.substr(index.length);
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,2) == "Go"){
		
		rest = rest.substr("Go".length);
		
		index = rest.match(/\[(.*?)\]/)[0] // "3"
		
		list.push("Go"+index);
		
		rest = rest.substr(index.length);
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"Gh".length) == "Gh"){
		
		rest = rest.substr("Gh".length);
		
		list.push("Gh");
		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"Gp".length) == "Gp"){
		
		rest = rest.substr("Gp".length);
		
		indDoc = rest.match(/^[-+]?\d+/)[0] // "3"
					
		rest = rest.substr(indDoc.length);
		
		rest = rest.substr("_".length);
		
		indPage = rest.match(/^[-+]?\d+/)[0] // "3"
		
		list.push("Gp"+indDoc+"_"+indPage);		
		rest = rest.substr(indPage.length);
		
		ozavocal.SdParser(rest, list);
	}
	else{
		
	}
};

//Sds
ozavocal.SdsParser = function(str, list){
	var rest = str;
	
	if(rest.substr(0,3) == "|in"){
		list.push("|in");
		
		rest = rest.substr(3);
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,3) == "|ri"){
		list.push("|ri");
		
		rest = rest.substr(3);		
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,3) == "|rt"){
		list.push("|rt");
		
		rest = rest.substr(3);		
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,3) == "|Rn"){
		list.push("|Rn");
		
		rest = rest.substr(3);		
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,2) == "Qu"){
		list.push("Qu");
		
		rest = rest.substr(2);	
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,2) == "ES"){
		list.push("ES");
		
		rest = rest.substr(2);	
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,1) == "L"){
		list.push("L");
		
		rest = rest.substr(1);	
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,1) == "*"){
				
		rest = rest.substr(1);
		
		index = rest.match(/^[-+]?\d+/)[0] // "3"
		
		list.push("*"+index);
		
		rest = rest.substr(index.length);
		
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,1) == "R"){
		list.push("R");
		
		rest = rest.substr(1);	
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,1) == "D"){
		list.push("D");
		
		rest = rest.substr(1);	
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,2) == "En"){
		list.push("En");
		
		rest = rest.substr("En".length);	
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,2) == "Ii"){
		list.push("Ii");
		
		rest = rest.substr("Ii".length);
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,2) == "Ia"){
				
		rest = rest.substr("Ia".length);
		
		input = rest.match(/\[(.*?)\]/)[0] // "3"
		
		list.push(input);
		
		rest = rest.substr(input.length);
		
		
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,2) == "Mf"){
		
		
		rest = rest.substr("Mf".length);
		
		cf = rest.match(/\[(.*?)\]/)[0] // "3"
		
		list.push("Mf["+cf+"]");
			
		rest = rest.substr(cf.length);
		
		nbd = rest.match(/\[(.*?)\]/)[0] // "3"
		
		list.push(nbd);
			
		rest = rest.substr(nbd.length);
				
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,2) == "Gd"){
		
		rest = rest.substr("Gd".length);
		
		index = rest.match(/^[-+]?\d+/)[0] // "3"
		
		list.push("Gd"+index);
		
		rest = rest.substr(index.length);
		ozavocal.SdsParser(rest, list);
	}
	else{
		
	}
};
