 
CREATE TABLE public.routes (
	route_id int4 NOT NULL,
	agency_id int4,
	route_short_name int4,
	route_long_name varchar(64),
	route_desc text,
	route_type int4,
	route_url text,
	route_color varchar(6),
	route_text_color varchar(6),
	PRIMARY KEY (route_id)
);

-- PRIMARY KEY
CREATE UNIQUE INDEX routes_pkey ON routes USING btree (route_id); 

CREATE TABLE public.shapes (
	shape_id int4 NOT NULL,
	shape_pt_lat numeric(10,6) NOT NULL,
	shape_pt_lon numeric(10,6) NOT NULL,
	shape_pt_sequence int4 NOT NULL,
	shape_dist_traveled numeric(10,6) NOT NULL
);

-- Shape ID needs indexing, not a PK.
CREATE INDEX idx_shapes_shape_id ON shapes USING btree (shape_id)


CREATE TABLE public.stop_times (
	trip_id int4,
	arrival_time time,
	departure_time time,
	stop_id int4,
	stop_sequence int4,
	stop_headsign varchar(32),
	pickup_type int4,
	drop_off_type int4,
	shape_dist_traveled numeric(10,6),
	timepoint int4
);

-- Stop ID and Trip ID need inexing
CREATE INDEX idx_stop_times_stop_id ON stop_times USING btree (stop_id);
CREATE INDEX idx_stop_times_trip_id ON stop_times USING btree (trip_id);

CREATE TABLE public.stops (
	stop_id int4 NOT NULL,
	stop_code int4 NOT NULL,
	stop_name varchar(64) NOT NULL,
	stop_desc varchar(64) NOT NULL,
	stop_lat numeric(10,6) NOT NULL,
	stop_lon numeric(10,6) NOT NULL,
	zone_id varchar(32),
	stop_url varchar(128) NOT NULL,
	location_type varchar(32),
	parent_station varchar(32),
	stop_timezone varchar(32),
	wheelchair_boarding int4 NOT NULL,
	corner_placement varchar(16) NOT NULL,
	stop_position varchar(16) NOT NULL,
	on_street varchar(32) NOT NULL,
	at_street varchar(32) NOT NULL,
	heading int4 NOT NULL
);

-- Stop ID, code and heading for quick search.
-- Latitude and Longitude for better calculation performance.

CREATE INDEX idx_stops_stop_id ON stops USING btree (stop_id);
CREATE INDEX idx_stops_stop_code ON stops USING btree (stop_code);
CREATE INDEX idx_stops_heading ON stops USING btree (heading);
CREATE INDEX idx_stops_stop_lat ON stops USING btree (stop_lat);
CREATE INDEX idx_stops_stop_lon ON stops USING btree (stop_lon);

CREATE TABLE public.trips (
	route_id int4 NOT NULL,
	service_id varchar(32) NOT NULL,
	trip_id int4 NOT NULL,
	trip_headsign varchar(64) NOT NULL,
	trip_short_name varchar(64),
	direction_id int4 NOT NULL,
	block_id int4 NOT NULL,
	shape_id int4 NOT NULL,
	wheelchair_accessible int4 NOT NULL,
	bikes_allowed int4 NOT NULL,
	dir_abbr varchar(16) NOT NULL
);

-- Direction, Route, Service and Trip ID all need indexing.
CREATE INDEX idx_trips_direction_id ON trips USING btree (direction_id);
CREATE INDEX idx_trips_route_id ON trips USING btree (route_id);
CREATE INDEX idx_trips_service_id ON trips USING btree (service_id);
CREATE INDEX idx_trips_trip_id ON trips USING btree (trip_id);
