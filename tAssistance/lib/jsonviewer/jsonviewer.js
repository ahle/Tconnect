  function visitObj($container, obj) {
        var $ul = $('<ul class="jsonviewer">');

    for (var prop in obj) {

        var $li = $('<li>');
        if (typeof obj[prop] === "object") {
            $li.append('<span class="ui-icon ui-icon-plus"></span><span class="ui-icon ui-icon-minus"></span><span class="json-key">' + prop + ': </span>');
             visitObj($li, obj[prop]);
        } else {
            $li.append('<span class="json-key childless">' + prop + ': </span><span class="json-value">'+obj[prop]+'</span>');                   
        }
        $ul.append($li);
    }
    $container.append($ul);
}
  
function jsonviewer(container,obj){
	visitObj($(container),obj);
	
	$(".ui-icon-plus").hide();
	$("ul.jsonviewer").children("li").each( function () {
	    $(this).click(function (event) {
	        $(this).children("ul").toggle();
	        $(this).children(".ui-icon").toggle();
	        event.stopPropagation();
	    });
	});
}