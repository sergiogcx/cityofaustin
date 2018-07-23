/*
 *    API Lambda Function for exercise City of Austin
 *    Copyright (C) 2018 - Sergio Garcia <sergiogcx@gmail.com>
 *    Use or reproduction of this code is forbidden under any circumstances.
 *
 * 	  Helper functions, this file has been created to help with a couple of things:
 *
 *	   1. Provide modular access across functions
 *     2. Improve centralization and quality
 *     3. Serve as a layer between the functions and the database
 *     4. General help with smaller functions that will be re-used.
 */

'use strict';

/*
 *	First we load the necessary libraries and allocate objects.
 */

const crypto = require('crypto');
const aws = require('aws-sdk');
const { Pool, Client } = require('pg'); // Database


/**
 * @desc Returns a sha256 hash for a string. 
 * @param string $pwd - the string to be digested
 * @return string - the hash digestion of the string in lowercase hexadecimal.
 */
exports.hash_password = function(pwd) {
	return crypto.createHash('sha256').update(pwd == null ? "" : pwd).digest('hex');
}

/**
 * @desc Returns a true if an object contains an attribute by name (key). 
 * @param object $object - the object to be checked
 * @param string $key - the object to be checked
 * @return bool - true if the object contains the key
 */

exports.checkprop = function(object, key) {
	return object ? hasOwnProperty.call(object, key) : false;
}
 
/**
 * @desc Returns a true if an object is defined and initialized. 
 * @param object $value - the object to be checked
 * @return bool - true if the object has value
 */
exports.isset = function(value) {
	return typeof value !== 'undefined';
}

/**
 * @desc Returns the value of an environmental variable. 
 * @param string $key - the name of the variable
 * @return string - the variable content
 */

exports.getEnvVar = function(key) {
	if(process.env.hasOwnProperty(key)) {
		return process.env[key];
	}

	return "";
}

/**
 * @desc Returns a safe string to be used in a SQL query (to prevent SQL injections). 
 * @param string $str - the input string containing number
 * @return string - a safe numeric string
 */

exports.safenum = function(str) {
	return str.replace(/[^\d.-]/g, '');
}

/**
 * @desc Checks if a string contains a valid time format (hh:mm:ss) to help avoid SQL injections. 
 * @param string $str - the input string containing a time
 * @return bool - returns true of the format is valid.
 */

exports.safetime = function(str) {
	var regex = new RegExp("(([0-9]){1,2}):(([0-9]){1,2}):(([0-9]){1,2})");
	return regex.test(str);
}

/**
 * @desc Gets the current time in hh:mm:ss format.
 * @return string - the current time in hh:mm:ss format.
 */

exports.getCurrentTime = function() {
	var time = new Date();
	return (
	    ("0" + time.getHours()).slice(-2)   + ":" + 
	    ("0" + time.getMinutes()).slice(-2) + ":" + 
	    ("0" + time.getSeconds()).slice(-2)
    );
}

/**
 * @desc Constructs a pool object and establishes a connection to the database.
 * @return Pool - the object containing the db connection.
 */

exports.pool = function() {
	return new Pool({
		host: module.exports.getEnvVar("CITYOFAUSTIN_DB_ENDPOINT"), 
		port: module.exports.getEnvVar("CITYOFAUSTIN_DB_PORT"),
		database: module.exports.getEnvVar("CITYOFAUSTIN_DB_NAME"),
		user: module.exports.getEnvVar("CITYOFAUSTIN_DB_USER"),
		password: module.exports.getEnvVar("CITYOFAUSTIN_DB_PASS")
	}); 
}
