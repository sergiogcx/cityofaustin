/**
 *	City of Austin (ca) Application Challenge
 *  Copyright (C) 2018- Sergio Garcia <sergiogcx@gmail.com>
 *	This source code cannot be copied or used under any circumstances.
 */


var ca = {

	/**
	  * @debugmode bool - toggles console output
	  * @helper object - general help variable for dialogs
	  * @helper_data object - general help variable for dialogs (for storing data objects)
	  * @api_endpoint string - current API endpoint.
	  * @api_key string - current API key.
	*/

	debugmode: true,
	helper: null,
	herlper_data: null,
	api_endpoint: "https://api.qudrio.com/v1/",
	api_key: "lj5wkwcOpj3cI81NhlaSO9bVfdCLHb9R54ft51aH",

	/**
	 * @desc sets the local data helper object
	 * @param object $json_object - the response object from the api
	 */
	setData: function(json_object) {
		ca.herlper_data = json_object;
	},

	/**
	 * @desc gets the local data helper object
	 * @return object - a copy of the response json data object
	 */

	getData: function() {
		return ca.herlper_data;
	},

	/**
	 * @desc writes into the console log (if debug mode is enabled)
	 * @param string $str - the actual string to be logged
	 */
	debug: function(str) {
		if(ca.debugmode) 
			console.log(str);
	},


	/**
	 * @desc initializes the application by loading the dashboard partial.
	 */
	initialize: function() {
		ca.debug("We here!");
		ca.render("dashboard");
	},

	/**
	 * @desc Renders any partial content into the main content div box. 
	 * @param string $partial - the file name of the partial content (partials folder)
	 * @param string $mode - (optional) the mode to be loaded with (dialog or full mode)
	 */
	render: function(partial, mode) {
		ca.debug("render(): " + partial);

		var container = mode || "main";

		ca.debug("render() we are working with container: " + mode);

		$( "#" + container ).load( "partials/" + partial + ".html", function( response, status, xhr ) {
		  if ( status == "error" ) {
		  	ca.debug("Error loading: " + partial);
		  	ca.debug( xhr.status + " " + xhr.statusText);
		  } else {
		  	if(container === "dialog-content") {
		  		ca.dialogShow();
		  	}
		  }
		});

		ca.menuHide(); // hide if in mobile
	},

 	/**
	 * @desc Gathers data from the API endpoint 
	 * @param string $uri - uri path to be used, ie: 'stops/list'.
	 * @param string $callback - the callback function to be called to process data
	 */
	restGet: function(uri, callback) {
		ca.debug("restGet() ...");

		ca.loaderShow();

		var final_url = ca.api_endpoint + uri;
		ca.debug("restGet() Querying: " + final_url);

		$.ajax({
		    url: final_url,
		    type: "GET",
		    headers:{ "x-api-key": ca.api_key}
		})
		.fail(function( jqXHR, textStatus ) {
		  ca.debug( "restGet() Request failed: " + textStatus );
		})
		.done(function( data ) {
			ca.debug("restGet() success, running callback...");
				callback(data);
		})
		.always(function() {
		    ca.loaderHide();
	  	});
	},


	/**
	 * Dialog Work
	 */

	dialogShow: function() {
		$("#dialog").show();
	},

	dialogHide: function() {
		$("#dialog").hide();
	},

	loaderShow: function() {
		ca.debug("loaderShow() Showing spinner");
		$("#loader").show();
	},

	loaderHide: function() {
		ca.debug("loaderHide() Hiding spinner");
		$("#loader").hide();
	},

	menuHide: function() {
		$("#menu").hide();
	},

	menuShow: function() {
		$("#menu").show();
	},

	menuToggle: function() {
		var menu = $("#menu");

		if(menu.is(':visible')) {
			ca.debug("menuToggle() hiding ...");
			menu.hide();
		} else {
			ca.debug("menuToggle() showing ...");
			menu.show();
		}
	},

	selectMessageShow: function() {
		$("#status-gathering-data").remove();
		$("#status-select-message").show();
	},



	/**
	 * Routes
	 */

	/**
	 * @desc Renders any partial content into the main content div box. 
	 * @param string $partial - the file name of the partial content (partials folder)
	 * @param string $mode - (optional) the mode to be loaded with (dialog or full mode)
	 */

 	/**
	 * @desc initializes the routes page. 
	 */

	routesInitialize: function() {
		ca.debug("routesInitialize() ...");
		$("#results").html("");
		ca.restGet('routes', ca.routesParse);
	},

	/**
	 * @desc Callback function that parses the data response by the API. 
	 * @param object $response - the actual json object as returned from the api
	 */

	routesParse: function(response) {
		ca.debug("routesParse() ...");

		response.data.forEach(function(element) {

		  	var row_template = `
				<tr>
                  <th>${element.route_id}</th>
                  <th><a href='#' onclick='ca.routesItemGet(${element.route_id});'>${element.route_long_name}</a></th>
                  <th>${element.route_type}</th>
                  <th>${element.route_color}</th>
                </tr>
			`;

			$("#results").append(row_template);
		});
	},

	/**
	 * @desc Gets the details for a specific route. 
	 * @param int $route_id - The route id needed to query the api
	 */

	routesItemGet: function(route_id) {
		ca.debug("routesItemGet() ...");
		ca.helper = route_id;
		ca.restGet('routes/' + route_id, ca.routesItemParse);
		
	},

	/**
	 * @desc Loads the specific route item into a hidden dialog div.
	 */

	routeItemLoad: function() {
		ca.debug("routeItemLoad(): loading ...");
		var data = ca.getData().data[0];

		var item_template = `
			<div>
				<p><b>Route ID: </b>${data.route_id}</p>
				<p><b>Route Long Name: </b><span style='color: red; font-weight: bold;'>${data.route_long_name}</span></p>
				<p><b>Route Short Name: </b>${data.route_short_name}</p>
				<p><b>Route Desc: </b>${data.route_desc}</p>
				<p><b>Route URL: </b><a href='${data.route_url}'>${data.route_url}</a></p>              
				<p><b>Route Type: </b>${data.route_type}</p>
				<p><b>Route Color: </b>${data.route_color}</p>
				<p><b>Text Color: </b>${data.route_text_color}</p>
				<p><b>Agency id: </b>${data.agency_id}</p>
            </div>
		`;

		$("#route-desc").append(item_template);
	},	

	/**
	 * @desc Callback function that parses the data response by the API. 
	 * @param object $response - the actual json object as returned from the api
	 */

	routesItemParse: function(response) {
		ca.debug("routesItemParse() we are now working with: ");
		ca.setData(response);
		ca.render('route', "dialog-content");
	},



	/**
	 * Stops
	 */


	/**
	 * @desc gathers a list of sample trips.
	 */

	stopsGetSampleTrips: function() {
		ca.debug("stopsProcessTrips() Getting list of sample trips ...");
		ca.restGet('trips/list', ca.stopsProcessTrips);
	},

	/**
	 * @desc Callback function that parses the data response by the API. 
	 * @param object $response - the actual json object as returned from the api
	 */

	stopsProcessTrips: function(response) {
		ca.debug("stopsProcessTrips() Processing list of sample trips ...");
		response.data.forEach(function(element) {
				$("#stops-sample-trips").append(
		        $('<option></option>').val(element.trip_id).html("(" + element.trip_id + ") " + element.trip_headsign)
		    );
		});
		
		ca.selectMessageShow();
	},
 
	/**
	 * @desc Get list of stops for a trip, If text input field is empty, then use the value in the dropdown.
	 */

	stopsGo: function() {
		var stops_sample_trips = $("#stops-sample-trips").val();
		var stops_trip_id = $("#stops-tripid").val();
		var final_trip_id = stops_trip_id !== "" ? stops_trip_id : stops_sample_trips;
		ca.debug("stopsGo(): final_trip_id: " + final_trip_id);

		$("#results").html("");

		// stops/{trip_id}/{offset}
		ca.restGet("stops/" + final_trip_id + "/0", ca.stopsProcessStops);
	},

	/**
	 * @desc Callback function that parses the data response by the API. 
	 * @param object $response - the actual json object as returned from the api
	 */

	stopsProcessStops: function(response) {
		ca.debug("stopsProcessStops() processing data...");

		response.data.forEach(function(element) {
	  		var row_template = `
				<tr>
		          <th>${element.shape_id}</th>
		          <th>${element.shape_pt_lat}</th>
		          <th>${element.shape_pt_lon}</th>
		          <th>${element.shape_pt_sequence}</th>
		          <th>${element.shape_dist_traveled}</th>
		        </tr>
			`;

			$("#results").append(row_template);
		});
	},

	/**
	 * @desc on document ready handler.
	 */
	stopsInitialize: function() {
		ca.stopsGetSampleTrips();
	},






	/**
	* Trips
	*/

	// Gathers a list of sample trips from route 1
	/**
	 * @desc on document ready handler.
	 */
	tripsGetSampleRoutes: function() {
		ca.debug("tripsProcessRoutes() Getting list of sample routes ...");
		ca.restGet('routes', ca.tripsProcessRoutes);
	},

	/**
	 * @desc Callback function that parses the data response by the API. 
	 * @param object $response - the actual json object as returned from the api
	 */

	tripsProcessRoutes: function(response) {
		ca.debug("tripsProcessRoutes() Processing list of sample routes ...");

		response.data.forEach(function(element) {
			$("#trips-sample-routes").append(
	        	$('<option></option>').val(element.route_id).html("(" + element.route_id + ") " + element.route_long_name)
	    	);
		});

		ca.selectMessageShow();
	},

	/**
	 * @desc gathers a list of trips, If text input field is empty, then use the value in the dropdown. 
	 */
	tripsGo: function() {
		var trips_sample_routes = $("#trips-sample-routes").val();
		var trips_route_id = $("#trips-routeid").val();
		var final_route_id = trips_route_id !== "" ? trips_route_id : trips_sample_routes;
		ca.debug("tripsGo(): final_route_id: " + final_route_id);

		$("#results").html("");

		// trips/{route_id}/{offset}
		ca.restGet("trips/" + final_route_id + "/0", ca.tripsProcesstrips);
	},

	/**
	 * @desc Callback function that parses the data response by the API. 
	 * @param object $response - the actual json object as returned from the api
	 */

	tripsProcesstrips: function(response) {
		ca.debug("tripsProcesstrips() processing data...");

		response.data.forEach(function(element) {
		  	var row_template = `
				<tr>
		          <th>${element.route_id}</th>
		          <th>${element.service_id}</th>
		          <th>${element.trip_id}</th>
		          <th>${element.trip_headsign}</th>
		          <th>${element.direction_id}</th>
		        </tr>
			`;

			$("#results").append(row_template);
		});
	},

	/**
	 * @desc on document ready handler.
	 */
	tripsInitialize: function() {
		ca.tripsGetSampleRoutes();
	},






	/**
	* Location Finder
	*/


	lfGo: function() {
		var latitude = $("#lf-latitude").val();
		var longitude = $("#lf-longitude").val();
		var radius = $("#lf-radius").val();
		var limit = $("#lf-limit").val();
		var offset = $("#lf-offset").val();

		$("#results").html("");

		var final_uri = `routes/find/${latitude}/${longitude}/${radius}/${limit}/${offset}`;
		ca.debug("lfGo() Final URI: " + final_uri);
		
		// routes/find/{latitude}/{longitude}/{radius}/{limit}/{offset}
		ca.restGet(final_uri, ca.lfProcesstrips);
	},

	/**
	 * @desc Callback function that parses the data response by the API. 
	 * @param object $response - the actual json object as returned from the api
	 */

	lfProcesstrips: function(response) {
		ca.debug("tripsProcesstrips() processing data...");

		response.data.forEach(function(element) {
		  	var row_template = `
				<tr>
		          <th>${element.route_id}</th>
		          <th>${element.route_short_name}</th>
		          <th>${element.stop_id}</th>
		          <th>${element.stop_desc}</th>
		          <th>${element.stop_lat}</th>
		          <th>${element.stop_lon}</th>
		          <th>${element.distance}</th>
		        </tr>
			`;

			$("#results").append(row_template);
		});
	},



	/**
	* Next Five Trips
	*/

	// Gathers a list of sample nf from route 1
	nfGetSamplestops: function() {
		ca.debug("nfGetSamplestops() Getting list of sample stops ...");
		ca.restGet('stops/list', ca.nfProcessStops);
	},

	/**
	 * @desc Callback function that parses the data response by the API. 
	 * @param object $response - the actual json object as returned from the api
	 */

	nfProcessStops: function(response) {
		ca.debug("nfProcessstops() Processing list of sample stops ...");

		response.data.forEach(function(element) {
			$("#nf-sample-stops").append(
		        $('<option></option>').val(element.stop_id).html("(" + element.stop_id + ") " + element.stop_name)
		    );
		});

		ca.selectMessageShow();
	},

	/**
	 * @desc gathers a list of next five trips, If text input field is empty, then use the value in the dropdown. 
	 */
	nfGo: function() {
		var nf_sample_stops = $("#nf-sample-stops").val();
		var nf_stop_id = $("#nf-stopid").val();
		var final_stop_id = nf_stop_id !== "" ? nf_stop_id : nf_sample_stops;
		var time = $("#nf-time").val();

		ca.debug("nfGo(): final_route_id: " + final_stop_id);

		ca.selectMessageShow();
		$("#results").html("");

		// routes/nextfive/{stop_id}/{time}
		var final_uri = `routes/nextfive/${final_stop_id}/${time}`;
		ca.debug("nfGo(): final_uri: " + final_uri);
		ca.restGet(final_uri, ca.nfProcessnf);
	},

	/**
	 * @desc Callback function that parses the data response by the API. 
	 * @param object $response - the actual json object as returned from the api
	 */

	nfProcessnf: function(response) {
		ca.debug("nfProcessnf() processing data...");

		response.data.forEach(function(element) {
	  		var row_template = `
				<tr>
				  <th>${element.trip_id}</th>
		          <th>${element.arrival_time}</th>
		          <th>${element.departure_time}</th>
		          <th>${element.drop_off_type}</th>
		          <th>${element.pickup_type}</th>
		          <th>${element.shape_dist_traveled}</th>
		          <th>${element.stop_headsign}</th>
		          <th>${element.stop_id}</th>
		          <th>${element.stop_sequence}</th>
		          <th>${element.timepoint}</th>
		        </tr>
			`;

			$("#results").append(row_template);
		});
	},

	/**
	 * @desc on document ready handler.
	 */
	nfInitialize: function() {
		ca.nfGetSamplestops();
	}
};




/**
 * Whenever the document is ready, initialize the application script.
 */

$(document).ready(function() {
	ca.initialize();
	feather.replace();
	ca.menuHide(); // hide if in mobile
});

/**
 * Menu button handler
 */

$("#menutoggle").click(function() {
	ca.menuToggle();
});

/**
 * Navigation click styling
 */

$(".nav-link").click(function() {

		$(".nav-link.active").removeClass("active");

		$(this).addClass("active");
});