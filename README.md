# City of Austin 
#### Development Exercise by Sergio Garcia <<sergiogcx@gmail.com>>
#### Live Site: [https://www.qudrio.com/cityofaustin](https://www.qudrio.com/cityofaustin)


## Description

This application implements the back-end exercise of the City of Austin Dev Challenge [https://github.com/cityofaustin/coa-dev-challenges](https://github.com/cityofaustin/coa-dev-challenges); however, it also implements a small front end agnostic exercise using html and javascript/jquery only to demonstrate the backend api.


## Back-end

The back-end was implemented using the Serverless framework (https://serverless.com) and Node.js on an AWS infrastructure using api gateway, lambda and a postrgesql rds. I've configured a domain from a previous exercise and associated it for this project.



##### AWS 
- API Gateway
- Lambda Function (Node.js 8.10)
- Node.js 8.10
- PostgreSQL 9.6 RDS

##### API Endpoint: [https://api.qudrio.com/v1/](https://api.qudrio.com/v1/)

##### Example Call with CURL:

```
**API KEY: lj5wkwcOpj3cI81NhlaSO9bVfdCLHb9R54ft51aH**

Command:
$ curl -k -H 'X-Api-Key: lj5wkwcOpj3cI81NhlaSO9bVfdCLHb9R54ft51aH' 'https://api.qudrio.com/v1/trips/20/0'

Output: 
{"status":"success","data":[{"route_id":20,"service_id":"121-1","trip_id":2038169,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588312,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038201,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588310,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038168,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588308,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038167,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588307,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038166,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588317,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038165,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588316,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038164,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588315,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038163,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588314,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038162,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588313,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038161,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588312,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038160,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588311,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038159,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588310,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038158,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588309,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038157,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588308,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038156,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588307,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038200,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588317,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038199,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588316,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038198,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588315,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038197,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588314,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038196,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588313,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038195,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588312,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038194,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588311,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038193,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588310,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038192,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588309,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038191,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588308,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038190,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588307,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038189,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588317,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038188,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588316,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038187,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588315,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038186,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588314,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038185,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588313,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038184,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588312,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038183,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588311,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038182,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588310,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038181,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588309,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038180,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588318,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038179,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588308,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038178,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588307,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038177,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588317,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"},{"route_id":20,"service_id":"121-1","trip_id":2038176,"trip_headsign":"20-Manor Rd/Riverside-NB","trip_short_name":null,"direction_id":0,"block_id":588316,"shape_id":39925,"wheelchair_accessible":1,"bikes_allowed":1,"dir_abbr":"N"}]}  
```

##### API Functions (api keys required):

- **Routes** This implements the functionality of the first challenge "List the available routes. You can fetch this data by querying routes.txt." 
	- URI:
		-  [https://api.qudrio.com/v1/routes](https://api.qudrio.com/v1/routes)
	- Use Example:
		-  [https://api.qudrio.com/v1/routes](https://api.qudrio.com/v1/routes) (api key required)
    - Use Example:
    ```
    $ curl -k -H 'X-Api-Key: lj5wkwcOpj3cI81NhlaSO9bVfdCLHb9R54ft51aH' 'https://api.qudrio.com/v1/routes'
    
    No additional parameters needed.
	```
- **Trips** This implements the functionality of the first challenge "List the available routes. You can fetch this data by querying routes.txt." 
	- URI:
		-  [https://api.qudrio.com/v1/trips/{route_id}/{offset}](https://api.qudrio.com/trips)
	- Use Example:
    ```
    $ curl -k -H 'X-Api-Key: lj5wkwcOpj3cI81NhlaSO9bVfdCLHb9R54ft51aH' 'https://api.qudrio.com/v1/trips/20/0'
   
   Where route id is 20, and offset is 0 (api key required).
   The offset is directly the SQL query offset based on the imposed limit of 40 (ie SELECT ... LIMIT 40 OFFSET 0)
    ```

- **Stops** This implements the functionality of the first challenge "List the stops for a specified trip. You can fetch this data by querying trips.txt and shapes.txt" 
	- URI:
		-  [https://api.qudrio.com/v1/stops/{trip_id}/{offset}](https://api.qudrio.com/v1/stops)
	- Use Example:
    ```
    $ curl -k -H 'X-Api-Key: lj5wkwcOpj3cI81NhlaSO9bVfdCLHb9R54ft51aH' 'https://api.qudrio.com/v1/stops/2040422/0'
   
   Where trip_id is 2040422, and offset is 0 (api key required).
   The offset is directly the SQL query offset based on the imposed limit of 40 (ie SELECT ... LIMIT 40 OFFSET 0)
    ```

##### **EXTRA CREDIT**

- **Route Find** This implements the functionality of the first challenge "List the routes that stop near a location. Specify the location using latitude and longitude. You can fetch this data by querying stops.txt, stop_times.txt, and trips.txt" 
	- URI:
		-  [https://api.qudrio.com/v1/routes/find/{latitude}/{longitude}/{radius}/{limit}/{offset}](https://api.qudrio.com/v1/routes/find)
    - Use Example:
    ```
    $ curl -k -H 'X-Api-Key: lj5wkwcOpj3cI81NhlaSO9bVfdCLHb9R54ft51aH' 'https://api.qudrio.com/v1/routes/find/30.4396211/-97.7337974/3/20/20'
   
   Where the coordinates are /30.4396211/-97.7337974
   The radius is 3 miles
   Limit results to 20 entries, offset by 20 records
   
   The offset is directly the SQL query offset based on the imposed limit of 20 (ie SELECT ... LIMIT 20 OFFSET 0)
    ```
- **Next Five Trips** This implements the functionality of the first challenge "List the next five trips arriving at a particular stop. Specify the stop_id and time. You can fetch this data by querying stops.txt, stop_times.txt, and trips.txt" 
	- URI:
		-  [https://api.qudrio.com/v1/routes/nextfive/{stop_id}/{time}](https://api.qudrio.com/v1/routes/nextfive)
    - Use Example:
    ```
    $ curl -k -H 'X-Api-Key: lj5wkwcOpj3cI81NhlaSO9bVfdCLHb9R54ft51aH' 'https://api.qudrio.com/v1/routes/nextfive/485/17:00:00'
   
   Where stop id is 485 (Guadalupe and 5th), and time is 5pm (17:00:00) (api key required).
    ```

## Front-end
The front end was developed *only to demonstrate the API at work and had no need to protect the API keys*. It has been implemented using **HTML, JavaScript, jQuery, and Bootstrap:**

**URL: [https://www.qudrio.com/cityofaustin](https://www.qudrio.com/cityofaustin)**
- **API Calls can take time to load**. The API gateway is behind AWS CloudFront for caching, but it can take time for other queries to load, especially if the API has not been warmed-up. The RDS instance is the smallest possible, and it can take up to 30 seconds for an API call to be processed.
- **Be sure to enable developer tools in your browser.** It is recommended that you enable the developer tools in your browser to see the console output where the API calls are being made.