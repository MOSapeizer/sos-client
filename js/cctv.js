var CCTVObjectGroup = [];

var myTimer = function() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
    // window.clearInterval(timerVariable)
}

var set_cctv_image = function(index){
	$("#cctv img").attr("src", "http://dfm.swcb.gov.tw/debrisFinal/show.asp?PK=" + index )
}

var cctv = function(station_id, ccd_id){
	cctv_obj = this;
	$.ajax({
	    url: "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20data.html.cssselect%20WHERE%20url%3D%27http%3A%2F%2Fdfm.swcb.gov.tw%2FdebrisFinal%2FQueryCCDRange.asp%3FsDate%3D%26eDate%3D%26Stationid%3D21%26CCDID%3D1%26mode%3D1%27%20AND%20css%3D%27script%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
	    type: 'POST',
	    aysnc: true,
	    cctv_obj: cctv_obj,
	    success: function(YQL){
			YQL_object = YQL.query.results;
			cctv_source = YQL_object.results.script;
			var cctv_index = cctv_source.match(/\d{8,10}/g);
			var cctv_times = cctv_source.match(/(\d{4}[/]\d{1,2}[/]\d{1,2}\s+\d{1,2}[:]\d{1,2}[:]\d{1,2})+/g).slice(4);
			// concat cctv_index with old list and make it unique;
			cctv_obj.images = cctv_obj.images.concat(cctv_index);
			cctv_obj.times = cctv_obj.times.concat(cctv_times);
			$.unique( cctv_obj.images );
			$.unique( cctv_obj.times );
		}
	});
}

var CCTVObject = function(url){
	this.index = 0;
	this.station_id = 21;
	this.ccd_id = 1;
	this.images = [];
	this.times = [];
	this.play = function(){
		// update images
		setInterval( this.updateImages.bind(this), 4000);

		// cctv show
		setInterval( this.updateCCTV.bind(this), 1000);
	};
	this.pause = function(){
		console.log("pause");
	};
	this.resume = function(){
		console.log("resume");
	};
	this.updateImages = function(){
		cctv.bind(this, this.station_id, this.ccd_id)();
	};
	this.updateCCTV = function(){ 
		if(this.images.length > 0){
			if( this.index >= this.images.length )
				this.index = 0;
			image = this.images[this.index++];
			console.log(image); 
			set_cctv_image( image );
		}
	}
}