tMining.DataMaker = function(traces){
	
	var vectors = [];
	
	for(var i in traces){
		var trace = traces[i];
	
		var type_of_trace = trace.type;
		var index_of_trace = trace.obsels[1];
		
		// ....
		
		
		
		
		var vector = [type_of_trace, index_of_trace];
		
		vectors.push(vector);
	}	
	
	return vectors;
};

tMining.VectorDistance = function(vector1, vector2){
	
	
	
	
	
	
};

tMining.allUsers = [{"id":"ANONYMOUS","user":null},{"id":"alain","user":null},{"id":"S\u00e9bastien","user":null},{"id":"hoang","user":null},{"id":"anh-hoang.le","user":null}];
tMining.targetUser = {"id":"hoang"};
tMining.allItems = [
                    {
                        "refDocId": null,
                        "altoId": "1025030",
                        "title": "Atlas des champignons comestibles et vénéneux... accompagné d'un texte explicatif... par Joseph Roques. Extrait de la 2e édition",
                        "author": "Roques, Joseph (Dr)",
                        "genre": "MONOGRAPHIE",
                        "publisher": "V. Masson",
                        "date": "1864",
                        "img": "http://localhost/tconnect/project/Ozalid/TStore/db/img/3.jpg",
                        "id": "538c8490e4b04f38ac7352c1"
                      },
                      {
                        "refDocId": null,
                        "altoId": "5530463",
                        "title": "Traité des voitures pour servir de supplément au \"Nouveau parfait maréchal\" . Avec la construction d'une berline nouvelle nommée l'inversable",
                        "author": "Garsault, François-Alexandre-Pierre de (1693-1778)",
                        "genre": "MONOGRAPHIE",
                        "publisher": "Leclerc (Paris)",
                        "date": "1756",
                        "img": "http://localhost/tconnect/project/Ozalid/TStore/db/img/2.jpg",
                        "id": "538c84ffe4b04f38ac73544e"
                      },
                      {
                        "refDocId": null,
                        "altoId": null,
                        "title": null,
                        "author": null,
                        "genre": null,
                        "publisher": null,
                        "date": null,
                        "img": "https://ozalid.orange-labs.fr/oztiles//_/0/0/0.png",
                        "id": "546ef1c8e4b091320026c063"
                      },
                      {
                        "refDocId": null,
                        "altoId": null,
                        "title": null,
                        "author": null,
                        "genre": null,
                        "publisher": null,
                        "date": null,
                        "img": "https://ozalid.orange-labs.fr/oztiles//_/0/0/0.png",
                        "id": "546ecd9ce4b091320026afd6"
                      },
                      {
                        "refDocId": null,
                        "altoId": "0062367",
                        "title": "Le viandier / de Guillaume Tirel dit Taillevent ; publ. par le baron Jérôme Pichon et Georges Vicaire",
                        "author": "Taillevent (1314?-1395)",
                        "genre": "MONOGRAPHIE",
                        "publisher": "Techener (Paris)",
                        "date": "1892",
                        "img": "http://localhost/tconnect/project/Ozalid/TStore/db/img/1.jpg",
                        "id": "546ed25ee4b091320026b1b0"
                      }
                    ];
tMining.ratedItems = [{"user_id":"ANONYMOUS","doc_id":"546ed25ee4b091320026b1b0", "rate":3}];
tMining.UserSimilarity = function(item1, item2){
	
	
	
	
};
tMining.Matrix
tMining.Bahavior = function(){
	
	
};
tMining.Prediction = function(user, item){
	var predictedRate = 0;
	
	
	
	
};

tMining.Neighbour = function(user){
	var allusers = tMining.allusers;
	
//	for(){
//		
//	}
	
	
	return neighbour;
};

tMining.PearsonSimilarity = function(user1, user2){
	
	var common_items = function(user1, user2){
		
	};
	
	var iterate = function(list, todo){
		
	};
	
	sum(iterate(common_items, function(item){
		rate(user,item)-rate(neighbour, item);
	}));	
};

tMining.test = function(){
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
};



