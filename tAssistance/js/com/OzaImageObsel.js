tAssistance.OzaImageObsel = function(obsel, x){
		if(obsel.type=="ozec_w"){
			var alto_id = obsel.altoID,
				ind_page =  obsel.indPage,
				rfW = obsel.info_rfW,
				info_xywh = obsel.info_xywh;
			
			foreignObject = document.createElementNS('http:\/\/www.w3.org\/2000\/svg','foreignObject');
			foreignObject.setAttributeNS(null,'x', x );
			foreignObject.setAttributeNS(null,'y', '40' );
			foreignObject.setAttributeNS(null,'width', '200' );
			foreignObject.setAttributeNS(null,'height', '40' );
					
			wordObsel = document.createElement("div");
			wordObsel.setAttribute('id', "word"+(new Date).getTime()+""+Math.floor((Math.random()*100)));
			wordObsel.setAttribute('class', "word");
			wordObsel.setAttribute('data', alto_id+","+ind_page+","+rfW+","+info_xywh);
			
			foreignObject.appendChild(wordObsel);
			return foreignObject;
		}
		else{
			drawnObsel = document.createElementNS('http:\/\/www.w3.org\/2000\/svg','image');
			drawnObsel.setAttributeNS(null,'x', x );
			drawnObsel.setAttributeNS(null,'y', '60' );
			drawnObsel.setAttributeNS(null,'width', '20' );
			drawnObsel.setAttributeNS(null,'height', '20' );
			drawnObsel.setAttributeNS("http://www.w3.org/1999/xlink",'href','img/default.png');
			return drawnObsel;
		}
};