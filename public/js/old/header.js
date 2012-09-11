jQuery.event.add(window, 'load', init);
var loc= window.location+"";
loc = loc.split('\/');
loc = loc[loc.length-1];
function init(){
	if (loc == 'work') {
		$('#works-header').css('display', 'inline-block');
		$('#works-header').width(0);
		$('#works-header').animate({
			width: $('#header').width() / 3,
			opacity : 1
		}, 170);
	}
	else{
		$('#works-header').css('display', 'inline-block');
        $('#works-header').width($('#header').width() / 3);
        $('#works-header').animate({
			opacity : 1
        }, 550);
	}
}
