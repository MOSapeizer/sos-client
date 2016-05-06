var getObservationXML = function(name, property, range){
    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '\t<sos:GetObservation\n' +
            '\t\txmlns:sos="http://www.opengis.net/sos/2.0"\n' +
            '\t\txmlns:fes="http://www.opengis.net/fes/2.0"\n' +
            '\t\txmlns:gml="http://www.opengis.net/gml/3.2"\n' +
            '\t\txmlns:swe="http://www.opengis.net/swe/2.0"\n' +
            '\t\txmlns:xlink="http://www.w3.org/1999/xlink"\n' +
            '\t\txmlns:swes="http://www.opengis.net/swes/2.0" service="SOS" version="2.0.0">\n\n' + 
            '\t\t<sos:offering>' + name + '</sos:offering>\n' +
            '\t\t<sos:observedProperty>' + property + '</sos:observedProperty>\n' +
            temporalFilter(range) +
            '\t\t<sos:responseFormat>http://www.opengis.net/om/2.0</sos:responseFormat>\n' +
        '\t</sos:GetObservation>';
}

var getFeatureOfInterest = function(name){
    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '\t<sos:GetFeatureOfInterest\n' +
            '\t\txmlns:sos="http://www.opengis.net/sos/2.0"\n' +
            '\t\txmlns:fes="http://www.opengis.net/fes/2.0"\n' +
            '\t\txmlns:gml="http://www.opengis.net/gml/3.2"\n' +
            '\t\txmlns:swe="http://www.opengis.net/swe/2.0"\n' +
            '\t\txmlns:xlink="http://www.w3.org/1999/xlink"\n' +
            '\t\txmlns:swes="http://www.opengis.net/swes/2.0" service="SOS" version="2.0.0">\n\n' + 
            '\t\t<sos:featureOfInterest>' + name + '</sos:featureOfInterest>\n' +
        '\t</sos:GetFeatureOfInterest>';
}

var temporalFilter = function(range){
    if(range[0] != range[1]) {
        return '\t\t<sos:temporalFilter>\n' +
            '\t\t\t<fes:During>\n' +
                '\t\t\t\t<fes:ValueReference>phenomenonTime</fes:ValueReference>\n' +
                '\t\t\t\t<gml:TimePeriod gml:id="tp_1">\n' +
                    '\t\t\t\t\t<gml:beginPosition>' + range[0] + '</gml:beginPosition>\n' +
                    '\t\t\t\t\t<gml:endPosition>' + range[1] + '</gml:endPosition>\n' +
                '\t\t\t\t</gml:TimePeriod>\n' +
            '\t\t\t</fes:During>\n' +
        '\t\t</sos:temporalFilter>\n';
    }
    return "";
}