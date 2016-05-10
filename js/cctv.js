var CCTVObjectGroup = [];

var myTimer = function() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
    // window.clearInterval(timerVariable)
}

var show_cctv = function(id, timestamp){
	return '<img id="' + id + '" src="http://dfm.swcb.gov.tw/debrisFinal/show.asp?PK=13819687" width="200" height="200" alt="">'
		   + "<span>" + timestamp + "<span>"
}

var update_cctv = function(id, index, timestamp){
	$("#" + id).attr("src", "http://dfm.swcb.gov.tw/debrisFinal/show.asp?PK=" + index )
	$("#" + id).next().text( timestamp );
}

var cctv = function(station_id, ccd_id){
	cctv_obj = this;
	$.ajax({
	    url: "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20data.html.cssselect%20WHERE%20url%3D%27http%3A%2F%2Fdfm.swcb.gov.tw%2FdebrisFinal%2FQueryCCDRange.asp%3FsDate%3D%26eDate%3D%26Stationid%3D" + station_id + "%26CCDID%3D" + ccd_id + "%26mode%3D1%27%20AND%20css%3D%27script%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
	    type: 'POST',
	    aysnc: true,
	    cctv_obj: cctv_obj,
	    success: function(YQL){
			YQL_object = YQL.query.results;
			cctv_source = YQL_object.results.script;
			var cctv_index = cctv_source.match(/\d{8,10}/g);
			var cctv_times = cctv_source.match(/(\d{4}[/]\d{1,2}[/]\d{1,2}\s+\d{1,2}[:]\d{1,2}[:]\d{1,2})+/g)
			cctv_times.splice( cctv_times.length-4, 4);
			// concat cctv_index with old list and make it unique;
			cctv_obj.images = cctv_obj.images.concat(cctv_index);
			cctv_obj.times = cctv_obj.times.concat(cctv_times);
			$.unique( cctv_obj.images.sort() );
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
			console.log(this.station_id + ": " + this.index + " " + image + " of " + this.images);
			update_cctv( this.station_id, image, timestamp );
		}
	}
}