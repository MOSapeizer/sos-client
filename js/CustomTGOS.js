var messageBoxArray = [];
var markerArrary = [];

var pinIcon = L.icon({
    iconUrl: 'https://cdn2.iconfinder.com/data/icons/iconslandgps/PNG/256x256/Pinpoints/NeedleLeftYellow.png',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [-18, -42]
});

var loadMap = function() {
    pOMap = document.getElementById("TGMap");
    pMap = new TGOS.TGOnlineMap(pOMap, TGOS.TGCoordSys.EPSG3857);
}

var addCctvMarker = function(){
	if( this["feature"].location === undefined ){
		getOfferingLocation(this, this.observations[0].feature);
	}
	var location = this["feature"].location;
	var observation = this.observations[0];
	var cctv_id = observation.result.match(/(?:StationID=)(\d{0,2})&CCDId=(\d)/) || [];
	var cctv_box = createMessageBox( observation, location, cctv_id );
	var cctv_mark = addCameraMarker(observation, location);

	markEventBinder( cctv_id, cctv_mark, cctv_box );
	messageBoxArray.push( cctv_box );
	markerArrary.push( cctv_mark );

	
}

var markEventBinder = function(id, mark, caller) {
	if( id != null ) {
		var cctv_obj = new CCTVObject(id[1], id[2]);
		CCTVObjectGroup.push( cctv_obj );
		TGOS.TGEvent.addListener(mark, "click", inSiteCCTV );
	}
	else {
		TGOS.TGEvent.addListener(mark, "click", linkOfCCTV );
	}

	function inSiteCCTV(){
		caller.open(pMap);
		var box = $(caller.getElement());
		console.log(box);
		box.next().hide();
		box.find("p").css("margin", "8px");
		box.find("p > span").css("position", "absolute")
							.css("left", "1em")
							.css("color", "red");
		if( cctv_obj.isPause )
			cctv_obj.resume();
		else {
			cctv_obj.play();

			//Because TGOS is sucks, so I have to implement this function myself. WTF.
			var close_bottom = box.next().next();
			close_bottom.click(function() {
				cctv_obj.pause();
			})
		}
	}

	function linkOfCCTV(){
		caller.open(pMap);
		var box = $(caller.getElement());
		box.next().hide();
		box.height("1em");
		box.find("div").css("height", "1.5em");
	}
}

var createMessageBox = function( observation, location, cctv_id=[] ) {
	var message_options = new MessageOptionsFactory( { name: observation.feature, 
												   location: location, 
												   result: observation.result } )

	message_options["type"] = cctv_id[1] || "live-html";
	var cctv_box = messageBoxFactory( message_options );
	return cctv_box;
}

var MessageOptionsFactory = function(options){ 
	this.type = options.type || "";
	this.name = options.name || "";
	this.location = options.location || [];
	this.result = options.result || "";
}

var messageBoxFactory = function( option ){ 

	var message = '<a href="' + option.result + '">' + option.name + '</a>';

	if( option.type != "live-html" )
		return messageBoxInstance( show_cctv(option.type, "2016-05-06 00:00:00"), option.location );
	
	return messageBoxInstance( message, option.location );
}

var messageBoxInstance = function( message, location ){
	var InfoWindowOptions = { maxWidth: 200,
							  pixelOffset: new TGOS.TGSize(-60, 0),
							  zIndex: 0 };
  	var mBox = new TGOS.TGInfoWindow( message
  			   , new TGOS.TGPoint(location[0], location[1])
  			   , InfoWindowOptions);
  	return mBox
}

var addCameraMarker = function(observation, location){
	var markerPoint = new TGOS.TGPoint(location[0], location[1]);
	var markerImg = new TGOS.TGImage("./image/Camera-marker.png",
	                new TGOS.TGSize(32, 40), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(0, 16));
	return new TGOS.TGMarker(pMap, markerPoint, observation.feature, markerImg);
}