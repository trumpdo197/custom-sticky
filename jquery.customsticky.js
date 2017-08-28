/**
 * Author: Terry Do <hou.dobaotrung@gmail.com>
 * Description: Simple sticky plugin which elements won't go back to its initial position after unstick.
 */

(function ( $ ) {
    var stickyElemOldStyle = '';
 
    $.fn.customSticky = function(user_options){

        var elem    = $(this);
        var options = $.extend( {}, $.fn.customSticky.defaults, user_options );
       
        // Get element's old style. If user destroy plugin, it'll recover element's old style.
        if (stickyElemOldStyle == '')
            stickyElemOldStyle = elem.attr('style') == undefined ? '' : elem.attr('style');
        
        elem.isInit = (elem.isInit == undefined) ? false : true;

        if (!elem.isInit){
            // Get current element
            
            // Get options variables
            var road                = options.road;
            var unstickBefore       = options.unstickBefore;

            // Positioning element after position becomes absolute.
            var offsetTop           = options.offsetTop;
            var offsetBottom        = options.offsetBottom;
            var offsetLeft          = options.offsetLeft;
            var offsetRight         = options.offsetRight;

            // End getting variables
            
            // Callbacks
            var afterInit           = options.afterInit;

            var unstickBeforeOffsetTop = 0;
            if (unstickBefore){
                unstickBeforeOffsetTop = unstickBefore.offset().top;
            }

            // Anchor is the starting point.
            var anchor      = elem.offset().top;
            // Endpoint is the point where its position changes from fixed to absolute.
            var endpoint    = (unstickBefore) ? unstickBeforeOffsetTop : (road + anchor);
            
            // Child properties
            var childWidth  = elem.width();
            var childBottom = elem.offset().bottom;
            var childHeight = elem.height();
            var childGapVSWindow = $(window).height() - childHeight;

            // Get parent and do stuffs
            var parentDiv       = elem.parent();
            var parentOffsetTop = parentDiv.offset().top;

            // Current state
                // State constants
                var BEFORE_ANCHOR               = 1;
                var BETWEEN_ANCHOR_AND_ENDPOINT = 2;
                var AFTER_ENDPOINT              = 3;
                var currentState;

            // Processing when scrolling
            var scrollHandler = function(){
                var scrollTop           = $(this).scrollTop();
                var scrollBottom        = scrollTop + $(window).height();

                var childOffsetTop      = elem.offset().top;
                var childOffsetBottom   = elem.offset().bottom;

                var positioningElement = function(){
                    if (offsetTop == 0 && offsetLeft == 0 && offsetRight == 0 && offsetBottom == 0)
                        elem.css('top', 0);
                    else {
                        if (offsetTop)
                            elem.css('top', offsetTop);
                        if (offsetLeft)
                            elem.css('left', offsetLeft);
                        if (offsetRight)
                            elem.css('right', offsetRight);
                        if (offsetBottom)
                            elem.css('bottom', offsetBottom);
                    }                  
                }

                // Scrolling below anchor
                if (scrollTop < anchor && currentState != BEFORE_ANCHOR){
                    elem.attr('style',stickyElemOldStyle);
                    currentState = BEFORE_ANCHOR;
                }
                // Is unstick before a div?
                if (unstickBefore){
                    if (scrollBottom >= endpoint && currentState != AFTER_ENDPOINT){
                        // Calculate the element's position from its parent.
                        elementOffsetTopFromParent = endpoint - parentOffsetTop - childHeight - childGapVSWindow;
                        elem.attr('style','position:absolute;top:' + elementOffsetTopFromParent + 'px');
                        currentState = AFTER_ENDPOINT;
                    }
                    else if (scrollTop > anchor && scrollBottom < endpoint && currentState != BETWEEN_ANCHOR_AND_ENDPOINT) {
                        elem.attr('style','position: fixed;z-index:999;width:' + childWidth + 'px');
                        positioningElement();
                        currentState = BETWEEN_ANCHOR_AND_ENDPOINT;
                    }
                }
                else {
                    if (scrollTop >= endpoint && currentState != AFTER_ENDPOINT){
                        elem.attr('style','position:absolute;top:' + (endpoint - anchor) + 'px');
                        currentState = AFTER_ENDPOINT;
                    }
                    else if (scrollTop > anchor && scrollTop < endpoint && currentState != BETWEEN_ANCHOR_AND_ENDPOINT){
                        elem.attr('style','position: fixed;z-index:999;width:' + childWidth + 'px');
                        positioningElement();
                        currentState = BETWEEN_ANCHOR_AND_ENDPOINT;
                    }
                }
            }
            scrollHandler();

            $(window).scroll(scrollHandler);
            
            // Callbacks
            if (afterInit && typeof(afterInit) === "function") {
                afterInit();
            }

            // Done initing...
            elem.isInit = true;

            // Destroy function
            elem.destroy = function(){
                if (stickyElemOldStyle == undefined){
                    elem.attr('style',stickyElemOldStyle);
                }
                else {
                    elem.attr('style',stickyElemOldStyle);
                };
                elem.isInit = false;
                $(window).off("scroll", scrollHandler);
            }
        }
        // currently not working!
        else {
            console.log('Warning: The plugin has already initialized.');
        }

        return elem;
    }

    /**
     * Plugin's default settings.
     * @type {Object}
     * Params: 
     *  + road             : Define how long it will stick before stopping.
     *  + destroy          : Destroy plugin.
     *  + unstickBefore    : Unstick before a determined element.
     *  + afterInit        : Callback function after initing the plugin.
     */
    $.fn.customSticky.defaults = {
        road            : 1000,
        destroy         : null,
        unstickBefore   : null,
        afterInit       : null,
        offsetTop       : 0,
        offsetBottom    : 0,
        offsetLeft      : 0,
        offsetRight     : 0,
    }

}( jQuery ));