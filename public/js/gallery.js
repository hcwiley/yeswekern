jQuery.event.add(window, 'load', initGallery);

function initImgs(){
    piece = $('.content').children('a');
    window.setTimeout(function(){
            $(piece).animate({
                opacity: 1
            }, 300);
    }, 400);
    for (var i = 0; i < $(piece).length; i++) {
		$(piece[i]).width($(piece[i]).children('img').width()+20);
		$(piece[i]).height($(piece[i]).children('img').height()+20);
    }
}


function initGallery(){
    initImgs();
}