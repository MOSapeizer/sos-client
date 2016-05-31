var pOMap = null;
var pMap = null;
var readingArray = []; // this object stores the Reading objects (value) based on each FeatureOfInterest (key)
var offeringGroup = [];
var json;
var hostname_regex = /localhost|127(?:\.[0-9]+){0,2}\.[0-9]+|mos\.csrsr\.ncu\.edu\.tw:8080/;
var URL = [ "http://140.115.111.186:8080/swcb-sos-new/service", 
            "http://140.115.111.186:8080/epa-sos/service", 
            "https://swcb-cctv.herokuapp.com/swcb"]

var UrlForCapability = function( url ) {
    return url;
}

var UrlForObservation = function( url, offering ) {
    return url + "/" + offering;
}

var UrlForFeatrueOfInterest = function( url, featureOfInterest ){
    return UrlForObservation(url, featureOfInterest);
}

// A class called Reading
var Reading = function(foiName, lat, lon, propertyURN, uom, lastTime, lastValue, observationArray) {
    this.foiName = foiName;
    this.lat = lat;
    this.propertyURN = propertyURN;
    this.uom = uom;
    this.lastTime = lastTime;
    this.lastValue = lastValue;
    this.observationArray = observationArray; // this variable directly store the input data for the HighChart.js
}

var request = function(){
    this.url = URL[ getValueById("sosURL") ];
    this.name = getValueById("offeringID");
    this.property = getValueById("property");
    this.range = [getValueById("startTime"), getValueById("endTime")];
}

function getcapabilities(index) {
	var xmlhttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
	   xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
	   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", UrlForCapability( URL[index] ), true);
    xmlhttp.onreadystatechange = handler
	xmlhttp.send();
}

var handler = function() {
    if (this.readyState == 4 && this.status == 200){
        parseCapabilities(this.responseText);
    }
};

var xmlParser = function(response){
    xmlDoc = $.parseXML( response );
    return $(xmlDoc);
}

var optionFactory = function(data){
    return '<option value="' + data + '">' + data + '</option>'
}

var update = function(name, array){
    tag = $("#" + name).empty();
    option_offerings = array.map( optionFactory );
    option_offerings.forEach( function(value){
        tag.append( value ); 
    });
}

var getSelectedValue = function(name){
    return $("#" + name).children().first().text();
}

var parseCapabilities = function(jsonString) {
    json = JSON.parse( jsonString );
    var offering = [];
    var map_offering = function(obj){ 
        offeringGroup.push(obj);
        offering.push(obj.identify) 
    };
    json.forEach(map_offering);
    update("offeringID", offering);
    offering_name = getSelectedValue("offeringID");
    ChangeOfferingInfo( offering_name );
}

var getValueById = function(name){
    return document.getElementById(name).value;
}

var doGetObservation = function() {
    var packet = new request();
    var url = UrlForObservation( packet.url, packet.name );
    var data = "";

    xmlRequest(url, data, handleResponse, {name: packet.name});

}

var handleResponse = function(observations){
    var offering_name = this["cache"].name;
    var offering = $.grep(offeringGroup, function(offering){
        return offering.identify == offering_name;
    })[0];
    offering["observations"] = [];
    observations.forEach(function(observation){
        offering["observations"].push( observation );
    });

    //there can handle how offering will work when click 
    // get Observation button;
    addCctvMarker.call( offering );
}

var xmlRequest = function(url, data, callback, cache={}, async=true){
    var xmlRequest = $.ajax({
        url: url,
        type: 'Get',
        async: async,
        data: data,
        dataType: 'json',
        success: callback,
        cache: cache
    });
}

var parse_position = function(position){
    return position.split(" ");
}

function doGetObservationHandler(xmlhttp) {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { // if the request is successful
        if (xmlhttp.responseText.indexOf('exception') == -1) { // if the SOS response is not an error (the response does not contain the 'exception' string)

            txt = xmlhttp.responseText;
            if (window.DOMParser) {
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(txt, "text/xml");
            } else // Internet Explorer
            {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.loadXML(txt);
            }

            parseGetObservationResponse(xmlDoc);
        }
    }
}


function parseGetObservationResponse(xmlDoc) {
	
    var lat = null;
    var lon = null;
    var foiName = null;
    var propertyURN = null;
    var uom = null;
    var lastTime = null;
    var lastValue = null;
    var observationArray = [];
    var samplingPoint = xmlDoc.getElementsByTagName('SamplingPoint')[0];
	var procedure = null;
	
	procedure = xmlDoc.getElementsByTagName('procedure')[0].getAttribute('xlink:href');
    foiName = samplingPoint.getElementsByTagName('name')[0].childNodes[0].nodeValue;
    var arrayOfWords = xmlDoc.getElementsByTagName("lowerCorner")[0].childNodes[0].nodeValue.split(" ");

    lat = arrayOfWords[1];
    lon = arrayOfWords[0];


    propertyURN = xmlDoc.getElementsByTagName("observedProperty")[0].getAttribute('xlink:href');
    uom = xmlDoc.getElementsByTagName("result")[0].getAttribute('uom');

    
    

    var member = xmlDoc.getElementsByTagName('member');
    var sorttime = [];

    for (var j = 0; j < member.length; j++) {
        sorttime[j] = xmlDoc.getElementsByTagName("timePosition")[j].childNodes[0].nodeValue + " " + xmlDoc.getElementsByTagName("result")[j].childNodes[0].nodeValue;
    }

    var arrayOfsort = sorttime.sort();
	for (var j = 0; j < member.length; j++) {
		var aaa = arrayOfsort[j].split(" ")[0];
		var bbb = arrayOfsort[j].split(" ")[1];
		time = new Date(aaa.replace('.000', ''));
        time2 = Number(time);
        temp = Number(bbb);
        observationArray[j] = [];
        observationArray[j][0] = time2;
        observationArray[j][1] = temp;
		observationArray[j][2] = propertyURN;
		observationArray[j][3] = foiName;
		observationArray[j][4] = procedure;
        lastTime = time.toString().replace('GMT+0800 (台北標準時間)', '');
        lastValue = temp;
	}
	
    var reading = new Reading(foiName, lat, lon, propertyURN, uom, lastTime, lastValue, observationArray); // this uses the predefined "Reading" class to create a "reading" object (object-oriented)
    readingArray[foiName] = reading; // here insert/update a key-value pair in the global variable "readingArray", where the key is the FeatureOfInterest name, and the value is the "reading" object created in the previous line

    OldAddMarker(foiName); // after parsing all the observations, we can now overlay the data on the map
	
    //showtable(propertyURN,member.length,observationArray);
	drawChart(foiName);
}

function showtable(propertyURN,memberlength,observationArray){
	document.getElementById("resultTable").innerHTML = '<table class="table table-bordered table-hover table-bordered" id="newTable" border="1"><tr><th>Time</th><th>' + observationArray[0][2] + '</th></tr></table>';
	var newTable = document.getElementById("newTable"); // this is the table showing all the observations
	for (var j = 0; j < memberlength; j++) {
        var num = document.getElementById("newTable").rows.length;
        var Tr = document.getElementById("newTable").insertRow(num);
        var cell1 = Tr.insertCell(0);
        var cell2 = Tr.insertCell(1);
		var myDate = new Date(observationArray[j][0]);
        cell1.innerHTML = myDate.toString().replace('GMT+0800 (台北標準時間)', '');
        cell2.innerHTML = observationArray[j][1];
    }
	
}

function OldAddMarker(foiName) {
	
    //for (foiName in readingArray) { // access all the keys in the global variable "readingArray"
        var point = null;
        var reading = readingArray[foiName];
        var pt = new TGOS.TGPoint(reading.lon, reading.lat);
		var icon = null;
        if(document.getElementById("sosURL").value=="http://cgis.csrsr.ncu.edu.tw:8080/swcb-sos-new/service"){
			icon = new TGOS.TGImage("http://210.65.11.194/TGOS_API/images/marker.png",
            new TGOS.TGSize(38, 33), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		}
        else if(document.getElementById("sosURL").value=="http://cgis.csrsr.ncu.edu.tw:8080/epa-sos/service"){
			icon = new TGOS.TGImage("http://i.imgur.com/XExhkhs.png?2",
            new TGOS.TGSize(38, 33), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		}
		else{
			icon = new TGOS.TGImage("http://cgis.csrsr.ncu.edu.tw:8080/epa-aqx-sos/service",
            new TGOS.TGSize(38, 33), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		}
        var marker = new TGOS.TGMarker(pMap, pt, reading.observationArray, icon);
        var InfoWindowOptions = {
            maxWidth: 3000, //訊息視窗的最大寬度
            pixelOffset: new TGOS.TGSize(5, -30), //InfoWindow起始位置的偏移量
            //使用TGSize設定
            //向右X為正, 向上Y為負
            zIndex: 99 //視窗堆疊順序
        };
        messageBox = new TGOS.TGInfoWindow('<b>' + foiName + '</b>' + "=" + reading.lastValue + " " + reading.uom + " @ " + reading.lastTime + '</br><a href="javascript:describesensor(\''+document.getElementById("sosURL").value+'\',\''+marker.getTitle()[0][4]+'\')">取得感測器描述文檔</a>', pt, InfoWindowOptions);
        TGOS.TGEvent.addListener(marker, "click", function (marker, messageBox) {
           return function () {       
            messageBox.open(pMap, marker);
																//showtable(marker.getTitle(),marker.getTitle().length,marker.getTitle());
																drawChart(marker.getTitle()[0][3]);
                                                           }
                                                       } (marker, messageBox));
        TGOS.TGEvent.addListener(marker, "rightclick", function (marker, messageBox) {
           return function () {                  
            messageBox.close(pMap, marker);
        }
    } (marker, messageBox));

    //}

}

function describesensor(sosURL,procedure){
	var bodyMessage = '<?xml version="1.0" encoding="UTF-8"?>\
<swes:DescribeSensor\
    xmlns:swes="http://www.opengis.net/swes/2.0"\
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
    xmlns:gml="http://www.opengis.net/gml/3.2" service="SOS" version="2.0.0" xsi:schemaLocation="http://www.opengis.net/swes/2.0 http://schemas.opengis.net/swes/2.0/swes.xsd">\
    <swes:procedure>'+procedure+'</swes:procedure>\
    <swes:procedureDescriptionFormat>http://www.opengis.net/sensorML/1.0.1</swes:procedureDescriptionFormat>\
</swes:DescribeSensor>';

    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var node = document.createElement('textarea');
			node.setAttribute('rows', '100');
			node.setAttribute('cols', '100');
			node.value = xmlhttp.responseText;
			document.getElementById("describesensor").innerHTML = "<h4><b>感測器描述文檔</b></h4>";
            document.getElementById("describesensor").appendChild(node);
        }
    }
    xmlhttp.open("POST", sosURL, true);
    xmlhttp.setRequestHeader("Content-type", "application/xml");
    xmlhttp.send(bodyMessage);
}

function drawChart(foiName) {

    var reading = readingArray[foiName];
    var propertyString = reading.propertyURN;
    if (reading.propertyURN.indexOf(":") > -1) {
        var tmp = reading.propertyURN.split(":");
        var propertyString = tmp[tmp.length - 1]; // this retrieves the last token of the ObservedPropertyURN, which should be "temperature"
    }

    $(function() {
        $('#container').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: '時間序列'
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: '時間'
                }
            },
            yAxis: {
                title: {
                    text: propertyString + ' (' + reading.uom + ')'
                },
                min: 0
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span>{point.x:'+propertyString+'}: <b>{point.y:.2f} '+reading.uom+'</b>'
            },

            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },

            series: [{
                name: propertyString,
                data: reading.observationArray
            }]
        });
    });
}