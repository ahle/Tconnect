tAssistance.ui.sequenceobsel = {
	"data": {},	
	"ctler": {},
	"dom": {}
};

tAssistance.ui.sequenceobsel.data.example1 = [
                                                 {
                                                    "type": "obselType",
                                                    "id": "nav",
                                                    "icon": "nav",                                                
                                                    "active": true,
                                                    "properties": [
                                                    ],
                                                    "icon_img": "img/img.php/nav"
                                                  },
                                                {
                                                    "type": "obselType",
                                                    "id": "index",
                                                    "icon": "index",                                                
                                                    "active": true,
                                                    "properties": [
                                                    ],
                                                    "icon_img": "img/img.php/index"
                                                  },
                                                  {
                                                      "type": "obselType",
                                                      "id": "load",
                                                      "icon": "index",                                                
                                                      "active": true,
                                                      "properties": [
                                                      ],
                                                      "icon_img": "img/img.php/load"
                                                    },
                                                    {
                                                        "type": "obselType",
                                                        "id": "input",
                                                        "icon": "input",                                                
                                                        "active": true,
                                                        "properties": [
                                                        ],
                                                        "icon_img": "img/img.php/input"
                                                      },
                                                      {
                                                          "type": "obselType",
                                                          "id": "search",
                                                          "icon": "search",                                                
                                                          "active": true,
                                                          "properties": [
                                                          ],
                                                          "icon_img": "img/img.php/search"
                                                        },
                                                        {
                                                            "type": "obselType",
                                                            "id": "go",
                                                            "icon": "go",                                                
                                                            "active": true,
                                                            "properties": [
                                                            ],
                                                            "icon_img": "img/img.php/go"
                                                          },
                                                          {
                                                              "type": "obselType",
                                                              "id": "escape",
                                                              "icon": "escape",                                                
                                                              "active": true,
                                                              "properties": [
                                                              ],
                                                              "icon_img": "img/img.php/escape"
                                                            }
                                              ];

tAssistance.ui.sequenceobsel.ctler.SequenceObselMaker = function(params){
	
	var obsels = params.obsels;
	
	var layout = tAssistance.ui.sequenceobsel.dom.SequenceObselLayout();
	
	
	for(var i in obsels){
		
		var obsel = obsels[i];
		
		var params = {
			"obsel": obsel,
			"configs": tAssistance.ui.sequenceobsel.data.example1
		};
		
		var obsel_el = tAssistance.ui.sequenceobsel.ctler.ObselIconMaker(params);
		
		layout.querySelector("div.list").appendChild(obsel_el);
		
	}
	
	return layout;	
};


tAssistance.ui.sequenceobsel.dom.SequenceObselLayout = function(params){
	
	var box = document.createElement('div');
	$(box).css("overflow-x","scroll");
	//$(box).css("overflow-y","scroll");
	//$(box).css('display', "inline" );
	$(box).css("height","40px");
	$(box).css("width","1000px");
	
	var list = document.createElement('div');
	list.setAttribute("class","list");
	$(list).css('white-space', "nowrap" );
	$(list).css('display', "inline" );
	
	box.appendChild(list);
	
	return box;
};

tAssistance.ui.sequenceobsel.dom.ObselIcon = function(params){
	
	var img = 'img/img.php/button';
	if(params && params.img)
		img = params.img;
	
	drawnObsel = document.createElement('img');
	drawnObsel.setAttribute('src', img);
	//$(drawnObsel).css('float', "left" );
	$(drawnObsel).css('display', "inline-block" );
	drawnObsel.setAttribute('width', '20px' );
	drawnObsel.setAttribute('height', '20px' );
	//drawnObsel.appendChild(document.createTextNode(text));
	return drawnObsel;
};

tAssistance.ui.sequenceobsel.ctler.ObselIconMaker = function(params){
	var new_obsel = params.obsel;
	var configs = params.configs;
	
	var icon = false;
	
	for(var i in configs){
		var obselConfig = configs[i]; 
		
		if(new_obsel.type==obselConfig.id){
			if(obselConfig.active==true){
				var params = {
					"obsel": obselConfig,
					"new_obsel": new_obsel
				}
				var ok = tAssistance.ui.sequenceobsel.ctler.ObselTester(params);
				
				if(ok==true){
//					var params = {
//						"img": obselConfig.icon_img
//					};						
					
					//var icon = tAssistance.dom.OzaObselIcon(params);
					
					var params = {
							"img": obselConfig.icon_img
					};
					
					var icon = tAssistance.ui.sequenceobsel.dom.ObselIcon(params);
					return icon;
				}				
			}				
		}		
	}
	
	if(icon == false){
		var icon = tAssistance.ui.sequenceobsel.dom.ObselIcon();
		return icon;
	}
};

tAssistance.ui.sequenceobsel.ctler.ObselTester = function(params){
	var obsel = params.obsel;
	var properties = obsel.properties;
	var new_obsel = params.new_obsel;
	
	var tester = true;
	var testers = [];
	var ok = true;
	
	for(var i in properties){
		var property = properties[i];
		
		var params = {
			"property": property,
			"obsel": new_obsel
		}
		
		var property_ok = tAssistance.ui.sequenceobsel.ctler.PropertyTester(params);
		
		ok = ok && property_ok;
	}
	
	return ok;
};

tAssistance.ui.sequenceobsel.ctler.PropertyTester = function(params){
	var property = params.property;
	var name = property.name;
	var contraint = property.contraint;
	var obsel = params.obsel;
		
	var ok = false;
	
	if(contraint.name=="string"){
		try{
			var ok =  obsel[name].indexOf(contraint.regex) != -1;
			return ok;
		}
		catch(e){
			
		}
	}else if(contraint.name=="number"){	
		try{
			var ok =  obsel[name] > contraint.min;
			return ok;			
		}
		catch(e){
			
		}
	}
	return ok;
};