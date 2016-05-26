var CCTVObjectGroup = [];

var myTimer = function() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
    // window.clearInterval(timerVariable)
}

var show_cctv = function(id, timestamp){
	return '<img id="' + id + '" src="" alt="">'
		   + '<div class="info-control"> ' 
		   + ' 	<span></span>' 
		   +'	<button class="back-button"></button>' 
		   + '</div>';
}

var cctv = function(station_id, ccd_id){
	var cctv_obj = this;
	$.ajax({
	    url: "http://swcb-cctv.herokuapp.com/cctv/" + station_id + "/" + ccd_id,
	    type: 'GET',
	    aysnc: true,
	    cctv_obj: cctv_obj,
	    success: function(cctv_json){
			cctv_obj.images = cctv_obj.images.concat(cctv_json.index);
			cctv_obj.times = cctv_obj.times.concat(cctv_json.timestamp);
			$.unique( cctv_obj.images );
			$.unique( cctv_obj.times );
		}
	});
}

var CCTVObject = function(station_id, ccd_id){
	var instance = this;
	var IMAGES_QUEUE_UPDATE_PERIOD = 60000;
	var IMAGES_CHANGE_PERIOD = 1000;
	this.index = 0;
	this.station_id = station_id;
	this.ccd_id = ccd_id;
	this.images = [];
	this.times = [];
	this.isPause = false;
	this.info_window = null;
	this.play = function(){
		initImagseGroup();

		// update images array
		setInterval( instance.updateImages, IMAGES_QUEUE_UPDATE_PERIOD);

		// cctv show
		setInterval( instance.updateCCTV, IMAGES_CHANGE_PERIOD);
	};
	this.pause = function(){
		instance.isPause = true;
	};
	this.resume = function(){
		instance.isPause = false;
	};
	this.updateImages = function(){
		cctv.call(instance, instance.station_id, instance.ccd_id);
	};
	this.updateCCTV = function(){ 
		if(instance.images.length > 0 && !instance.isPause){
			if( instance.index >= instance.images.length )
				instance.index = 0;
			timestamp = instance.times[instance.index];
			image = instance.images[instance.index++];
			update_cctv( instance.station_id, image, timestamp );
		}
	}

	var update_cctv = function(id, index, timestamp){
		var info_window = instance.info_window;
		info_window.find(".info-cover").fadeOut();
		info_window.find("#" + id).attr("src", "http://dfm.swcb.gov.tw/debrisFinal/show.asp?PK=" + index );
		info_window.find(".info-control span").text( timestamp );
		// $("#" + id).nextAll().filter("button").text( "放大" );
	}

	var initImagseGroup = function(){
		instance.updateImages();
	}
}