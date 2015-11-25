
/*
 * This requires: restler
 * To install, type 'npm install restler'
 * Tested with node.js v0.6.14
 */

var moment = require('moment');
var restclient = require('restler');

var fxml_url = 'http://flightxml.flightaware.com/json/FlightXML2/';
var username = 'memodoring';
var apiKey = 'b64770ae6b5c6a2f0aef95bcff641649a77cf997';

restclient.get(fxml_url + 'FlightInfo', {
  username: username,
  password: apiKey,
  query:{ident:'ASA746', howMany: 3}
}).on('success', function(result,response){
  //console.log(util.inspect(result, true, null));
  var flights = result.FlightInfoResult.flights;
  for (i in flights) {
    var timeInSec= flights[i].estimatedarrivaltime;
    date= moment.unix(timeInSec).format("LLLL");
    
    console.log(flights[i].ident +" arrival: "+ date);
  };
});
console.log(restclient.get(fxml_url + 'FlightInfo', {username: username, password: apiKey, query:{ident:'ASA746', howMany: 3}}));



//{ FlightInfoResult: { next_offset: 1, flights: [ [Object] ] } }
//estimatedarrivaltime: 1448411982,
