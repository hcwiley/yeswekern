jQuery.event.add(window, 'load', initDndi);
jQuery.event.add(window, 'unload', leave);

var date = new Date();
var aEnterTimer;
var inFocus = false;
var hoverTime = 1500;



function leave(){
    //	alert('epace');
}

function overA(obj){
    console.log($(obj).attr('id') + '  over');
    date = new Date();
    if (aEnterTimer + hoverTime < date.getTime() && inFocus && $('.editting').length == 0) {
        console.log('good to go');
        $(obj).addClass('editting');
        var helpText = document.createElement('h4');
        helpText.innerHTML = 'press enter to start placing';
        $(helpText).attr('id', 'help-text');
        $(obj).prepend(helpText);
        $(obj).children('img').css('z-index', '0');
        lastHref = $(obj).attr('href');
        $(obj).attr('href', '#');
        $(document).bind('keydown', function(event){
            var key = event.which;
            if (key == null) 
                key = event.keyCode;
            if (key == 27) {
                $(document).unbind('');
                $(obj).removeClass('editting');
                $(obj).attr('href', lastHref);
                $('#help-text').remove();
                inFocus = false;
            }
            else if (key == 13) {
                $(document).bind('mousemove', function(e){
                    console.log('down');
                    $(helpText).text('press esc to stop placing');
                    $(obj).css('width', $(obj).width());
                    $(obj).css('height', $(obj).height());
                    $(obj).addClass('css-changed');
                    console.log('mouseX: ' + e.pageX + ', objX: ' + $(obj).position().top);
                    $(obj).offset({
                        top: e.pageY - $(obj).height() / 2,
                        left: e.pageX - $(obj).width() / 2
                    });
                });
            }
        });
    }
    else if (inFocus) {
        window.setTimeout(function(){
            overA(obj);
        }, hoverTime);
    }
}

function dndiDivs(){
    as = $('#nav').add('#contact').add('#logo').add('#container');
    for (var i = 0; i < $(as).length; i++) {
        $(as[i]).hover(function(){
            console.log('entered...');
            date = new Date();
            aEnterTimer = date.getTime();
            inFocus = true;
            overA(this);
        }, function(){
            //unbind the dndi
            inFocus = false;
        });
        //        $(as[i]).bind('mouseover', overA(as[i]));
    }
}

function saveMenu(){
    $('#save').bind('click', function(){
        console.log('saving...');
        var css = ""
        var dndi = $('.css-changed');
        for (var i = 0; i < $(dndi).length; i++) {
            css = 'width=' + $(dndi[i]).width() + '&height=' + $(dndi[i]).height() + '&';
            css += 'left=' + $(dndi[i]).position().left + '&top=' + $(dndi[i]).position().top + '&';
            console.log($(dndi[i]).attr('id') + ' css\n' + css);
            $.ajax({
                type: 'POST',
                url: '/save/' + $(dndi[i]).attr('id'),
                data: css,
                success: function(data){
                    console.log(data);
                },
            });
        }
    });
    $('#draft').bind('click', function(){
        console.log('saving...');
        var css = ""
        var dndi = $('.css-changed');
        for (var i = 0; i < $(dndi).length; i++) {
            css = 'width=' + $(dndi[i]).width() + '&height=' + $(dndi[i]).height() + '&';
            css += 'left=' + $(dndi[i]).position().left + '&top=' + $(dndi[i]).position().top + '&';
            console.log($(dndi[i]).attr('id') + ' css\n' + css);
            $.ajax({
                type: 'POST',
                url: '/draft/' + $(dndi[i]).attr('id'),
                data: css,
                success: function(data){
                    console.log(data);
                },
            });
        }
    });
    $('#reset').bind('click', function(){
        console.log('reseting..');
        window.location = window.location;
    });
}

function initDndi(){
//    dndiDivs();
    saveMenu();
}
