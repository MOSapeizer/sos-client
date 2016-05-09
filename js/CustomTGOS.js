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
	var mark = addCameraMarker(observation.feature, location[0], location[1]);
	var cctv_id = observation.result.match(/(?:StationID=)(\d{0,2})&CCDId=(\d)/);
	if( cctv_id != null ){
		var cctv_obj = new CCTVObject(cctv_id[1], cctv_id[2]);
		var cctv_box = messageBoxFactory(cctv_id[1], observation.feature, location, observation.result);
	} else {
		var cctv_box = messageBoxFactory("live-html", observation.feature, location, observation.result);
	}
	markerArrary.push(mark);
	messageBoxArray.push( cctv_box );
	CCTVObjectGroup.push( cctv_obj );

	if( cctv_id != null )
		TGOS.TGEvent.addListener(mark, "click", inSiteCCTV);
	else {
		TGOS.TGEvent.addListener(mark, "click", linkOfCCTV);
	}

	function inSiteCCTV(){
		cctv_box.open(pMap);
		var box = $(cctv_box.getElement());
		box.next().hide();
		box.find("p").css("margin", "8px");
		box.find("p > span").css("position", "absolute")
							.css("left", "1em")
							.css("color", "red");
		cctv_obj.play();
	}

	function linkOfCCTV(){
		cctv_box.open(pMap);
		var box = $(cctv_box.getElement());
		box.next().hide();
		box.height("1em");
		box.find("div").css("height", "1.5em");
	}
}

var messageBoxFactory = function(id, name, location, result){ 
	var InfoWindowOptions = { maxWidth: 200,
							  pixelOffset: new TGOS.TGSize(-60, 0),
							  zIndex: 0 };
	if( id != "live-html" ){
		var mBox = new TGOS.TGInfoWindow(show_cctv(id, "2016-05-06 00:00:00"),
				 new TGOS.TGPoint(location[0], location[1]),
				 InfoWindowOptions);
	} else {
		var mBox = new TGOS.TGInfoWindow('<a href="' + result + '">' + name + '</a>',
				 new TGOS.TGPoint(location[0], location[1]),
				 InfoWindowOptions);
	}
	return mBox; 
}

var addCameraMarker = function(id, lon, lat){
	var markerPoint = new TGOS.TGPoint(lon, lat);
	var markerImg = new TGOS.TGImage("./image/Camera-marker.png",
	                new TGOS.TGSize(32, 40), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(0, 16));
	return new TGOS.TGMarker(pMap, markerPoint, id, markerImg);
}