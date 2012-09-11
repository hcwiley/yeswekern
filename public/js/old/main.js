jQuery.event.add(window, 'load', init);
jQuery.event.add(window, 'resize', resize);

function resize(){
    var cTop = $('#container').position().top - 19;
    var cLeft = $('#container').position().left - 19;
    var cRight = cLeft + $('#container').width() + 19;
    var cBottom = cTop + $('#container').height() + 19;
    $('#top-left').css('top', cTop);
    $('#top-left').css('left', cLeft);
    $('#top-right').css('top', cTop);
    $('#top-right').css('left', cRight);
    $('#bottom-left').css('top', cBottom);
    $('#bottom-left').css('left', cLeft);
    $('#bottom-right').css('top', cBottom);
    $('#bottom-right').css('left', cRight);
//	$('#slide-indicator').css('left', $('#slide-show').position().left + 380);
}

function googleAnalytics(){
    
    
}

function init(){
    resize();
    googleAnalytics();
}
