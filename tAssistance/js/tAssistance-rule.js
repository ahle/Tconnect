tAssistance.rule = {
	renderEditor: function(parentNode){
		$.get("index.php?page=rule&p1=new",function(data){
			$(parentNode).empty().append(data);
			
			// add event listeners
			var btSave = parentNode.querySelector("button[name='save']");
			btSave.addEventListener("click",function(){
				var script = "";
				
				var rule_id = parentNode.querySelector("input[name='id']").value;
				var select_selector = parentNode.querySelector("select[name='selector']");
				var selector_id = select_selector.value;
				var select_style = parentNode.querySelector("select[name='style']");
				var style_id = select_style.value;
				var priority =  parentNode.querySelector("input[name='priority']").value;
				
				var rule = {
					"id": rule_id,
					"selector": selector_id,
					"style": style_id,
					"priority": priority
				}
				
				$.ajax({
					  type: "PUT",
					  url: "api.php?o=rule",
					 data: JSON.stringify(rule)
					})
					  .done(function( msg ) {
						console.log( "The rule is posted!");
					    tAssistance.rule.renderList(parentNode);
					  });
				
			});
			var btClose = parentNode.querySelector("button.close");
			btClose.addEventListener("click", function(){
				parentNode.innerHTML='';					
			});
		});
	},
	renderList: function(parentNode){
		$.get("index.php?page=rule&p1=all",function(data){
			$(parentNode).empty().append(data);
			
			// add event listeners
			var btNew = parentNode.querySelector("button[name='new']");
			var btRemove = parentNode.querySelector("button[name='remove']");
			btNew.addEventListener("click",function(){
				tAssistance.rule.renderEditor(parentNode);
			});
			
			btRemove.addEventListener("click",function(){
				var checkboxes = parentNode.querySelectorAll("input[type='checkbox']");
				for(var i=0;i<checkboxes.length;i++){
					var checkbox = checkboxes[i];
					if(checkbox.checked){
						var rule_id= checkbox.name;
						$.ajax({
							  type: "DELETE",
							  url: "api.php?o=rule&p1="+rule_id,
							})
							  .done(function( msg ) {
							    console.log( "Delete rule !");
							    tAssistance.rule.renderList(parentNode);
							  });
					}
				}
				
				
			});
		});
	},
	loadRules: function(){
		$.get("api.php?o=rule&p1=full",function(data){
			localStorage["tAssistance.rules"] = data;
			if(document.createEvent){
				event = document.createEvent("CustomEvent");
				event.initEvent("loadedRules", true, true);
				event.data = {};
				document.dispatchEvent(event);
			}
		});
	},
};