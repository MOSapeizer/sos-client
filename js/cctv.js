var CCTVObjectGroup = [];

var myTimer = function() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
    // window.clearInterval(timerVariable)
}

var show_cctv = function(id, timestamp){
	return '<img id="' + id + '" src="image/CCTV.png" width="200" height="200" alt="">'
		   + "<span>" + timestamp + "<span> ";
}

var update_cctv = function(id, index, timestamp){
	$("#" + id).attr("src", "http://dfm.swcb.gov.tw/debrisFinal/show.asp?PK=" + index );
	$("#" + id).nextAll().filter("span").text( timestamp );
	// $("#" + id).nextAll().filter("button").text( "放大" );
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
	this.index = 0;
	this.station_id = station_id;
	this.ccd_id = ccd_id;
	this.images = [];
	this.times = [];
	this.isPause = false;
	this.play = function(){
		// update images array
		initImagseGroup.bind(this);
		setInterval( this.updateImages.bind(this), 4000);

		// cctv show
		setInterval( this.updateCCTV.bind(this), 1000);
	};
	this.pause = function(){
		this.isPause = true;
	};
	this.resume = function(){
		this.isPause = false;
	};
	this.updateImages = function(){
		cctv.bind(this, this.station_id, this.ccd_id)();
	};
	this.updateCCTV = function(){ 
		if(this.images.length > 0 && !this.isPause){
			if( this.index >= this.images.length )
				this.index = 0;
			timestamp = this.times[this.index];
			image = this.images[this.index++];
			// console.log(this.station_id + ": " + this.index + " " + image + " of " + this.images);
			update_cctv( this.station_id, image, timestamp );
		}
	}

	var initImagseGroup = function(){
		this.updateImages.bind(this)();
	}
}