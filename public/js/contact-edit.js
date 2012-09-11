jQuery.event.add(window, 'load', initContact);

function initContact(){
	var staff = $('#current-staff > div');
	for (var i=0; i < $(staff).length; i++) {
	  $(staff[i]).html($(staff[i]).html()+'<div class="new-staff"><h4>(+) Add New Staff</h4></div>');
	}
	var staff = $('.new-staff');
	for (var i=0; i < $(staff).length; i++) {
		$(staff[i]).bind('click', function() {
			$(this).hide(100);
			$(this).next('div').show(100);
		});
	}
}
