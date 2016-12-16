tAssistance.OzaMaker = function(){
	
};

tAssistance.OzaTraceHeaderMaker = function(trace){
	
	if(trace.properties.type == "UserDoc"){
		
	}	
};

tAssistance.ObselSelectorMaker = function(model){
	
	
	
	
};

tAssistance.OzaDocMaker = function(doc){
	var article = document.createElement("article");
	article.setAttribute("id", "ARTICLE_1");
	
	var html="";
	html += "	<div id=\"DIV_2\">";
	html += "";
	html += "		<img id=\"CANVAS_3\" src='"+doc.img+"'>";
	html += "		<\/img>";
	html += "	<\/div>";
	html += "	<div id=\"DIV_4\">";
	html += "		<h2 id=\"H2_5\">";
	html += "			"+doc.title+"";
	html += "		<\/h2>";
	html += "		<dl id=\"DL_6\">";
	html += "			<dt id=\"DT_7\">";
	html += "				Auteur :";
	html += "			<\/dt>";
	html += "			<dd id=\"DD_8\">";
	html += "				"+doc.author+"";
	html += "			<\/dd>";
	html += "			<dt id=\"DT_9\">";
	html += "				Editeur :";
	html += "			<\/dt>";
	html += "			<dd id=\"DD_10\">";
	html += "				"+doc.publisher+"";
	html += "			<\/dd>";
	html += "			<dt id=\"DT_11\">";
	html += "				Année :";
	html += "			<\/dt>";
	html += "			<dd id=\"DD_12\">";
	html += "				"+doc.date+"";
	html += "			<\/dd> <!--";
	html += "			<dt>";
	html += "				Genre :";
	html += "			<\/dt>";
	html += "			<dd>";
	html += "				"+doc.genre+"";
	html += "			<\/dd> -->";
	html += "			<dt id=\"DT_13\">";
	html += "				Nombre de pages :";
	html += "			<\/dt>";
	html += "			<dd id=\"DD_14\">";
	html += "				"+"";
	html += "			<\/dd>";
	html += "		<\/dl>";
	html += "	<\/div>";

	article.innerHTML = html;
	
	document.querySelector("[placeholder='page']").appendChild(article);	
};

tAssistance.OzaObselConfigActiveBtnMaker = function(params){
	var btn = params.btn;
	var obsel = params.obsel;
	
	btn.onclick = function(){
		return function(){
			obsel.active = !obsel.active;
			btn.innerHTML = obsel.active ? "show": "hide";
			
			var store = new tAssistance.Store();
			var user = tAssistance.Page.UserConfig;
			
			store.updateUserConfig(user);			
		};
	}();
};





