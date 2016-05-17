$(function() {

	$(".hide-control-button").click( hide_button );
	$(".show-control-button").click( show_button );
    
});

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
	$(".show-control-button").toggleClass("active active-show");
}