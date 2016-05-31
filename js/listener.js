
// Change when select a offeringID
function ChangeOfferingInfo(name) {
   	match = $.grep( json, match_name )[0];
   	update_property( match );
    range_of_time = groupPosition( match );
    if(range_of_time.length > 0){
        show("time");
        $("#startTime").attr("value", range_of_time[0]);
        $("#endTime").attr("value", range_of_time[1]);
    } else {
        hide("time");
    }

    function match_name( object, index ){
    	return object.identify == name;
    }
}

function groupPosition(offering) {
    begin = offering.beginTime.split(" +")[0];
    end = offering.endTime.split(" +")[0];
    if( begin != "" && end != "")
        return [begin, end];
    return [];
}

function update_property(name){
    var properties = [];
    name.observed_properties.forEach(function(o){
        properties.push(o.property);
    });
    update("property", properties);
}

var show = function(tag){
    $("." + tag).css("display", "block");
}

var hide = function(tag){
    $("." + tag).css("display", "none");
}