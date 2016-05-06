var myTimer = function() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
    // window.clearInterval(timerVariable)
}

var set_cctv_image = function(index){
	$("#cctv img").attr("src", "http://dfm.swcb.gov.tw/debrisFinal/show.asp?PK=" + index )
}

var cctv = function(station_id, ccd_id){
	$.ajax({
	    url: "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20data.html.cssselect%20WHERE%20url%3D%27http%3A%2F%2Fdfm.swcb.gov.tw%2FdebrisFinal%2FQueryCCDRange.asp%3FsDate%3D%26eDate%3D%26Stationid%3D21%26CCDID%3D1%26mode%3D1%27%20AND%20css%3D%27script%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
	    type: 'POST',
	    aysnc: false,
	    success: function(YQL){
			YQL_object = YQL.query.results;
			console.log(YQL_object);
			cctv_source = YQL_object.results.script;
			var cctv_index = cctv_source.match(/\d{8,10}/g);
			var cctv_time = cctv_source.match(/(\d{4}[/]\d{1,2}[/]\d{1,2}\s+\d{1,2}[:]\d{1,2}[:]\d{1,2})+/g).slice(4);

		}
	});

	
}