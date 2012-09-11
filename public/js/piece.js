jQuery.event.add(window, 'load', initPieceGallery);

function initThumbnails(){
    $('#piece').stop().animate({
        opacity: 1
    }, 200);
    img = $('#images>div>img');
    for (var i = 0; i < $(img).length; i++) {
        fitImage($(img[i]));
    }
}

function fitImage(mainImg){
    if (mainImg.height() < 200) {
        mainImg.width('auto');
        mainImg.height('200');
    }
    if (mainImg.width() > 445) {
		console.log(mainImg.attr('id') + ': '+mainImg.position().left);
        mainImg.css('left', mainImg.position().left - (mainImg.width() - 445)/2);
        mainImg.width('auto');
    }
}

function initPieceGallery(){
    initThumbnails();
}
