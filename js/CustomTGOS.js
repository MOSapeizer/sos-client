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

var addMarker = function(){
	if( this["feature"].location === undefined ){
		getOfferingLocation(this, this.observations[0].feature);
	}
	var location = this["feature"].location;
	addCameraMarker(location[0], location[1]);
}

var addCameraMarker = function(lon, lat){
	var markerPoint = new TGOS.TGPoint(lon, lat);
	var markerImg = new TGOS.TGImage("/Users/zil/Documents/task/sos-client/image/Camera-marker.png",
	                new TGOS.TGSize(32, 40), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(0, 16));
	return new TGOS.TGMarker(pMap, markerPoint, "內政部", markerImg);
}