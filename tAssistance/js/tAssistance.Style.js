tAssistance.style = {
	renderEditor: function(parentNode){
			$.get("index.php?page=style&p1=new",function(data){
				// render the html elements for editor
				$(parentNode).empty().append(data);
				// add event listeners
				var btSave = parentNode.querySelector("button[name='save']");
				btSave.addEventListener("click",function(){
					var script = "";
					if(parentNode.data_element=="circle"){
						var style_id = parentNode.querySelector("input[name='style_id']").value;
						var icon = parentNode.querySelector("input[name='icon']").value;
						var cx = parentNode.querySelector("input[name='cx']").value;
						var cy = parentNode.querySelector("input[name='cy']").value;
						var r =  parentNode.querySelector("input[name='r']").value;
						var color =  parentNode.querySelector("input[name='color']").value || 'orange';
						
						var params = {"cx": cx, "cy": cy, "r": r, "color": color};
						
						var script_no_input = "function(obsel,auto){" +
						"drawnObsel = document.createElementNS('http://www.w3.org/2000/svg','circle');" +
						"drawnObsel.setAttributeNS(null,'cx', '%cx%' || auto.x );" +
						"drawnObsel.setAttributeNS(null,'cy', '%cy%' || auto.y );" +
						"drawnObsel.setAttributeNS(null,'r', '%r%' || auto.r );" +
						"drawnObsel.setAttributeNS(null,'style','fill: %color%; stroke: black');" +
						"return drawnObsel;" +
						"}";
						var script = script_no_input;
						for(var name in params){
							script = script.replace('%'+name+'%', params[name]);
						}
						
						var style = { "id": style_id, "script": script, "icon": icon || "img/default.png"};
						
						 $.ajax({
							  type: "PUT",
							  url: "api.php?o=style",
							  data: JSON.stringify(style)
							})
							  .done(function( msg ) {
							    console.log( "The style is posted!");
							    tAssistance.style.renderList(parentNode);
							  });
						
					}
					else if(parentNode.data_element=="image"){
						var style_id = parentNode.querySelector("input[name='style_id']").value;
						var icon = parentNode.querySelector("input[name='icon']").value;
						var x = parentNode.querySelector("input[name='x']").value;
						var y = parentNode.querySelector("input[name='y']").value;
						var width =  parentNode.querySelector("input[name='width']").value;
						var height =  parentNode.querySelector("input[name='height']").value;
						var href =  parentNode.querySelector("input[name='href']").value;
						
						var params = {"x": x, "y": y, "width": width, "height": height,"href": href};
						
						var script_no_input = "function(obsel,auto){" +
						"drawnObsel = document.createElementNS('http://www.w3.org/2000/svg','image');" +
						"drawnObsel.setAttributeNS(null,'x', '%x%' || auto.x );" +
						"drawnObsel.setAttributeNS(null,'y', '%y%' || auto.y );" +
						"drawnObsel.setAttributeNS(null,'width', '%width%' || '20' );" +
						"drawnObsel.setAttributeNS(null,'height', '%height%' || '20' );" +
						"drawnObsel.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href', '%href%' || '' );" +
						"return drawnObsel;" +
						"}";
						var script = script_no_input;
						for(var name in params){
							script = script.replace('%'+name+'%', params[name]);
						}
						
						var style = { "id": style_id, "script": script, "icon": icon || "img/default.png" };
						
						 $.ajax({
							  type: "PUT",
							  url: "api.php?o=style",
							  data: JSON.stringify(style)
							})
							  .done(function( msg ) {
							    console.log( "The style is posted!");
							    tAssistance.style.renderList(parentNode);
							  });
						
					}
					else if(parentNode.data_element=="custom"){
						console.log("custom is logged");
						var style_id = parentNode.querySelector("input[name='style_id']").value;
						var icon = parentNode.querySelector("input[name='icon']").value;
						var script = parentNode.querySelector("textarea[name='script']").value;						
						
						var style = { "id": style_id, "script": script, "icon": icon || "img/default.png"};
												
						 $.ajax({
							  type: "PUT",
							  url: "api.php?o=style",
							 data: JSON.stringify(style)
							})
							  .done(function( msg ) {
								console.log( "The style is posted!");
							    tAssistance.style.renderList(parentNode);
							  });
						
					}
					
					
				});
				var btClose = parentNode.querySelector("button.close");
				btClose.addEventListener("click", function(){
					parentNode.innerHTML='';					
				});
				
				var select_element = parentNode.querySelector("select[name='elements']");
				// load element parameters
				select_element.addEventListener("change", function(e){
					console.log(e);
					var value = null;
					var options = select_element.getElementsByTagName("option");
					for(var i=0;i<options.length;i++){
						var option = options[i];
						if(option.selected){
							value=option.value;
						}
					}
					tAssistance.style.renderElement(parentNode,value);
					
				},false);
			});
		},
	renderList: function(parentNode){
			$.get("index.php?page=style&p1=all",function(data){
				$(parentNode).empty().append(data);
				// add event listeners
				var btNew = parentNode.querySelector("button[name='new']");
				var btRemove = parentNode.querySelector("button[name='remove']");
				btNew.addEventListener("click",function(){
					tAssistance.style.renderEditor(parentNode);
				});
				
				btRemove.addEventListener("click",function(){
					var checkboxes = parentNode.querySelectorAll("input[type='checkbox']");
					for(var i=0;i<checkboxes.length;i++){
						var checkbox = checkboxes[i];
						if(checkbox.checked){
							var style_id= checkbox.name;
							$.ajax({
								  type: "DELETE",
								  url: "api.php?o=style&p1="+style_id,
								})
								  .done(function( msg ) {
								    console.log( "Delete style !");
								    tAssistance.style.renderList(parentNode);
								  });
						}
					}
					
					
				});
				
			});
		},
	post: function(formNode){
			
			var style_id = formNode.querySelector("input[name='style_id']").value;
			var style =	"function(obsel){" +
				"myCircle = document.createElementNS(svgNS,'circle');" +
				"myCircle.setAttributeNS(null,'cx', x);" +
				"myCircle.setAttributeNS(null,'cy', y);" +
				"myCircle.setAttributeNS(null,'r', r);" +
				"myCircle.setAttributeNS(null,'class', 'obsel');" +
				"myCircle.setAttributeNS(null,'style','fill: yellow; stroke: black');" +
				"return myCircle;" +
				"}";
				
			
			 
		},
	renderElement: function(parentNode,element){
		if(element=="circle"){
			var element_div = parentNode.querySelector("div[name='element_config']");
			
			var html="";
			html += "<div class='control-group'>";
			html += "<label class='col-xs-2 control-label'>Cx<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='number' name='cx' placeholder='auto' class='span1'>";
			html += "  <\/div>";
			html += "<\/div>";
			html += "<div class='control-group'>";
			html += "<label class='col-xs-2 control-label'>Cy<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='number' name='cy' placeholder='auto' class='span1'>";
			html += "  <\/div>";
			html += "<\/div>";
			html += "<div class='control-group'>";
			html += "  <label class='col-xs-2 control-label'>Radius<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='number' name='r' placeholder='auto' class='span1'>";
			html += "  <\/div>";	
			html += "<\/div>";
			html += "<div class='control-group'>";
			html += "  <label class='col-xs-2 control-label'>Color<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='text' name='color' placeholder='auto' class='span2'>";
			html += "  <\/div>";
			html += "<\/div>";
			html += "";

			element_div.innerHTML = html;
			
			var select_color =  parentNode.querySelector("input[name='color']");
			$(select_color).colorpicker();
			
			parentNode.data_element = "circle";
		}
		else if(element=="image"){
			var element_div = parentNode.querySelector("div[name='element_config']");
			
			var html = "";
			html += "<div class='control-group'>";
			html += "<label class='col-xs-2 control-label'>x<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='number' name='x' placeholder='auto' class='span1'>";
			html += "  <\/div>";
			html += "<\/div>";
			html += "<div class='control-group'>";
			html += "<label class='col-xs-2 control-label'>y<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='number' name='y' placeholder='auto' class='span1'>";
			html += "  <\/div>";
			html += "<\/div>";
			html += "<div class='control-group'>";
			html += "  <label class='col-xs-2 control-label'>width<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='number' name='width' placeholder='auto' class='span1'>";
			html += "  <\/div>";
			html += "<\/div>";
			html += "<div class='control-group'>";
			html += "  <label class='col-xs-2 control-label'>height<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='number' name='height' placeholder='auto' class='span1'>";
			html += "  <\/div>";
			html += "<\/div>";
			html += "<div class='control-group'>";
			html += "  <label class='col-xs-2 control-label'>xlink:href<\/label>";
			html += "  <div class='controls'>";
			html += "    <input type='text' name='href' placeholder='auto' class='span1'>";
			html += "  <\/div>";
			html += "<\/div>";
			
			element_div.innerHTML = html;
			parentNode.data_element = "image";

		}
		else if(element=="custom"){
			var element_div = parentNode.querySelector("div[name='element_config']");
			
			var html="";
			html += "<div class=\"control-group\">";
			html += "<label class=\"col-xs-2 control-label\">Script <\/label>";
			html += "  <div class=\"controls\">";
			html += "    <textarea name=\"script\" class=\"span3\" rows=\"10\" placeholder=\"The syntax used is Javascript. The defined variables can be used as x,y\">";
			html += "function(obsel,base){\n" +
					"drawnObsel = document.createElementNS('http:\/\/www.w3.org\/2000\/svg','circle');\n" +
					"drawnObsel.setAttributeNS(null,'cx', '' || base.x );\n" +
					"drawnObsel.setAttributeNS(null,'cy', '' || base.y );\n" +
					"drawnObsel.setAttributeNS(null,'r', '' || base.r );\n" +
					"drawnObsel.setAttributeNS(null,'style','fill: yellow; stroke: black');\n" +
					"return drawnObsel;\n" +
					"}";		
			html += "<\/textarea>  ";
			html += "  <\/div>";
			html += "<\/div>";
			
			element_div.innerHTML = html;
			parentNode.data_element = "custom";
		}
	}
};