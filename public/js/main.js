window.boosley = function(){
    //setInterval(function(){
        var jColl = $('.active_date');
        for(var i = 0; i < jColl.length; i++){
            var jEle = $(jColl[i]);
            var _date = new Date(jEle.attr('data-date'));

            var seconds = ((_date.getTime() - new Date().getTime())/1000) -3600;
            var text = '';
            if(seconds > 0){


                var display = seconds;
                var measurement = 'Seconds';
                if(display > 60){
                    display = display / 60;
                    measurement = 'Minutes';
                    if(display == 1){
                        measurement = 'Minute';
                    }
                    if(display > 60){
                        display = display / 60;
                        measurement = 'Hours';
                        if(display == 1){
                            measurement = 'Hour';
                        }
                        if(display > 24){
                            display = display / 24;
                            measurement = 'Days';
                            if(display == 1){
                                measurement = 'Day';
                            }
                        }
                    }
                }


                text = 'Starts in ' + Math.round(display) + ' ' + measurement;
            }else if(seconds > -3600){
                var display = seconds + 3600;
                var measurement = 'Seconds';
                if(display > 60){
                    display = display / 60;
                    measurement = 'Minutes';
                }
                text = 'Ends in ' + Math.round(display) + ' ' + measurement;
            }else{
                text = 'Ended';
            }
            jEle.html(text);
        }
    //}, 1000);


    $('.lnk-img').click(function(e){
        var jThis = $(this);
        e.preventDefault();
        var src = jThis.attr('href');
        console.log(src);
        setTimeout(function(){
            $('#img-modal').attr('src',src);
        }, 1000)
        $('#modal-caption').text(jThis.attr('data-caption'));
        $('#div-modal').modal('show')
    })
}