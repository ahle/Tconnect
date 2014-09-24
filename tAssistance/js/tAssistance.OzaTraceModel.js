tAssistance.OzaTraceModel = function(id, parentNode, model){
	this.id = id;
	//this.trace = trace;
	
	
	var tree_data = [
                        {
                            "text": "oza_model",
                            "icon": "icon icon-model",
                            "nodes": [
                              {
                                "text": "oze_idg",
                                "nodes": [
                                  {
                                  	"text": "user",
                                  },
                                  {
                                  	"text": "idSession",
                                  },
                                  {
                                  	"text": "infos_",
                                  },
                                ]
                              },
                              {
                                  "text": "oze_view",
                                  "nodes": [
                                    {
                                    	"text": "user",
                                    },
                                    {
                                    	"text": "idSession",
                                    },
                                    {
                                    	"text": "infos_",
                                    },
                                  ]
                                },
                            ]
                          }
                        ];

	 var options = {
	          bootstrap2: true, 
	          showTags: true,
	          levels: 5,
	          data: tree_data
	        };
	
	var tree = document.createElement("div");
	parentNode.appendChild(tree);

	this.element = tree;
	
	var root_el = document.createElement("div");
	tree.appendChild(root_el);
	
	var model1_el = document.createElement("div");
	
	model1_el.innerHTML = "<span><img src='img/model.png' height='14px' width='14px'/> oza_model </span> [<a name='more'>More</a>] <div name='details' style='padding-left:30px; display:none'></div>";
		
	root_el.appendChild(model1_el);
	
	var obsels_el = model1_el.querySelector("div[name='details']");
	
	obsels_el.innerHTML = "<div name='oze_idg'></div>"		
		+"<div name='oze_view'></div>"
		+"<div name='oze_subview'></div>"
		+"<div name='ozec_w'></div>"
		+"<div name='ozev_w'></div>"
		+"<div name='ozem_fn'></div>";
	
	var oze_view = obsels_el.querySelector("div[name='oze_view']");
	oze_view.innerHTML = "<span><span><img src='img/oze_view.png' height='14px' width='14px'/> oze_view</span> [<a name='more'>More</a>] <div name='details' style='padding-left:30px; display:none'></div>";
	
	var oze_view_attr = oze_view.querySelector("div[name='details']");
	
	oze_view_attr.innerHTML = "<div name='user'></div>"
		+"<div name='idSession'></div>"
		+"<div name='info_request'></div>"
		+"<div name='info_nbdocs'></div>"
		+"<div name='info_idView'></div>"
		+"<div name='info_button'></div>"
		+"<div name='info_goidview'></div>"
		+"<div name='info_makeReady'></div>"
		+"<div name='info_tv'></div>"
		+"<div name='info_idPage'></div>";
	
	var user_li = oze_view_attr.querySelector("div[name='user']");
	user_li.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> user</span>";
	
	var idSession_li = oze_view_attr.querySelector("div[name='idSession']");
	idSession_li.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> idSession</span>";
	
	var info_request_li = oze_view_attr.querySelector("div[name='info_request']");
	info_request_li.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_request</span>";
	
	var info_nbdocs_li = oze_view_attr.querySelector("div[name='info_nbdocs']");
	info_nbdocs_li.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_nbdocs</span>";
	
	var info_idView = oze_view_attr.querySelector("div[name='info_idView']");
	info_idView.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_idView</span>";
	
	var info_button = oze_view_attr.querySelector("div[name='info_button']");
	info_button.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_button</span>";
	
	var info_goidview = oze_view_attr.querySelector("div[name='info_goidview']");
	info_goidview.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_goidview</span>";
	
	var info_makeReady = oze_view_attr.querySelector("div[name='info_makeReady']");
	info_makeReady.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_makeReady</span>";
	
	var info_tv = oze_view_attr.querySelector("div[name='info_tv']");
	info_tv.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_tv</span>";
	
	var info_idPage = oze_view_attr.querySelector("div[name='info_idPage']");
	info_idPage.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_idPage</span>";
	// oze_subview
	
	var oze_subview = obsels_el.querySelector("div[name='oze_subview']");
	oze_subview.innerHTML = "<span><span><img src='img/oze_subview.png' height='14px' width='14px'/> oze_subview</span> [<a name='more'>More</a>] <div name='details' style='padding-left:30px; display:none'></div>";

	
	var oze_subview_attr = oze_subview.querySelector("div[name='details']");
	
	oze_subview_attr.innerHTML = "<div name='user'></div>"
		+"<div name='idSession'></div>"
		+"<div name='info_idSubView'></div>"
		+"<div name='info_label'></div>"
		+"<div name='info_idDoc'></div>"
		+"<div name='info_makeReady'></div>";
	
	var user = oze_subview_attr.querySelector("div[name='user']");
	user.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> user</span>";
	
	var idSession = oze_subview_attr.querySelector("div[name='idSession']");
	idSession.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> idSession</span>";
	
	var info_idSubView = oze_subview_attr.querySelector("div[name='info_idSubView']");
	info_idSubView.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_idSubView</span> ";
	
	var info_label = oze_subview_attr.querySelector("div[name='info_label']");
	info_label.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_label</span>  ";
	
	var info_idDoc = oze_subview_attr.querySelector("div[name='info_idDoc']");
	info_idDoc.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_idDoc</span>  ";
	
	var info_makeReady = oze_subview_attr.querySelector("div[name='info_makeReady']");
	info_makeReady.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_makeReady</span>  ";
	
	//ozec_w
	
	var ozec_w = obsels_el.querySelector("div[name='ozec_w']");
	ozec_w.innerHTML = "<span><span><img src='img/ozec_w.png' height='14px' width='14px'/> ozec_w</span> [<a name='more'>More</a>] <div name='details' style='padding-left:30px; display:none'></div>";
	
	var ozec_w_attr = ozec_w.querySelector("div[name='details']");
	
	ozec_w_attr.innerHTML = "<div name='user'></div>"
		+"<div name='idSession'></div>"
		+"<div name='idDoc'></div>"
		+"<div name='idPage'></div>"
		+"<div name='info_before'></div>"
		+"<div name='info_after'></div>"
		+"<div name='info_rfW'></div>"
		+"<div name='info_makeReady'></div>";
	
	var user = ozec_w_attr.querySelector("div[name='user']");
	user.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> user</span> ";
	
	var idSession = ozec_w_attr.querySelector("div[name='idSession']");
	idSession.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> idSession</span>  ";
	
	var info_before = ozec_w_attr.querySelector("div[name='info_before']");
	info_before.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_before</span> ";
	
	var info_after = ozec_w_attr.querySelector("div[name='info_after']");
	info_after.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_after</span>  ";
	
	var info_rfW = ozec_w_attr.querySelector("div[name='info_rfW']");
	info_rfW.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_rfW</span>  ";
	
	var idDoc = ozec_w_attr.querySelector("div[name='idDoc']");
	idDoc.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> idDoc</span>  ";
	
	var idPage = ozec_w_attr.querySelector("div[name='idPage']");
	idPage.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> idPage</span>  ";
	// ozev_w
	var ozev_w = obsels_el.querySelector("div[name='ozev_w']");
	ozev_w.innerHTML = "<span><span><img src='img/ozev_w.png' height='14px' width='14px'/> ozev_w</span> [<a name='more'>More</a>] <div name='details' style='padding-left:30px; display:none'></div>";
	
	var ozev_w_attr = ozev_w.querySelector("div[name='details']");
	
	ozev_w_attr.innerHTML = "<div name='user'></div>"
		+"<div name='idSession'></div>"
		+"<div name='idDoc'></div>"
		+"<div name='idPage'></div>"
		+"<div name='info_rfW'></div>"
		+"<div name='info_text'></div>";
	
	var user = ozev_w_attr.querySelector("div[name='user']");
	user.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> user</span> ";
	
	var idSession = ozev_w_attr.querySelector("div[name='idSession']");
	idSession.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> idSession</span>  ";
	

	var idDoc = ozev_w_attr.querySelector("div[name='idDoc']");
	idDoc.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> idDoc</span>  ";
	
	var idPage = ozev_w_attr.querySelector("div[name='idPage']");
	idPage.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> idPage</span>  ";
	
	var info_text = ozev_w_attr.querySelector("div[name='info_text']");
	info_text.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_text</span> ";
	
	var info_rfW = ozev_w_attr.querySelector("div[name='info_rfW']");
	info_rfW.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_rfW</span>  ";
	
	// oze_idg
	var oze_idg = obsels_el.querySelector("div[name='oze_idg']");
	oze_idg.innerHTML = "<span><span><img src='img/oze_idg.png' height='14px' width='14px'/> oze_idg</span> [<a name='more'>More</a>] <div name='details' style='padding-left:30px; display:none'></div>";
	
	var oze_idg_attr = oze_idg.querySelector("div[name='details']");
	
	oze_idg_attr.innerHTML = "<div name='user'></div>"
		+"<div name='idSession'></div>"
		+"<div name='info_userAgent'></div>"
		+"<div name='info_vedit'></div>"
		+"<div name='info_v'></div>"
		+"<div name='info_tv'></div>"
		+"<div name='info_makeReady'></div>";
	
	var user = oze_idg_attr.querySelector("div[name='user']");
	user.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> user</span> ";
	
	var idSession = oze_idg_attr.querySelector("div[name='idSession']");
	idSession.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> idSession</span>  ";
	

	var info_userAgent = oze_idg_attr.querySelector("div[name='info_userAgent']");
	info_userAgent.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_userAgent</span>  ";
	
	var info_vedit = oze_idg_attr.querySelector("div[name='info_vedit']");
	info_vedit.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_vedit</span>  ";
	
	var info_v = oze_idg_attr.querySelector("div[name='info_v']");
	info_v.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_v</span> ";
	
	var info_makeReady = oze_idg_attr.querySelector("div[name='info_makeReady']");
	info_makeReady.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_makeReady</span>  ";
	
	// ozem_fn
	var ozem_fn = obsels_el.querySelector("div[name='ozem_fn']");
	ozem_fn.innerHTML = "<span><span><img src='img/ozem_fn.png' height='14px' width='14px'/> ozem_fn</span> [<a name='more'>More</a>] <div name='details' style='padding-left:30px; display:none'></div>";
	
	var ozem_fn_attr = ozem_fn.querySelector("div[name='details']");
	
	ozem_fn_attr.innerHTML = "<div name='user'></div>"
		+"<div name='idSession'></div>"
		+"<div name='idDoc'></div>"
		+"<div name='idPage'></div>"
		+"<div name='info_request'></div>"
		+"<div name='info_status'></div>"
		+"<div name='info_correctionCount'></div>";
	
	var user = ozem_fn_attr.querySelector("div[name='user']");
	user.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> user</span> ";
	
	var idSession = ozem_fn_attr.querySelector("div[name='idSession']");
	idSession.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> idSession</span>  ";
	
	var idDoc = ozem_fn_attr.querySelector("div[name='idDoc']");
	idDoc.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> idDoc</span>  ";
	
	var idPage = ozem_fn_attr.querySelector("div[name='idPage']");
	idPage.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> idPage</span>  ";
	
	var info_request = ozem_fn_attr.querySelector("div[name='info_request']");
	info_request.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_request</span> ";
	
	var info_status = ozem_fn_attr.querySelector("div[name='info_status']");
	info_status.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_status</span>  ";
	
	var info_correctionCount = ozem_fn_attr.querySelector("div[name='info_correctionCount']");
	info_correctionCount.innerHTML = "<span><i class='glyphicon glyphicon-tag'></i> info_correctionCount</span>  ";
	
	var more_btns = tree.querySelectorAll("a[name='more']");
	$(more_btns).click(function(){
		var obsels = this.parentNode.querySelector("div[name='details']");
		if(obsels){
			var display = obsels.style.display;
			if(display=="none"){
				this.innerHTML = "Less";
				obsels.style.display = "block";
			}
			else{
				this.innerHTML = "More";
				obsels.style.display = "none";
			}
		}
	});
	
	
	
    this.clear = function(){
    	
    };
    
};