jQuery.event.add(window, 'resize', resize);
jQuery.event.add(window, 'load', init);
var img_ratio;
//Current page = loc
var loc;

mobile = false;

//Checking for mobile browser
if (navigator.userAgent.match(/Android/i) ||
navigator.userAgent.match(/webOS/i) ||
navigator.userAgent.match(/iPhone/i) ||
navigator.userAgent.match(/iPod/i)) {
    mobile = true;
}

function init(){
	//Current page = loc
    loc = window.location + "";
    loc = loc.split('/');
    loc = loc[loc.length - 1];
	if( loc == 'contact'){
		$('#contact').addClass('current-page');
	}
//    resize();
}

function resize(){
    var height = $(window).height();
    var width = $(window).width();
//    $("#container").width(width - 400);
//    $("#container").css("left", (width - $("#container").width()) / 2);
//    $("#footer").css("top", $("#container").height() + 10);
}
