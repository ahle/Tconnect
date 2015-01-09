tAssistance.OzaTextObselMaker = function(id,parentNode,src_obsel){
	// properties and events for the object controller
	//this.src_obsel = src_obsel;
	//this.parent = parent;
	//this.id = id;
	//this.type="obsel";
	
	var textObsel = new tAssistance.OzaTextObsel(id, src_obsel);
	
	var textObselEl = new tAssistance.dom.OzaTextObsel(id, src_obsel);
	
	parentNode.appendChild(textObselEl);
//	textObsel.click = function(){
//		var src_obsel_id = src_obsel.id;
//		this.parent.markObsel(src_obsel_id);
//		
//		var obsel_list = this.parent;
//		var group = obsel_list.trace_graph.group;
//		
//		if(!group) return;
//		
//		group.markObsel(obsel.src_obsel.id);
//		group.moveTo(obsel.src_obsel.id);
//	};
	
	
	// add events to the element
//	var moreBtn = textObsel.querySelector("a[data-more]");
//	var detailP = textObsel.querySelector("p[name='detail']");
//	
//	moreBtn.onclick = function(){
//		
//		var display = detailP.style.display;
//		if(display=="none"){
//			moreBtn.innerHTML = moreBtn.dataset["less"];
//			detailP.style.display = "block";
//		}
//		else{
//			moreBtn.innerHTML = moreBtn.dataset["more"];
//			detailP.style.display = "none";
//		}	
//	};	
//	
//	var obsel = this;
//	textObsel.onclick = function(){
//		obsel.click();
//	};
//	// add word-image
//	var word_div = element.querySelector("div.word");
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
//		    deltaZoomView: -1  // zoom = image Haute Définition
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
//		  function manageText() {
//		      //ajoute le dessin du bloc 'word' au conteneur de id='word', et d'index '1'     
//			  block.addImage({
//		        container : word_container,
//		        idWord: (new Date()).getTime(),
//		        block: word
//		      });
//		  }
//		
//		
//	}
	
	
	
	
};