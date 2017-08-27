# Custom Sticky
Terry Do (hou.dobaotrung@gmail.com)

## Overview
Custom Sticky is small, free open-source plugin which helps you in making sidebar sticks after scrolling a short path and stay where it is after a long path.

## Licenses
* MIT License

## Compatibility
* Jquery v1.7.1 or above is required.

## Usage
	$("#yoursidebar").customSticky();

## Options    

_road_    
  Define the scroll path's length that the sidebar doesn't fixed anymore and stay where it is. Default: 1000 (px).
  
_destroy_    
  Destroy the plugin. Default: false.
  
_unstickBefore_     
  Shouldn't use along with _road_. This will be the element which your sidebar stop being fixed before its top. Default: NULL.

_offsetTop_, _offsetBottom_, _offsetLeft_, offsetRight    
	Positioning the element after being fixed.Default: 0;