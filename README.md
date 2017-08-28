# Custom Sticky
Terry Do (hou.dobaotrung@gmail.com)

## Overview
Custom Sticky is small, free open-source plugin which helps you in making sidebar sticks on scrolling and stay where it is instead of returning its original position when unsticking. This is mainly used for sticky sidebars.

## Usage
	$("#yoursidebar").customSticky();

## Options    

<dl>
  <dt>road</dt>
  <dd>Define the scroll path's length that the sidebar'd be fixed. <b>Default</b>: 1000 (px).</dd>
  
  <dt>destroy</dt>
  <dd>Destroy the plugin. <b>Default</b>: false.</dd>
  
  <dt>unstickBefore (jQuery Object)</dt>
  <dd>Don't use along with <em>road</em>. Your sidebar will stop being fixed before this element's top border. <b>Default</b>: NULL.</dd>

  <dt>offsetTop, offsetBottom, offsetLeft, offsetRight</dt>
  <dd>Positioning the sidebar after being fixed. <b>Default</b>: 0;</dd>
</dl>

## Some Examples    
	// Unstick and stay where it is after scrolling 2000px.
	$("#yoursidebar").customSticky({
    	road: 2000,
    })
    
    // Unstick and stay where it is after scrolling to the top of an element.
    $("#yoursidebar").customSticky({
    	unstickBefore: $('#div'),
    })
    
    // Rekt it!
    $("#yoursidebar").customSticky({
    	destroy: true,
    })
    
## Compatibility
* Jquery v1.7.1 or above is required.
    
## Licenses
* MIT License
