console.log('Loading function');

exports.handler = function(event, context) {
	var restclient = require('restler');
	console.log('restler require');
	var moment = require('moment');
	console.log(moment().format('LLLL'));

	var fxml_url = 'http://flightxml.flightaware.com/json/FlightXML2/';
	var username = 'memodoring';
	var apiKey = 'b64770ae6b5c6a2f0aef95bcff641649a77cf997';

				restclient.get(fxml_url + 'FlightInfo', {
					username: username, 
					password: apiKey, 
					query:{ident:'ASA746', howMany: 3}})
				.on('success', 
					function(result,response){
						var flights = result.FlightInfoResult.flights;
						for (i in flights) {
							var timeInSec= flights[i].estimatedarrivaltime;
							date= moment.unix(timeInSec).format("LLLL");
							console.log(flights[i].ident +" arrival: "+ date);
						}
					});
	console.log(restclient.get(fxml_url + 'FlightInfo', {username: username, password: apiKey, query:{ident:'ASA746', howMany: 3}}));


    //context.succeed("Exito !!!");  // Echo back the first key value
};