tAssistance.Obsel = function(obsel, x){
	drawnObsel = document.createElementNS('http:\/\/www.w3.org\/2000\/svg','image');
	drawnObsel.setAttributeNS(null,'x', x );
	drawnObsel.setAttributeNS(null,'y', '60' );
	drawnObsel.setAttributeNS(null,'width', '20' );
	drawnObsel.setAttributeNS(null,'height', '20' );
	drawnObsel.setAttributeNS("http://www.w3.org/1999/xlink",'href','img/default.png');
	return drawnObsel;
};