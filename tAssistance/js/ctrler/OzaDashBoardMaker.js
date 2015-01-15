tAssistance.OzaDashBoardMaker = function(id, element){
	var dashboard = new tAssistance.OzaDashBoard();
	
	// load the data for docList
	var store = new tStore.OzaTStoreClient();	
	var url = store.getAllDocs();
	
	var self = this;
	
	jQuery.getJSON(url,function(data){
		
		var docs = data;
		
		// modify doc input
		for(var i = 0; i<docs.length;i++){
			var doc = docs[i];
			var store = new tStore.OzaTStoreClient();
			var doc_uri = store.getDocUri(doc.id);
			
			doc.uri = doc_uri;
		}
		
		var docListMaker = new tAssistance.OzaTDocListMaker("abc", document.querySelector("[placeholder='page']"), docs);
		var docList = docListMaker.docList;
		
		dashboard.docList = docList;
		// modify the behaviors of the docList
		docList.doc_ids = [];
		docList.clickDoc = function(doc_id) {
			// sync with doc_ids
			var doc_ids = docList.doc_ids;
			var iDoc = doc_ids.indexOf(doc_id);
			if (iDoc >= 0) {// if exists
				doc_ids.splice(iDoc, 1);
			} else {// if not exists
				doc_ids.push(doc_id);
			}
			// call dashboard onclick
			dashboard.clickDoc(doc_ids);
		};
		// modify the behaviors of the children of docList
		for(var i = 0; i<docList.children.length;i++){
			var docRow = docList.children[i];
			var doc_id = docRow.doc.id;
			// add events to the docRow
			docRow.element.onclick = function(doc_id){
				return function(){
					docList.clickDoc(doc_id);
				};
			}(doc_id);
		}
		
	});
	
	var as_store = new tAssistance.OzaAssistantClient();	
	//var as_store = store.uri();
	var word_url = as_store.uri+"api.php/words";
	
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
	
//	var obsels_url = "http://localhost/tconnect/project/Ozalid/TStore/api.php/query?docids=538c84bce4b04f38ac735311&wordids=538c84bce4b04f38ac735311_538c84bee4b04f38ac735325_1073463512";
//	
//	jQuery.getJSON(obsels_url,function(obsels){
//		console.log(obsels);
//		
//		var trace = {
//			"obsels": obsels
//		}
//	
//		var doc = new tAssistance.TraceDoc("ee",document.body, trace);
//		dashboard.obselList = doc;
//		
//	});
	
	this.dashboard = dashboard;
};