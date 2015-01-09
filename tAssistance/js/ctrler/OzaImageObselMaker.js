tAssistance.OzaImageObselMaker = function(id,group,x,iObsel,src_obsel,complete){
	var src_obsel = src_obsel;
	this.x = x;
	//this.time = time;
	this.element;
	this.id = id;
	this.group = group;
	this.id = id;
	this.marked = false;
	this.type = "obsel";
	//this.complete = complete | function(){};
	
	this.clear = function(){
		var id =  this.id;
		// remove element
		this.element.parentNode.removeChild(this.element);
		//remove marked
		//if(this.marked)
		//	this.marked.clear();
		
		// remove dataset
		delete tAssistance.data[id];
	}
		
	// create element		
	var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	var y = tAssistance.svg.lines["line0"],
	r = 8;
	
	var base = {
		"x": x, "y": y, "color": color, "r": '10'
	}
	
	var imageObsel = new tAssistance.OzaImageObsel(src_obsel, "abc");
	
	var imageObselEl = tAssistance.dom.OzaImageObsel(src_obsel, base.x);
	
	imageObsel.element = imageObselEl;
	
	if(imageObselEl===false) return false;
	//element.setAttribute("data-id",id);
	group.element.appendChild(imageObselEl);
	group.childs.push(imageObsel);
	
	//var obsel = this;
	// add the event
	imageObselEl.onclick = function(e){
		//var obsel_in_html = obsel.renderProperty("#controlPanel");
		group.markObsel(imageObsel.src_obsel.id);
		
		var trace_graph = imageObsel.parent.parent;
		var obsel_list = trace_graph.obsel_list;
		
		if(!obsel_list) return;
		
		obsel_list.markObsel(imageObsel.src_obsel.id);
		
	};
		
	// add word-image
//	var word_div = imageObselEl.querySelector("div.word");
//	if(word_div){	
//	    //console.log(word_div);
//		var data = word_div.getAttribute("data");
//		var word_container = word_div.getAttribute("id");
//		var list = data.split(",");
//		
//		var doc = {
//			altoId : list[0]
//		};
//		var page = {
//			indPage : (parseInt(list[1])+1).toString()
//		};
//		var refW = parseInt(list[2]);
//		var word = {
//			x : parseInt(list[3]),
//			y : parseInt(list[4]),
//			w : parseInt(list[5]),
//			h : parseInt(list[6])
//		};
//		
//		
//		//instance d'un objet BlockImageCorrecT
//		  var block = Object.create(BlockImageCorrecT);
//		  
//		  //on initialise l'instance avec une valeur de zoom 
//		  block.init({
//		    deltaZoomView: -2  // zoom = image Haute Définition
//		  });
//		  
//		  //on initialise l'instance avec informations du document/page 
//		  block.getInfoTiles({
//		    altoId : doc.altoId,
//		    indPage :  page.indPage,
//		    callback : manageText // 'manageText' est une fonction callback appelée lorsque la connection au serveur d'image est prête 
//		  });
//		  
////		  var new_b = block.addMarge(
////				    {
////				      x: word.x,
////				      y: word.y,
////				      w: word.w,
////				      h: word.h,
////				    }, 2);  // marge de 2 px
//		  
//		  //La connection au serveur d'image est prête
//		  //var that = this;
//		  function manageText() {
//		      //ajoute le dessin du bloc 'word' au conteneur de id='word', et d'index '1'     
//			  block.addImage({
//		        container : word_container,
//		        idWord: (new Date()).getTime(),
//		        block: word
//		      });
//			  //that.complete();
//		  }
//		
//		
//	}
	
	
	
	// mark if have
	if(group.marked && group.marked.src_obsel_id == imageObsel.src_obsel.id){
		var markObsel = new tAssistance.markObsel(imageObsel);
	}
	
	
	
	// save the bi-references
	//this.element = element;
	//tAssistance.data[id] = this;
	
	
	
	
	
};