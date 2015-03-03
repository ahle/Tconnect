tAssistance.Selector = {
	renderEditor: function(parentNode){
		$.get("index.php?page=selector&p1=new",function(data){
			$(parentNode).empty().append(data);
			
			var btSave = parentNode.querySelector("button[name='save']");
			btSave.addEventListener("click",function(){
				var script = "";
				
				if(parentNode.data_mode=="custom"){
					var selector_id = parentNode.querySelector("input[name='id']").value;
					var script = parentNode.querySelector("textarea[name='script']").value;						
					
					var selector = { "id": selector_id, "script": script };
											
					 $.ajax({
						  type: "PUT",
						  url: "api.php?o=selector",
						 data: JSON.stringify(selector)
						})
						  .done(function( msg ) {
							console.log( "The selector is posted!");
						    tAssistance.selector.renderList(parentNode);
						  });
				}
				else if(parentNode.data_mode=="obsel_type"){
					var selector_id = parentNode.querySelector("input[name='id']").value;
					var obsel_type = parentNode.querySelector("select[name='obsel_type']").value;
					
					var script = "function(obsel){";
					script += "	if(obsel['"+tAssistance.obsel.type+"']=='"+obsel_type+"'){";
					script += "		return true;";
					script += "	}";
					script += "	return false;";
					script += "}";
					
					var selector = { "id": selector_id, "script": script };
					
					$.ajax({
						  type: "PUT",
						  url: "api.php?o=selector",
						 data: JSON.stringify(selector)
						})
						  .done(function( msg ) {
							console.log( "The selector is posted!");
						    tAssistance.selector.renderList(parentNode);
						  });
				}
			});
			var btClose = parentNode.querySelector("button.close");
			btClose.addEventListener("click", function(){
				parentNode.innerHTML='';
			});
			
			var select_type = parentNode.querySelector("select[name='type']");
			select_type.addEventListener("change", function(){
				var type = select_type.value;
				tAssistance.selector.renderType(parentNode, type);
			});
		});
	},
	renderList: function(parentNode){
		$.get("index.php?page=selector&p1=all",function(data){
			$(parentNode).empty().append(data);
			
			// add event listeners
			var btNew = parentNode.querySelector("button[name='new']");
			var btRemove = parentNode.querySelector("button[name='remove']");
			btNew.addEventListener("click",function(){
				tAssistance.selector.renderEditor(parentNode);
			});
			
			btRemove.addEventListener("click",function(){
				var checkboxes = parentNode.querySelectorAll("input[type='checkbox']");
				for(var i=0;i<checkboxes.length;i++){
					var checkbox = checkboxes[i];
					if(checkbox.checked){
						var selector_id = checkbox.name;
						$.ajax({
							  type: "DELETE",
							  url: "api.php?o=selector&p1="+selector_id,
							})
							  .done(function( msg ) {
							    console.log( "Delete selector !");
							    tAssistance.selector.renderList(parentNode);
							  });
					}
				}				
			});
			
		});
	},
	renderType: function(parentNode,type){
		var selector_div = parentNode.querySelector("div[name='selector_config']");
		
		
		if(type=="obsel_type"){
			var obsels = tAssistance.obsels.getLocalObsels();
			var obsel_types = tAssistance.obsels.selectObselTypes(obsels);
			
			var html="";
			html += "<div class=\"control-group\">";
			html += "<label class=\"col-xs-2 control-label\">Obsel Type <\/label>";
			html += "<div class=\"controls\">";
			html += "  <select name=\"obsel_type\" class=\"span2\">   ";
			for(var i=0;i<obsel_types.length;i++){
				var obsel_type = obsel_types[i];
				html += "      <option value='"+obsel_type+"'>"+obsel_type+"<\/option>";
			}
			html += "  <\/select>";
			html += "<\/div>";
			html += "<\/div>";


			selector_div.innerHTML = html;
			parentNode.data_mode = "obsel_type";
		}
		else if(type=="custom"){
			var html="";
			html += "<div class=\"control-group\">";
			html += "<label class=\"col-xs-2 control-label\">Script <\/label>";
			html += "  <div class=\"controls\">";
			html += "    <textarea name=\"script\" class=\"span3\" rows=\"10\" placeholder=\"The syntax used is Javascript.\">";
			html += "function(obsel){";
			html += "	if(obsel['@type']=='m:oze_cw'){";
			html += "		return true;";
			html += "	}";
			html += "	return false;";
			html += "}";
			html += "    <\/textarea>  ";
			html += "  <\/div>";
			html += "<\/div>";

			selector_div.innerHTML = html;
			parentNode.data_mode = "custom";		
		}
	}
};