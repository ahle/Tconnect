tAssistance.ModalMaker = function(params){
	
//	var element = params.element;
//	var event = params.event;
	var title = params.title;
	
	var params = {
		"title": title	
	};
	
	var modal = new tAssistance.dom.Modal(params);
		
	document.body.appendChild(modal);
	
	$(modal).modal("hide");
	
	return modal;
};

tAssistance.DashBoardModalMaker = function(params){
	
	var modal = tAssistance.ModalMaker({title: "Create a new dashboard"});
	
	var modal_body = modal.querySelector(".modal-body");
	
	var params = {
		"modal": modal
	};
	
	var section = tAssistance.page.DashBoard.ctler.CreatingSectionMaker(params);
	
	modal_body.appendChild(section);
	
	return modal;
};