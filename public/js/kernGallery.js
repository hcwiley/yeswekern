jQuery.event.add(window, 'load', initWork);
var curImg = 0;
var curWork = 0;

function alignSlideShow(){
	var imgs = $('#img-slider').children('div');
	for (var i = 0; i < imgs.length; i++){
	   console.log(i+"@ "+$(imgs[i]).position().top);
	   var top = $(imgs[i]).position().top;
	   if( top != 0){
	   	$(imgs[i]).css('top',0);
	   }
	   console.log(i+"@ "+$(imgs[i]).position().top);
    }
}

function changeImage(dir){
    if (curImg + dir >= 0 && curImg + dir < $('#img-slider').children('div').length) {
		curImg += dir;
		if (dir > 0) {
			$('#img-slider').animate({
				left: '-=' + ($('#slide-show-img').width() + 25)
			}, 400);
		}
		else {
			$('#img-slider').animate({
				left: '+=' + ($('#slide-show-img').width() + 25)
			}, 400);
		}
		$('.selected').removeClass('selected');
		$('#indi-' + curImg).addClass('selected');
	}
}

function slideShow(){
    $('#prev-img').bind('click', function(){
        changeImage(-1);
    });
    $('#next-img').bind('click', function(){
        changeImage(1);
    });
	if ($('#img-slider').children('div').length == 1) 
		$('#slide-indicator').width(60);
	else {
		$('#slide-indicator').width(($('#img-slider').children('div').length + 1) * 25);
		$('#slide-indicator').css('right',-1*($('#slide-indicator').position().left - $('#slide-indicator').width() + 70));
	}
    //$('#img-slider').children('img').css('top', '0');
    
    for (var i = 0; i < $('#img-slider').children('div').length; i++) {
        var div = document.createElement('DIV');
        div.setAttribute('class', 'indicator');
		div.setAttribute('id', 'indi-'+i);
        if (i == 0) 
            div.setAttribute('class', 'indicator selected');
        document.getElementById('slide-indicator').appendChild(div);
    }
}

function changeWork(dir){
    if (curWork + dir >= 0 && curWork + dir < $('#other-works-slider').children('a').length - 4) {
        curWork += dir;
		console.log('got here');
        if (dir > 0) {
			console.log('right');
            $('#other-works-slider').animate({
                left: '-=' + 250
            }, 400);
        }
        else {
			console.log('left');
            $('#other-works-slider').animate({
                left: '+=' + 250
            }, 400);
        }
    }
}

function otherWorks(){
	$('#prev-works').bind('click', function(){
        changeWork(-1);
		console.log('got here -1');
    });
    $('#next-works').bind('click', function(){
        changeWork(1);
		console.log('got here 1');
    });
	$('#other-works-slider').width($('#other-works-slider').children('a').length * $('#other-works-slider').width());
}

function initWork(){
	slideShow();
	otherWorks();
	alignSlideShow();
	var pieces = $('#gallery').children('div');
	for (var i = 0; i < pieces.length; i++){
	   $(pieces[i]).bind('click', function(){
	   	   window.location = 'work/'+$(this).children('h3').attr('title');
	   })
    }
}
