//==============================================================================================================
										
// 1. FUNCTIONS
// 2. EXECUTE   
// 3. EXECUTE PLUGINS

//==============================================================================================================

// 1. FUNCTIONS

// ==============================================================================================================

	
(function($) {


	// -------------------------------------------------------------------------------------------------------

	
	//function mediaChecker(){
	//	var screen = getActiveMQ();
	//
	//	// demo for components-js.php
	//	$('#js-mq-currentexample').text('Current screen: ' + screen);
	//		if(screen == 'aq'){
	//			$('#js-mq-example').text('Yey! Alpha mode!');
	//		} else {
	//			$('#js-mq-example').text('Nay! Not alpha!');
	//		}
	//	// end demo for components-js.php
	//
	//	if((screen != 'aq') && (screen != 'bq')){
	//		$('.js-JVC').viewportChecker({
    	//	classToAdd: 's-is-visible',
    	//	offset: 96,
    	//	repeat: false
	//		});
	//	}
	//}
	
	
	// -------------------------------------------------------------------------------------------------------
	
	
	//function fadeImg(elem){
	//	var fadeTarget = elem.find('img');
	//
	//	fadeTarget.each(function(i){
	//		var $this = $(this);
	//
	//		setTimeout(function(){
	//			$this.css('opacity', '1');
	//		}, i*150);
	//	});
	//}
	
	
	// -------------------------------------------------------------------------------------------------------


    function show_contact(){
        var contactTrigger = $('.js-colophon-jumper a');
        var contactArea = $(contactTrigger.attr('href'));

        contactTrigger.bind('tap', function(){
            contactArea.addClass('s-is-highlighted');
            setTimeout(function(){
                contactArea.removeClass('s-is-highlighted');
            }, 1500);
        });


        if($.fn.smoothScroll && contactArea.length){
            contactTrigger.smoothScroll();
        }
    }


	// -------------------------------------------------------------------------------------------------------



    function loadSocialData($feedTarget){

        var feedTarget = $feedTarget;

        $.ajax({
            type: 'POST',
            url: '/wp-admin/admin-ajax.php',
            data: {
                action: 'loadSocialContent',
            },
            success: function (data, textStatus, XMLHttpRequest) {
                feedTarget.append(data).removeClass('s-is-hidden');
            },
            error: function (MLHttpRequest, textStatus, errorThrown) {
                feedTarget.remove();
            }
        });
    }

    function recentSocials(){
        var feedTarget = $("#js-socialfeedBox");

        feedTarget.viewportChecker({
            classToAdd: 'execLoad',
            offset: 0,
            callbackFunction: loadSocialData(feedTarget),
            repeat: false
        });
    }



	// Top Tags -------------------------------------------------------------------------------------------------------




    function clearCurrent($trigger){
        var trigger = $trigger;

        $('main').toggleClass('tags-is-active');
        $('.menu-item').removeClass('current-menu-item');
        trigger.toggleClass('current-menu-item');
    }

    function populate_tags($loadtarget, $trigger){

        $.ajax({
            type: 'POST',
            url: '/wp-admin/admin-ajax.php',
            data: {
                action: 'build_tags',
            },
            success: function (data) {
                $loadtarget.append(data).removeClass('s-is-hidden');
                var closetrigger = $('#js-listhead');
                closetrigger.bind('tap', function(){
                    $loadtarget.addClass('s-is-hidden');
                    clearCurrent($trigger);
                });
            },
            error: function (MLHttpRequest, textStatus, errorThrown) {
                $loadtarget.remove();
            }
        });
    }

    function top_tags($trigger){
        var tagsloaded = false,
            trigger = $($trigger),
            targetelem = $('<aside id="js-taglist" class="o-taglist s-is-hidden"></aside>');

        if($('body').hasClass('search-no-results') && $.fn.smoothScroll){
            targetelem.insertBefore('#js-tags__ul');
            trigger.smoothScroll();
        } else {
            targetelem.prependTo('body');
            trigger.bind('tap', function(){
                var $this = $(this);
                var href = $this.attr('href');

                if(href.indexOf('#') === 0){
                    var loadtarget = $(href);

                    if(loadtarget.length){
                        clearCurrent(trigger);

                        if(tagsloaded){
                            loadtarget.toggleClass('s-is-hidden');
                        } else {
                            populate_tags(loadtarget, trigger);
                            tagsloaded = true;
                        }

                        if($('main').hasClass('tags-is-active')){
                            $('body').animate({
                                scrollTop: 0
                            },'fast');
                        }
                    }
                }
            });
        }
    }



	// -------------------------------------------------------------------------------------------------------

	
	//function showElem(){
	//	var $this = $(this);
	//	$this.removeClass('s-is-hidden');
	//}
	
	
//==============================================================================================================

// 2. EXECUTE

// ==============================================================================================================

	
	$('html').addClass('transitions');
    // $('.mis_img').not('.lazyload').css('opacity', '1');
    // recentSocials();
    show_contact();
    top_tags('.js-toptags a');
	
	// -------------------------------------------------------------------------------------------------------
	
	
	setTimeout(function(){
 		var wflObjects = [
	 		
	 		'#wfl-test',
	 		'.example-2'
 		
 		].join(', ');

		$(wflObjects).css({
			'visibility' 	: 'visible',
			'opacity' 		: '1',
			'transform'		: 'translate3d(0,0,0)'
		});
	},2500);
	
	
	// -------------------------------------------------------------------------------------------------------



    $('.js-tappy').each( function(){
        var href = $( this ).attr( "href" );
        if( href.indexOf( "#" ) !== 0 ){
            $( this ).bind( "tap", function(){
                window.location.href = this.href;
            });
        }
    });



	// -------------------------------------------------------------------------------------------------------



    $('#js-topjump').bind('tap', function(){
        $('html, body').animate({
            scrollTop:0
        }, 600);
    });

	
	
	// -------------------------------------------------------------------------------------------------------
	
	
	//if(screen != 'aq'){
	//	$('.js-medialoadEffect').viewportChecker({
  	//	classToAdd: 's-is-active',
  	//	offset: 168,
  	//	callbackFunction: fadeImg,
  	//	repeat: false
	//	});
	//}



    // -------------------------------------------------------------------------------------------------------







    // -------------------------------------------------------------------------------------------------------



	
	
	
//==============================================================================================================	

// 3 EXECUTE PLUGINS

// ==============================================================================================================



    if($.fn.mis_popup) {
        var popup_src = $('.mis_popup');
        if(popup_src.length){
            popup_src.mis_popup();
        }
    }



    // -------------------------------------------------------------------------------------------------------



    if($.fn.header_slide) {

        $('#js-masthead').header_slide({
            disable: function(){
                return $('#mis_overlay').hasClass('s-is-visible');
            }
        });
    }



    // -------------------------------------------------------------------------------------------------------




    if($.fn.smoothScroll){
        var jumper = $('.js-jumper');
        jumper.smoothScroll();
    }



    // -------------------------------------------------------------------------------------------------------

	
	
	// -------------------------------------------------------------------------------------------------------
	
	
	//if($.fn.fitVids){
	//	var videoParent = $('.js-videoParent');
    //if(videoParent.length){
	//		videoParent.fitVids();
	//	}
	//}
	
	
	// -------------------------------------------------------------------------------------------------------
	
	

	
	

	

	
	
	// -------------------------------------------------------------------------------------------------------
	
	
	//if($.fn.toggleElem){
	//	var toggledElem = $('.js-toggle');
	//	if(toggledElem.length){
	//    toggledElem.toggleElem({
	//    	toggledElem: 'js-toggled',
	// 			speed: 80
	// 		});
	//	}
	//}


	// -------------------------------------------------------------------------------------------------------

	//
	//if($.fn.expandSection){
	//	var expElem = $('#js-griddemo .o-gridview');
	//	var demoexpElem = $('.m-expand-demo');
	//
	//	if(expElem.length){
	//   expElem.expandSection({
	// 			timeout: 100,
	// 			divideBy: 2
	// 		});
	// 	}
	//
	//	if(demoexpElem.length){
	// 		demoexpElem.expandSection();
 	//	}
	//}
	
	
// -------------------------------------------------------------------------------------------------------


	//if($.fn.contentslider){
	//  $('#js-slider').contentslider({
	//  	trigContent: true,
	//  	populateTarget: true
	//  });
	//}
	
	
// -------------------------------------------------------------------------------------------------------

	
})(jQuery); // End self-invoking function