jQuery.event.add(window, 'load', initEdit);

function moveAddDiv() {
	$('#gallery').prepend(document.getElementById('add-new-piece'));
	$('#series').prepend(document.getElementById('add-new-piece'));
	$('#other-images').prepend(document.getElementById('add-new-piece'));
	$('#add-new-piece').css('display', 'inline-block');
	$('#add-new-piece').animate({
		opacity : 1
	}, 800);
}

function showRequest(formData, jqForm, options) {
	console.log('requesting...');
}

function handlePostSuccess(responseText, statusText, xhr, $form) {
	console.log(xhr);
	console.log(statusText);
	var ajax = '/get/header';
	window.setTimeout(function() {
		$.get(ajax, function(data) {
			$('#header').html(data);
		});
		if(loc == 'edit') {
			loc = 'edit_index'
		}
		ajax = '/get/' + loc;
		$.get(ajax, function(data) {
			$('.content').remove();
			$('#main').html(data);
			moveAddDiv();
		});
	}, 1500);
	closeAddPieceForm();
}

function handlePostFail() {
	alert('sorry something went wrong...');
}

function closeAddPieceForm() {
	$('#add-piece').animate({
		opacity : 0
	}, 100);
	$('#add-piece').css('z-index', -1);
}

function editHeader() {
	as = $('a');
	for(var i = 0; i < $(as).length; i++) {
		$(as[i]).attr('href', '/edit' + $(as[i]).attr('href'));
	}
}

function initAddNew() {
	$('#close-add-piece').bind('click', function() {
		closeAddPieceForm();
	});
	$('#piece_date').bind('click',function(){
		
	});
	$('#add-new-piece').bind('click', function() {
		$('#add-piece').animate({
			opacity : 1
		}, 100);
		$('#add-piece').css('z-index', 2);
	});
	$('#add-piece-form').submit(function() {
		if($('#piece_title').val() == '') {
			////console.log('title');
			$('#piece_title').css('background-color', '#900');
		} else if($('#piece_default_image').val() == "") {
			////console.log('image');
			$('#piece_default_image').css('background-color', '#F00');
		} else if($('#piece_series').val() == '') {
			////console.log('series');
			$('#piece_series').css('background-color', '#F00');
		} else {
			////console.log('sending...');
			$('#add-piece-form').ajaxSubmit(options);
		}

		return false;
	});
	var options = {
		//        target: '#header', // target element(s) to be updated with server response
		beforeSubmit : showRequest, // pre-submit callback
		success : handlePostSuccess, // post-submit callback
		//        url: '/add/series',
		clearForm : false
	};
	$('#add-series-form').bind('keypress', function(event) {
		if(event.keyCode == 13 || event.which == 13) {
			$(this).trigger('submit');
		} else if(event.keyCode == 27 || event.which == 27) {
			closeAddPieceForm();
		}
	});
	$('#add-series-form').submit(function() {
		if($('#series_name').val() == '') {
			////console.log('title');
			$('#series_name').css('background-color', '#900');
		} else {
			////console.log('sending...');
			$('#add-series-form').ajaxSubmit(options);
		}

		return false;
	});
}

function handleLogoutSuccess() {
	window.location = window.location;
}

function handleLogoutFail() {

}

function handleLoginSuccess() {
	window.location = window.location;
}

function handleLoginFail(response, statusText, xhr) {
	$('#login').html($('#login').html() + '<h4 style="margin-top: 5px;">login failed...</h4>').addClass('login-fail');
}

function initLogin() {
	$('#login-form').bind('keypress', function(event) {
		if(event.keyCode == 13 || event.which == 13) {
			$(this).trigger('submit');
		} else if(event.keyCode == 27 || event.which == 27) {
			closeAddPieceForm();
		}
	});
	$('#login-form').submit(function() {
		if($('#username').val() == '') {
			$('#username').css('background-color', '#900');
		} else if($('#password').val() == "") {
			$('#password').css('background-color', '#F00');
		} else {
			console.log('sending...');
			$.ajax({
				url : '/login',
				type : 'POST',
				data : $('#login-form').serialize(),
				success : handleLoginSuccess,
				error : handleLoginFail
			});
		}

		return false;
	});
	$('#logout').click(function() {
		$.ajax({
			url : '/logout',
			data : $('#log-out').serialize(),
			type : 'POST',
			success : handleLogoutSuccess,
			error : handleLogoutFail
		});
	})
}

function checkAs() {
	as = $('a');
	for(var i = 0; i < $(as).length; i++) {
		if(($(as[i]).attr('href') + '').substring(0, 5) != '/edit')
			$(as[i]).attr('href', '/edit' + $(as[i]).attr('href'));
	}
}

function sendDesignerForm(data) {
	console.log(data);
	$.ajax({
		url : '/add/designer',
		data : data,
		type : 'POST',
		success : function() {
			loc = 'edit_contact'
			ajax = '/get/' + loc;
			$.get(ajax, function(data) {
				$('.content').remove();
				$('#main').html(data);
				moveAddDiv();
				initContact();
			});
		},
		error : function(responseText, statusText, xhr, $form) {
			alert(statusText);
		},
	});
}

function initContact() {
	var inputs = $('.designer-form > div.field');
	for(var i = 0; i < $(inputs).length; i++) {
		$(inputs[i]).children('input').bind('blur', function() {
			if($(this).css('display') !== 'none') {
				$(this).hide(100);
				$(this).next('div').show(100);
			} else {
				console.log($(this).next('div.add-designer').children('form'));
				$(this).next('div.add-designer').children('form').animate({
					top : '-=' + 25
				}, 100);
			}
		});
		$(inputs[i]).children('input').bind('keydown', function(event) {
			if(event.which == 13 || event.keyCode == 13) {
				if($(this).parent().css('display') !== 'none') {
					$(this).parent().hide(100);
					$(this).parent().next('div').show(100);
				} else {
					console.log($(this).parent().next('div.add-designer').children('form'));
					$(this).parent().next('div.add-designer').chilren('form').animate({
						top : '-=' + 25
					}, 100);
				}
			}
		});
	}
	$('.designer-form > div.last > input').unbind();
	$('.designer-form > div.last > input').blur(function() {
		console.log($(this).parent('div').parent('form'));
		$(this).parent('div').parent('form').parent('div').hide(100);
		sendDesignerForm($(this).parent('div').parent('form').serialize());
	});
	$('.designer-form > div.last').bind('keydown', function(event) {
		if(event.which == 13 || event.keyCode == 13) {
			$(this).parent('form').parent('div').hide(100);
			sendDesignerForm($(this).parent('form').serialize());
		}
	});
	var staff = $('.new-staff');
	for(var i = 0; i < $(staff).length; i++) {
		$(staff[i]).bind('click', function() {
			$(this).hide(100);
			$(this).next('div').show(100);
			$(this).next('div.add-designer').children('form').children('div.field.first').children('input').focus();
		});
	}
	var staff = $('p.staff:not(.change)');
	for(var i = 0; i < $(staff).length; i++) {
		$(staff[i]).bind('mouseover', function() {
			if($(this).data('original') == null)
				$(this).data('original', $(this).html());
			if($(this).html().search('class') == -1)
				$(this).html($(this).html() + '<p class="change">(E)</p><p class="remove">(X)</p>');
		});
		$(staff[i]).bind('mouseleave', function() {
			$(this).html($(this).data('original'));
		});
	}
}

function initEdit() {
	moveAddDiv();
	checkAs();
	initAddNew();
	initLogin();
	initContact();
}