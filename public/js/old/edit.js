jQuery.event.add(window, 'load', initEdit);
function moveAddDiv(){
    $('#gallery').prepend(document.getElementById('add-new-piece'));
    $('#other-images').prepend(document.getElementById('add-new-piece'));
    $('#add-new-piece').animate({
        opacity: 1
    }, 800);
}

function showRequest(formData, jqForm, options){
    console.log('requesting...');
    
}

function handlePostSuccess(responseText, statusText, xhr, $form){
    console.log('handling success');
    var ajax = '/get/header';
    window.setTimeout(function(){
        $.get(ajax, function(data){
            $('#header').html(data);
        });
        ajax = '/get/' + loc;
        $.get(ajax, function(data){
            $('.content').remove();
            $('#container').html($('#container').html() + data);
        });
    }, 1500);
    window.setTimeout("dndiDivs();", 1550);
    closeAddPieceForm();
}

function handlePostFail(){
    alert('sorry something went wrong...');
}

function closeAddPieceForm(){
    $('#add-piece').animate({
        opacity: 0
    }, 100);
    $('#add-piece').css('z-index', -1);
}

function editAs(){
    as = $('a');
    for (var i = 0; i < $(as).length; i++) {
		if(($(as[i]).attr('href')+'').substring(0,5) != '/edit')
            $(as[i]).attr('href', '/edit' + $(as[i]).attr('href'));
    }
}

function initAddNew(){
    $('#close-add-piece').bind('click', function(){
        closeAddPieceForm();
    });
    $('#add-new-piece').bind('click', function(){
        $('#add-piece').animate({
            opacity: 1
        }, 100);
        $('#add-piece').css('z-index', 2);
    });
    var options = {
        //        target: '#header', // target element(s) to be updated with server response 
        beforeSubmit: showRequest, // pre-submit callback 
        success: handlePostSuccess, // post-submit callback
        url: '/add/piece',
        clearForm: true
    };
    $('#add-piece-form').bind('keypress', function(event){
        if (event.keyCode == 13 || event.which == 13) {
            $(this).trigger('submit');
        }
        else if (event.keyCode == 27 || event.which == 27) {
            closeAddPieceForm();
        }
    });
    $('#add-piece-form').submit(function(){
        if ($('#piece_title').val() == '') {
            console.log('title');
            $('#piece_title').css('background-color', '#900');
        }
        else if ($('#piece_default_image').val() == "") {
            console.log('image');
            $('#piece_default_image').css('background-color', '#F00');
        }
        else if ($('#piece_series').val() == '') {
            console.log('series');
            $('#piece_series').css('background-color', '#F00');
        }
        else {
            console.log('sending...');
            $('#add-piece-form').ajaxSubmit(options);
        }
        
        return false;
    });
}

function initLogin(){
    var options = {
        //        target: '#header', // target element(s) to be updated with server response 
        beforeSubmit: showRequest, // pre-submit callback 
        success: handlePostSuccess, // post-submit callback
        url: '/login',
        clearForm: true
    };
    $('#login-form').bind('keypress', function(event){
        if (event.keyCode == 13 || event.which == 13) {
            $(this).trigger('submit');
        }
        else if (event.keyCode == 27 || event.which == 27) {
            closeAddPieceForm();
        }
    });
    $('#login-form').submit(function(){
        if ($('#username').val() == '') {
            $('#username').css('background-color', '#900');
        }
        else if ($('#password').val() == "") {
            $('#password').css('background-color', '#F00');
        }
        else {
            console.log('sending...');
            $('#login-form').ajaxSubmit(options);
        }
        
        return false;
    });
}

function initEdit(){
    moveAddDiv();
	editAs();
    initAddNew();
    initLogin();
}
