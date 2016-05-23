$(function() {

	$(".hide-control-button").click( hide_button );
	$(".show-control-button").click( show_button );
	$("#hide-info-button").click( hide_info );
	$("#show-info-button").click( show_info ).hide();

});

var whichTransitionEvent = function(){
	var t,
		el = document.createElement("fakeelement");

  	var transitions = {
 	 	"transition"      : "transitionend",
 	   "OTransition"     : "oTransitionEnd",
    	"MozTransition"   : "transitionend",
    	"WebkitTransition": "webkitTransitionEnd"
  	}

	for (t in transitions){
  		if (el.style[t] !== undefined){
      		return transitions[t];
    	}
  	}
}

var transitionEvent = whichTransitionEvent();

var hide_info = function(){
	$(".info-container").addClass("hide-info");
	$(".info-container").animate({"bottom": "-20em"}, 10);
	$(".info-container").one( transitionEvent, function(){
		$("#show-info-button").show();
	});
}

var show_info = function(){
	$("#show-info-button").hide();
	$(".info-container").removeClass("hide-info");
	$(".info-container").animate({"bottom": "2em"}, 10);
}

var hide_button = function(){
	$(".control-block").addClass("hide-control");
	exchange_active();
}

var show_button = function(){
	$(".control-block").removeClass("hide-control");
	exchange_active();
}

var exchange_active = function(){
	$(".hide-control-button").toggleClass("active");
	$(".show-control-button").toggleClass("active show-button-animate");
}