/*
 *    API Lambda Function for exercise City of Austin
 *    Copyright (C) 2018 - Sergio Garcia <sergiogcx@gmail.com>
 *    Use or reproduction of this code is forbidden under any circumstances.
 */

'use strict';

/*
 *  @desc This is a lambda function for the 'routes' path.
 *  @return object - returns a json document with a list of all available routes.
 *  @path /routes
 */ 

module.exports.routes = (event, context, callback) => {

  var hlp = require("./helper.js");

  var db = hlp.pool();

  db.query('SELECT * FROM routes', (err, res) => {

    var response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        status: err ? "error" : "success",
        data: res ? res.rows : err.stack
      }),
    };

    db.end();

    return callback(null, response);
  });
};

/*
 *  @desc This is a lambda function for the 'routes/{item_id}' path.
 *  @return object - returns a json document with the details of a specific route.
 *  @path /routes/{item_id}
 */ 

module.exports.routes_item = (event, context, callback) => {

  var hlp = require("./helper.js");
  
  var route_id = 0;
  
  if(event.hasOwnProperty("pathParameters")) {
    if(event.pathParameters.hasOwnProperty("route_id")) {
      route_id = hlp.safenum(event.pathParameters.route_id);
    }  
  }

  var db = hlp.pool();

  db.query({ text: 'SELECT * FROM routes WHERE route_id = $1', values: [route_id] }, (err, res) => {

    var response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        status: err ? "error" : "success",
        data: res ? res.rows : err.stack
      }),
    };

    db.end();

    return callback(null, response);
  });
};

/*
 *  @desc This is a lambda function for the 'trips/{route_id}/{offset}' path.
 *  @return object - returns a json document with a list of trips determined by a specific route_id.
 *  @path /trips/{route_id}/{offset}
 */ 

module.exports.trips = (event, context, callback) => {

  var hlp = require("./helper.js");
  var route_id = 0;
  var offset = 0;
  
  // First make sure we have a path parameter ...
  if(event.hasOwnProperty("pathParameters")) { 
    if(event.pathParameters.hasOwnProperty("route_id")) {
      route_id = hlp.safenum(event.pathParameters.route_id);
    }  

    if(event.pathParameters.hasOwnProperty("offset")) {
      offset = hlp.safenum(event.pathParameters.offset);
    }  
  }


  var db = hlp.pool();

  db.query({ text: 'SELECT * FROM trips WHERE route_id = $1 LIMIT 40 OFFSET $2', values: [route_id, offset] }, (err, res) => {

    var response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        status: err ? "error" : "success",
        data: res ? res.rows : err.stack
      }),
    };

    db.end();

    return callback(null, response);
  });
};


/*
 *  @desc This is a lambda function for the 'trips/list' path.
 *  @return object - returns a json document with sample list of distinct trips for sampling.
 *  @path /trips/list
 */ 


module.exports.trips_list = (event, context, callback) => {

  var hlp = require("./helper.js");

  var db = hlp.pool();

  db.query('SELECT DISTINCT t.trip_id, t.trip_headsign FROM trips AS t LIMIT 40', (err, res) => {

    var response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        status: err ? "error" : "success",
        data: res ? res.rows : err.stack
      }),
    };

    db.end();

    return callback(null, response);
  });
};

/*
 *  @desc This is a lambda function for the 'stops/{trip_id}/{offset}' path.
 *  @return object - returns a json document with a list of stops determined by the trip_id.
 *  @path /stops/{trip_id}/{offset}
 */

module.exports.stops = (event, context, callback) => {

  var hlp = require("./helper.js");
  var trip_id = 0;
  var offset = 0;
  
  //
  // First make sure we have a path parameter ...
  //

  if(event.hasOwnProperty("pathParameters")) { 
    if(event.pathParameters.hasOwnProperty("trip_id")) {
      trip_id = hlp.safenum(event.pathParameters.trip_id);
    }  

    if(event.pathParameters.hasOwnProperty("offset")) {
      offset = hlp.safenum(event.pathParameters.offset);
    }  
  }


  var db = hlp.pool();

  db.query({ text: 'SELECT s.* FROM shapes AS s LEFT JOIN trips AS t ON t.shape_id = s.shape_id WHERE t.trip_id = $1 LIMIT 40 OFFSET $2', 
    values: [trip_id, offset] }, (err, res) => {

    var response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        status: err ? "error" : "success",
        data: res ? res.rows : err.stack
      }),
    };

    db.end();

    return callback(null, response);
  });
};

/*
 *  @desc This is a lambda function for the 'stops/list' path.
 *  @return object - returns a json document with a list of distinct stops for sampling.
 *  @path /stops/list
 */

module.exports.stops_list = (event, context, callback) => {

  var hlp = require("./helper.js");

  var db = hlp.pool();

  db.query('SELECT DISTINCT s.* FROM stops AS s LIMIT 40', (err, res) => {

    var response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        status: err ? "error" : "success",
        data: res ? res.rows : err.stack
      }),
    };

    db.end();

    return callback(null, response);
  });
}


/**
 * EXTRA CREDIT
 */

/*
 *  @desc This is a lambda function for the 'routes/find' path.
 *  @return object - returns a json document with a list of routes determined by two coordinates and a radius.
 *  @path /routes/find/{latitude}/{longitude}/{radius}/{limit}/{offset}
 */

module.exports.routes_location = (event, context, callback) => {

  var hlp = require("./helper.js");

  var latitude  = 30.3259534,
      longitude = -97.7149763,
      radius = 3,
      limit = 40,
      offset = 0;

  
  // First make sure we have a path parameter ...
  if(event.hasOwnProperty("pathParameters")) { 
    if(event.pathParameters.hasOwnProperty("latitude")) {
      latitude = hlp.safenum(event.pathParameters.latitude);
    }  

    if(event.pathParameters.hasOwnProperty("longitude")) {
      longitude = hlp.safenum(event.pathParameters.longitude);
    }

    if(event.pathParameters.hasOwnProperty("radius")) {
      radius = hlp.safenum(event.pathParameters.radius);
    }

    if(event.pathParameters.hasOwnProperty("limit")) {
      limit = hlp.safenum(event.pathParameters.limit);
    }

    if(event.pathParameters.hasOwnProperty("offset")) {
      offset = hlp.safenum(event.pathParameters.offset);
    }  
  }

  var db = hlp.pool();

  // 
  // Using variable interpolation for now, this is because the PG node library has issues when parsing decimals:
  // "error: failed to find conversion function from unknown to double precision"
  //

  var query = `
          -- SELECT DISTINCT ROUTES ONLY
          SELECT DISTINCT r.route_id, r.route_short_name, st.stop_id, st.stop_desc, st.stop_lat, st.stop_lon, st.distance FROM (

            -- SELECT STOPS BY COORDINATES & CALCULATE DISTANCE
            SELECT s.*, ( p.distance_unit  * DEGREES(ACOS(COS(RADIANS(p.latpoint))
                           * COS(RADIANS(s.stop_lat))
                           * COS(RADIANS(p.longpoint - s.stop_lon))
                           + SIN(RADIANS(p.latpoint))
                           * SIN(RADIANS(s.stop_lat)))) )::numeric(4,2) AS distance FROM stops AS s

            -- NATURAL-JOIN STATIC CALCULATION VALUES
            JOIN ( SELECT ${latitude} AS latpoint, ${longitude} AS longpoint, 50.0 AS radius, 69.0 AS distance_unit ) AS p ON 1=1

            -- IMPROVES QUERY PERFORMANCE BY PROVIDING A FRAME OF CALCULATED VALUES
            WHERE s.stop_lat
                BETWEEN p.latpoint  - (p.radius / p.distance_unit)
                   AND p.latpoint  + (p.radius / p.distance_unit)
              AND s.stop_lon
               BETWEEN p.longpoint - (p.radius / (p.distance_unit * COS(RADIANS(p.latpoint))))
                   AND p.longpoint + (p.radius / (p.distance_unit * COS(RADIANS(p.latpoint))))
                   
          ) AS st -- NESTED QUERY END

          -- LEFT-JOIN RELATION TO ROUTE TABLE
          LEFT JOIN stop_times AS stt ON stt.stop_id = st.stop_id
          LEFT JOIN trips AS tr ON tr.trip_id = stt.trip_id
          LEFT JOIN routes AS r on r.route_id = tr.route_id

          -- DETERMINE DISTANCE RADIUS AND SORT
          WHERE st.distance < ${radius}
          ORDER BY st.distance ASC
          LIMIT ${limit} OFFSET ${offset}
        `;

  // 
  // Ready to perform query and return results
  //
  db.query(query, (err, res) => {

    var response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        status: err ? "error" : "success",
        data: res ? res.rows : err.stack
      }),
    };

    db.end();

    return callback(null, response);
  });
};




/*
 *  @desc This is a lambda function for the 'routes/nextfive' path.
 *  @return object - returns a json document with a list of the next five trips for a specific stop and time.
 *  @path /routes/nextfive/{stop_id}/{time}
 */

module.exports.routes_nextfive = (event, context, callback) => {

  var hlp = require("./helper.js");

  var stop_id = 5432,
      time = '17:00:00';
  
  if(event.hasOwnProperty("pathParameters")) { 
    if(event.pathParameters.hasOwnProperty("stop_id")) {
      stop_id = hlp.safenum(event.pathParameters.stop_id);
    }  

    if(event.pathParameters.hasOwnProperty("time")) {
      time = event.pathParameters.time; // no need of filtering at this point
    }  
  }

  time = hlp.safetime(time) ? time : hlp.getCurrentTime();


  var db = hlp.pool();

  var query = `
      -- List the next five trips arriving at a particular stop.
      -- Specify the stop_id and time. You can fetch this data
      -- by querying stops.txt, stop_times.txt, and trips.txt

      SELECT stt.* FROM trips AS t
        LEFT JOIN stop_times AS stt ON stt.trip_id = t.trip_id
        LEFT JOIN stops AS s ON s.stop_id = stt.stop_id

      -- Criteria
      WHERE s.stop_id = $1
       AND stt.arrival_time >= $2
      
      -- Let's be sure we are sorting the list, we only need 5
      ORDER BY stt.arrival_time ASC
      LIMIT 5
  `;

  db.query({ text: query, values: [stop_id, time] }, (err, res) => {

    var response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        status: err ? "error" : "success",
        data: res ? res.rows : err.stack
      }),
    };

    db.end();

    return callback(null, response);
  });
};
