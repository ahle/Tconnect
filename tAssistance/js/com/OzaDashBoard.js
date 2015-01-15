tAssistance.OzaDashBoard = function(){
	this.element = document.querySelector("[placeholder='page']");;
	this.docList;
	this.wordList;
	
	var dashboard = this;
	this.load = function(){
		
		
	};
	
	
	this.clickDoc = function(doc_ids){
		console.log(doc_ids);
		var docList = this.docList;
		for (var j = 0; j < docList.children.length; j++) {
			var child = docList.children[j];
			var matched = false;
			for (var i = 0; i < doc_ids.length; i++) {
				var doc_id = doc_ids[i];
				
				if (child.doc.id == doc_id) {
					$(child.element).addClass("selected");
					matched = true;
					break;
				}
			}
			if(!matched){
				$(child.element).removeClass("selected");
			}
		}
		this.updateWordList();
	};
	
	this.clickWord = function(word_ids){
		console.log(word_ids);
		var wordList = this.wordList;
		for (var j = 0; j < wordList.children.length; j++) {
			var child = wordList.children[j];
			var matched = false;
			for (var i = 0; i < word_ids.length; i++) {
				var word_id = word_ids[i];
				
				if (child.word.id == word_id) {
					$(child.element.querySelector(".bar")).addClass("selected");
					matched = true;
					break;
				}
			}
			if(!matched){
				$(child.element.querySelector(".bar")).removeClass("selected");
			}
		}
		this.updateObselList();
	};
	
	this.updateWordList = function(){
		
		var tstore = new tStore.OzaTStoreClient();
		var word_url = tstore.uri+"/words?docids="+this.docList.doc_ids;
		
		this.wordList.element.parentNode.removeChild(this.wordList.element);
		
		jQuery.getJSON(word_url,function(countedItems){
			console.log(countedItems);
			
			var wordset = [];
			
			for(var i=0;i<countedItems.length;i++){
				var countedItem = countedItems[i];
							
				var item = {
					"label": countedItem.textWord,
					"value": countedItem.occurenceNb,
					"id": countedItem.idWord,
				};
				wordset.push(item);			
			}
		
			// add a FreWord
			var maker = new tAssistance.OzaWordListMaker("aa", dashboard, wordset);
			var wordList = maker.wordList;
			dashboard.wordList = wordList;
			
			// modify the behaviors of the wordList
			wordList.word_ids = [];
			wordList.clickWord = function(word_id) {
				// sync with doc_ids
				var word_ids = wordList.word_ids;
				var iWord = word_ids.indexOf(word_id);
				if (iWord >= 0) {// if exists
					word_ids.splice(iWord, 1);
				} else {// if not exists
					word_ids.push(word_id);
				}
				// call dashboard onclick
				dashboard.clickWord(word_ids);
			};
			// modify the behaviors of the children of docList
			for(var i = 0; i<wordList.children.length;i++){
				var wordRow = wordList.children[i];
				var word_id = wordRow.word.id;
				// add events to the docRow
				wordRow.element.onclick = function(word_id){
					return function(){
						wordList.clickWord(word_id);
					};
				}(word_id);
			}
			
		});
		
		
	};
	
	this.updateObselList = function(){
		/*this.obselList.element.parentNode.removeChild(this.obselList.element);
		
		jQuery.getJSON(obsels_url,function(obsels){
			console.log(obsels);
			
			var trace = {
				"obsels": obsels
			}
		
			var doc = new tAssistance.TraceDoc("ee",document.body, trace);
			dashboard.obselList = doc;
			
		});	*/
		
	}
};