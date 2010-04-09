/* ------------------------------------------------------------------------
	Class: prettyLoader
	Use: A unified solution for AJAX loader
	Author: Stephane Caron (http://www.no-margin-for-errors.com)
	Version: 1.0
------------------------------------------------------------------------- */

(function($) {
	$.prettyLoader = {version: '1.0'};
	
	$.prettyLoader = function(settings) {
		settings = jQuery.extend({
			animation_speed: 'fast', /* fast/normal/slow/integer */
			bind_to_ajax: true, /* true/false */
			delay: false, /* false OR time in milliseconds (ms) */
			loader: '/prettyLoader/images/prettyLoader/ajax-loader.gif', /* Path to your loader gif */
			offset_top: 13, /* integer */
			offset_left: 10 /* integer */
		}, settings);
		
		scrollPos = _getScroll();
		
		// Window/Keyboard events
		$(window).unbind('scroll').scroll(function(){ scrollPos = _getScroll(); });
		
		if(settings.bind_to_ajax)
			jQuery(document).ajaxStart(function(){ $.prettyLoader.show() }).ajaxStop(function(){ $.prettyLoader.hide() });
	
		$.prettyLoader.show = function(delay){
			if($('.prettyLoader').size() > 0) return;
			
			// Build the loader container
			$('<div></div>')
				.addClass('prettyLoader')
				.addClass('prettyLoader_'+ settings.theme)
				.appendTo('body')
				.hide();
			
			// No png for IE6...sadly :(
			if($.browser.msie && $.browser.version == 6)
				$('.prettyLoader').addClass('pl_ie6');

			// Build the loader image
			$('<img />')
				.attr('src',settings.loader)
				.appendTo('.prettyLoader');

			// Show it!
			$('.prettyLoader').fadeIn(settings.animation_speed);
			
			$(document).bind('click',function(e){
				e = e ? e : window.event;
				
				left_pos = e.clientX + settings.offset_left + scrollPos['scrollLeft'];
				top_pos = e.clientY + settings.offset_top + scrollPos['scrollTop'];
				
				$('.prettyLoader').css({
					'top':top_pos,
					'left':left_pos
				});
			});
			
			$(document).bind('mousemove',function(e){
				// Get the cursor position
				e = e ? e : window.event;
				left_pos = e.clientX + settings.offset_left + scrollPos['scrollLeft'];
				top_pos = e.clientY + settings.offset_top + scrollPos['scrollTop'];
				
				$('.prettyLoader').css({
					'top':top_pos,
					'left':left_pos
				});
			});
			
			delay = (delay) ? delay : settings.delay;
			
			if(delay){
				setTimeout(function(){ $.prettyLoader.hide() }, delay);
			}
		};

		$.prettyLoader.hide = function(){
			$('.prettyLoader').fadeOut(settings.animation_speed,function(){
				$(this).remove();
			});
		};
		
		function _getScroll(){
			if (self.pageYOffset) {
				return {scrollTop:self.pageYOffset,scrollLeft:self.pageXOffset};
			} else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
				return {scrollTop:document.documentElement.scrollTop,scrollLeft:document.documentElement.scrollLeft};
			} else if (document.body) {// all other Explorers
				return {scrollTop:document.body.scrollTop,scrollLeft:document.body.scrollLeft};
			};
		};
		
		return this;
	};

})(jQuery);