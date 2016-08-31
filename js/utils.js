$(document).ready(function() {
    $('#fullpage').fullpage({
        sectionsColor: ['#009688', '#E91E63', '#607D8B', '#9C27B0'],
        onLeave: function(index, nextIndex, direction) {
            var leavingSection = $(this);
            $('#menu-' + nextIndex).addClass('cd-selected').siblings('.cd-selected').removeClass('cd-selected');
        }
    });
});

jQuery(document).ready(function($) {
    $('.toggle-icon').on('click', function(event) {
        if ($(this).hasClass('open')) {
            event.preventDefault();
            toggleNav(false);
            $.fn.fullpage.setAllowScrolling(true);
            $.fn.fullpage.setKeyboardScrolling(true);
        } else {
            event.preventDefault();
            toggleNav(true);
            $.fn.fullpage.setAllowScrolling(false);
            $.fn.fullpage.setKeyboardScrolling(false);
        }
    });
    //close the navigation
    $('.cd-overlay').on('click', function(event) {
        event.preventDefault();
        toggleNav(false);
        $.fn.fullpage.setAllowScrolling(true);
        $.fn.fullpage.setKeyboardScrolling(true);
    });
    //select a new section
    $('.cd-nav li').on('click', function(event) {
        event.preventDefault();
        var target = $(this),
            //detect which section user has chosen
            sectionTarget = target.data('menu');
        if (!target.hasClass('cd-selected')) {
            //if user has selected a section different from the one alredy visible
            //update the navigation -> assign the .cd-selected class to the selected item
            target.addClass('cd-selected').siblings('.cd-selected').removeClass('cd-selected');
            //load the new section
            loadNewContent(sectionTarget);
        } else {
            // otherwise close navigation
            toggleNav(false);
        }
    });

    function toggleNav(bool) {
        $('.cd-nav-container, .cd-overlay').toggleClass('is-visible', bool);
        $('main').toggleClass('scale-down', bool);
    }


    function loadNewContent(newSection) {
        $('.toggle-icon').toggleClass('open');
        toggleNav(false);
        $.fn.fullpage.setAllowScrolling(false);
        $.fn.fullpage.setKeyboardScrolling(false);
        $.fn.fullpage.moveTo(newSection);

        /*
        //create a new section element and insert it into the DOM
        var section = $('<section class="cd-section '+newSection+'"></section>').appendTo($('main'));
        //load the new content from the proper html file
        section.load(newSection+'.html .cd-section > *', function(event){
        	//add the .cd-selected to the new section element -> it will cover the old one
        	section.addClass('cd-selected').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
        		//close navigation
        		toggleNav(false);
        	});
        	section.prev('.cd-selected').removeClass('cd-selected');
        });

        $('main').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
        	//once the navigation is closed, remove the old section from the DOM
        	section.prev('.cd-section').remove();
        });

        if( $('.no-csstransitions').length > 0 ) {
        	//if browser doesn't support transitions - don't wait but close navigation and remove old item
        	toggleNav(false);
        	section.prev('.cd-section').remove();
        }
        */
    }

    $('.toggle-icon').click(function() {
        $(this).toggleClass('open');
    });
});
