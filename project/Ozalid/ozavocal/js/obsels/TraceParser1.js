ozavocal = {};

ozavocal.TraceParser1 = function(trace){
	
	var traces = {};
		
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
			"type": type,
			"id": i
		};
		
		var obsel = null;
		
		if(type == sd){			
			obsel = ozavocal.createSdObsel(params);
		}
		else if(type == sds){			
			obsel = ozavocal.createSdsObsel(params);
		}
		
		
		
		if(Object.keys(traces).indexOf(subject)==-1){
			
			var new_trace = {
					"id": i,
					"obsels": [],
					"type": "trace",
					"subject": subject,
					"computer": computer,
					"begin": date.getTime(),
					"end": date.getTime()
			};
			
			traces[subject] = new_trace;
			
			new_trace.obsels.push(obsel);			
		}
		else{
			new_trace = traces[subject];
			new_trace.obsels.push(obsel);
		}
	}
	
	console.log(JSON.stringify(traces["test3juillet"]));
	
};

ozavocal.createSdObsel = function(params){
	var symbols = params.symbols;
	var date = params.date;
	var computer = params.computer;
	var subject = params.subject;
	var type = params.type;
	var id = params.id;
	
	var trace = {
			"id": id,
			"obsels": [],
			"type": "group",
			"value": type,
			"subject": subject,
			"computer": computer,
			"begin": date.getTime(),
			"end": date.getTime(),
			"str": ""
			
		};
	
	var list = [];
	
	ozavocal.SdParser(symbols, list);
	
	for(var i in list){
		
		var obsel = {
			"begin": date.getTime(),
			"end": date.getTime(),
			"type": "action",
			"user": subject,
			"index": i,
			"value": list[i],
			"str": ""
		};
		
//		if(obsel.value.indexOf("*")==0){
//			obsel.type="index";
//		}
//		else if(obsel.value.indexOf("|in")==0){
//			obsel.type="index";
//		}
		if(typeof obsel.value == "object"){
			obsel.type = list[i].type;
		}
		
		trace.obsels.push(obsel);
		
		trace.str+=obsel.value.char;
	}
	
	return trace;
};

ozavocal.createSdsObsel = function(params){
	var symbols = params.symbols;
	var date = params.date;
	var computer = params.computer;
	var subject = params.subject;
	var type = params.type;
	var id = params.id;
	
	var trace = {
		"id": id,
		"obsels": [],
		"type": "group",
		"value": type,
		"subject": subject,
		"computer": computer,
		"begin": date.getTime(),
		"end": date.getTime(),
		"str": ""
	};
	
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
		};
		
		if(typeof obsel.value == "object"){
			obsel.type = list[i].type;
		}
		
		trace.obsels.push(obsel);
		
		trace.str+=obsel.value.char;
	}
	
	return trace;
};

ozavocal.SdParser = function(str, list){
	var rest = str;
	
	var obsel = {
			"type": "action",
			"string": "",
			
		};
	
	if(rest.substr(0,"|in".length) == "|in"){
		
		
		obsel.type = "load";
		obsel.string = "|in";
		obsel.char = "a";		
		
		rest = rest.substr("|in".length);
		
		var hasIndex = rest.match(/^[-+]?\d+/) !== null;
		
		if(hasIndex){
		
			index = rest.match(/^[-+]?\d+/)[0] // "3"
					
			rest = rest.substr(index.length);
			
			rest = rest.substr("_".length);
			
			obsel.string+= index+"_";
		}
		
		list.push(obsel);
		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"l".length) == "l"){
		
		
		rest = rest.substr("l".length);
		
		zoom = rest.match(/^[-+]?\d+/)[0] // "3"
		
		obsel.type = "zoom";
		obsel.string = "l"+zoom;
		obsel.char = "z";
		
		list.push(obsel);
		
		rest = rest.substr(zoom.length);
		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,3) == "|rt"){
				
		obsel.type = "load";
		obsel.string = "|rt";
		obsel.char = "a";
		
		list.push(obsel);
		
		rest = rest.substr(3);		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,3) == "|ri"){
		obsel.type = "load";
		obsel.string = "|ri";
		obsel.char = "a";
		
		list.push(obsel);
		
		rest = rest.substr(3);		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,3) == "|Rn"){
		obsel.type = "load";
		obsel.string = "|Rn";
		obsel.char = "a";
		
		list.push(obsel);
		
		rest = rest.substr(3);		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,2) == "Qu"){
		
		obsel.type = "escape";
		obsel.string = "Qu";
		obsel.char = "x";
		
		list.push(obsel);
				
		rest = rest.substr(2);	
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"Bt".length) == "Bt"){
		
		obsel.type = "nav";
		obsel.string = "Bt";
		obsel.char = "r";
		
		list.push(obsel);
		
		rest = rest.substr("Bt".length);	
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"Tp".length) == "Tp"){
		
		obsel.type = "nav";
		obsel.string = "Tp";
		obsel.char = "l";
		
		list.push(obsel);
		
		rest = rest.substr("Tp".length);	
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,2) == "ES"){
		obsel.type = "escape";
		obsel.string = "ES";
		obsel.char = "x";
		
		list.push(obsel);
		
		rest = rest.substr(2);	
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,1) == "L"){
		obsel.type = "nav";
		obsel.string = "L";
		obsel.char = "l";
		
		list.push(obsel);
		
		rest = rest.substr(1);	
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,1) == "*"){
		
		
		rest = rest.substr(1);
		
		index = rest.match(/^[-+]?\d+/)[0] // "3"
		
		obsel.type = "index";
		obsel.string = "*"+index;
		obsel.char = "i";
		
		list.push(obsel);
		
		rest = rest.substr(index.length);
		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"R".length) == "R" && rest.substr(0,"Rn".length) !== "Rn"){
		obsel.type = "nav";
		obsel.string = "R";
		obsel.char = "R";
		
		list.push(obsel);
		
		rest = rest.substr("R".length);	
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"Rn".length) == "Rn"){
		obsel.type = "nav";
		obsel.string = "Rn";
		obsel.char = "u";
		
		list.push(obsel);
		
		rest = rest.substr("Rn".length);	
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,1) == "D"){
		
		
		rest = rest.substr("D".length);
		
		var hasIndex = rest.match(/^[-+]?\d+/) !== null;
		
		obsel.type = "nav";
		obsel.string = "D";
		obsel.char = "D";
		
		list.push(obsel);
		
		if(hasIndex){
		
			index = rest.match(/^[-+]?\d+/)[0] // "3"
					
			rest = rest.substr(index.length);
			
			obsel.string = "D"+index;
		}
		else{
			obsel.string = "D";
		}
		
		list.push(obsel);
		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"U".length) == "U"){
				
		rest = rest.substr("U".length);
		
		var hasIndex = rest.match(/^[-+]?\d+/) !== null;
		
		obsel.type = "nav";
		obsel.string = "U";
		obsel.char = "U";
		
		if(hasIndex){
		
			index = rest.match(/^[-+]?\d+/)[0] // "3"
					
			rest = rest.substr(index.length);
			
			obsel.string = "U"+index;
		}
		else{
			obsel.string = "U";
		}
		
		list.push(obsel);
		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,2) == "En"){
		obsel.type = "nav";
		obsel.string = "En";
		obsel.char = "e";
		
		list.push(obsel);
		
		rest = rest.substr("En".length);	
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,2) == "Ii"){
				
		obsel.type = "input";
		obsel.string = "Ii";
		obsel.char = "t";
		
		list.push(obsel);
		
		rest = rest.substr("Ii".length);
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"Ia".length) == "Ia" && rest.substr(0,"Iae".length)!== "Iae"){
		
		
		rest = rest.substr("Ia".length);
		
		input = rest.match(/\[(.*?)\]/)[0] // "3"
		
		obsel.type = "input";
		obsel.string = "Ia"+input;
		obsel.char = "t";
		
		list.push(obsel);		
		
		rest = rest.substr(input.length);
				
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"Iae".length) == "Iae"){
		
		
		rest = rest.substr("Iae".length);
		
		input = rest.match(/\[(.*?)\]/)[0] // "3"
		
		obsel.type = "input";
		obsel.string = "Iae"+input;
		obsel.char = "t";
		
		list.push(obsel);		
		
		rest = rest.substr(input.length);		
		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"Id".length) == "Id"){
		
		
		rest = rest.substr("Id".length);
		
		//input = rest.match(/\[(.*?)\]/)[0] // "3"
		
		obsel.type = "input";
		obsel.string = "Id";
		obsel.char = "t";
		
		list.push(obsel);		
		
		
		//rest = rest.substr(input.length);
				
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,2) == "Mf"){
		
		
		rest = rest.substr("Mf".length);
		
		cf = rest.match(/\[(.*?)\]/)[0] // "3"
					
		rest = rest.substr(cf.length);
		
		nbd = rest.match(/\[(.*?)\]/)[0] // "3"
		
		obsel.type = "search";
		obsel.string = "Mf["+cf+"]["+nbd+"]";
		obsel.char = "s";
		
		list.push(obsel);
			
		rest = rest.substr(nbd.length);
				
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,2) == "Gd"){
		
		rest = rest.substr("Gd".length);
		
		index = rest.match(/^[-+]?\d+/)[0] // "3"
		
		obsel.type = "go";
		obsel.string = "Gd"+index;
		obsel.char = "g";
		
		list.push(obsel);
		
		rest = rest.substr(index.length);
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,2) == "Go"){
		
		rest = rest.substr("Go".length);
		
		index = rest.match(/\[(.*?)\]/)[0] // "3"
		
		obsel.type = "go";
		obsel.string = "Go"+index;
		obsel.char = "g";
		
		list.push(obsel);
		
		rest = rest.substr(index.length);
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"Gh".length) == "Gh"){
		
		rest = rest.substr("Gh".length);
		
		obsel.type = "go";
		obsel.string = "Gh";
		obsel.char = "g";
		
		list.push(obsel);
		
		ozavocal.SdParser(rest, list);
	}
	else if(rest.substr(0,"Gp".length) == "Gp"){
		
		rest = rest.substr("Gp".length);
		
		indDoc = rest.match(/^[-+]?\d+/)[0] // "3"
					
		rest = rest.substr(indDoc.length);
		
		rest = rest.substr("_".length);
		
		indPage = rest.match(/^[-+]?\d+/)[0] // "3"
					
		obsel.type = "go";
		obsel.string = "Gp"+indDoc+"_"+indPage;
		obsel.char = "g";
		
		list.push(obsel);
		
		rest = rest.substr(indPage.length);
		
		ozavocal.SdParser(rest, list);
	}
	else{
		
	}
};
//Sds
ozavocal.SdsParser = function(str, list){
	var rest = str;
	
	var obsel = {
		"type": "action",
		"string": "",
		
	};
	
	if(rest.substr(0,3) == "|in"){
		
		obsel.type = "load";
		obsel.string = "|in";
		obsel.char = "a";
		
		list.push(obsel);
		
		rest = rest.substr(3);
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,3) == "|ri"){
		
		obsel.type = "load";
		obsel.string = "|ri";
		obsel.char = "a";
		
		list.push(obsel);
		
		rest = rest.substr(3);		
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,3) == "|rt"){
		
		obsel.type = "load";
		obsel.string = "|rt";
		obsel.char = "a";
		
		list.push(obsel);
		
		list.push();
		
		rest = rest.substr(3);		
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,3) == "|Rn"){
		
		obsel.type = "load";
		obsel.string = "|Rn";
		obsel.char = "a";
		
		list.push(obsel);
		
		rest = rest.substr(3);		
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,2) == "Qu"){
		
		obsel.type = "escape";
		obsel.string = "Qu";
		obsel.char = "b";
		
		list.push(obsel);
				
		rest = rest.substr(2);	
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,2) == "ES"){
		
		obsel.type = "escape";
		obsel.string = "ES";
		obsel.char = "b";
		
		list.push(obsel);
		
		rest = rest.substr(2);	
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,1) == "L"){
		
		obsel.type = "nav";
		obsel.string = "L";
		obsel.char = "l";
		
		list.push(obsel);
		
		rest = rest.substr(1);	
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,1) == "*"){
				
		rest = rest.substr(1);
		
		index = rest.match(/^[-+]?\d+/)[0] // "3"
				
		obsel.type = "index";
		obsel.string = index;
		obsel.char = "i";
				
		list.push(obsel);
		
		//list.push("*"+index);
		
		rest = rest.substr(index.length);
		
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,1) == "R"){
		
		obsel.type = "nav";
		obsel.string = "R";
		obsel.char = "r";
				
		list.push(obsel);
		
		rest = rest.substr(1);	
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,1) == "D"){
		obsel.type = "nav";
		obsel.string = "D";
		obsel.char = "d";
				
		list.push(obsel);
		
		rest = rest.substr(1);	
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,2) == "En"){
		obsel.type = "nav";
		obsel.string = "En";
		obsel.char = "e";
		
		list.push(obsel);
		
		rest = rest.substr("En".length);	
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,2) == "Ii"){
		
		obsel.type = "input";
		obsel.string = "Ii";
		obsel.char = "t";
		
		list.push(obsel);
		
		rest = rest.substr("Ii".length);
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,2) == "Ia"){
				
		rest = rest.substr("Ia".length);
		
		input = rest.match(/\[(.*?)\]/)[0] // "3"
		
		obsel.type = "input";
		obsel.string = "Ia";
		obsel.char = "t";
		
		list.push(obsel);
		
		rest = rest.substr(input.length);
		
		
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,2) == "Mf"){
		
		
		rest = rest.substr("Mf".length);
		
		cf = rest.match(/\[(.*?)\]/)[0] // "3"
			
		rest = rest.substr(cf.length);
		
		nbd = rest.match(/\[(.*?)\]/)[0] // "3"
				
		obsel.type = "search";
		obsel.string = "Mf["+cf+"]["+nbd+"]";
		obsel.char = "s";
		
		list.push(obsel);
			
		rest = rest.substr(nbd.length);
				
		ozavocal.SdsParser(rest, list);
	}
	else if(rest.substr(0,2) == "Gd"){
		
		rest = rest.substr("Gd".length);
		
		index = rest.match(/^[-+]?\d+/)[0] // "3"
		
		obsel.type = "go";
		obsel.string = "Gd"+index;
		obsel.char = "g";
		
		list.push(obsel);
		
		//list.push("Gd"+index);
		
		rest = rest.substr(index.length);
		ozavocal.SdsParser(rest, list);
	}
	else{
		
	}
};
//Sd
ozavocal.messages = {
	"en": {
		"Sd" : "Show a document",
		"Sds": "Show a document list",
		"Sh": "Show a help",
		"Sv": "Show a view"
	}
};