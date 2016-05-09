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
	var cctv_box = messageBoxFactory(observation.feature, location, observation.result);
	markerArrary.push(mark);
	messageBoxArray.push( cctv_box );
	TGOS.TGEvent.addListener(mark, "click", function(){

		// so much dependencies
		cctv_box.open(pMap);
		var box = $(cctv_box.getElement());
		box.height("1em");
		box.next().hide();
		box.find("div").css("height", "1.5em");
	});
}

var messageBoxFactory = function(name, location, result){ 
	var InfoWindowOptions = { maxWidth: 380,
							  pixelOffset: new TGOS.TGSize(-60, 0),
							  zIndex: 0 };
	var mBox = new TGOS.TGInfoWindow('<a href=\"' + result + '\">' + name + '</a>',
				 new TGOS.TGPoint(location[0], location[1]),
				 InfoWindowOptions);
	return mBox; 
}

var addCameraMarker = function(id, lon, lat){
	var markerPoint = new TGOS.TGPoint(lon, lat);
	var markerImg = new TGOS.TGImage("./image/Camera-marker.png",
	                new TGOS.TGSize(32, 40), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(0, 16));
	return new TGOS.TGMarker(pMap, markerPoint, id, markerImg);
}