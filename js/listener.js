
// Change when select a offeringID
function ChangeOfferingInfo(name) {
    offering = xml.find("offering");
   	match = $.grep( offering, match_name );
   	update_property( match );
    range = groupPosition( $(match).find("phenomenonTime"));
    if(range.length > 0){
        show("time");
        $("#startTime").attr("value", range[0]);
        $("#endTime").attr("value", range[1]);
    } else {
        hide("time");
    }

    function match_name( element, index ){
    	return $(element).find("identifier").text() == name;
    }
}

function update_property(name){
    property = $(name).find("observableProperty");
    update("property", property);
}