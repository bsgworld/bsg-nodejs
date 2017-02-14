/**
 * Bulk SMS Solutions
 * nodeJS library
 *
 * example of getBalance call
 *
 * @author Anton Zelenski zelibobla@gmail.com
 * @copyright BSG HONG KONG LIMITED
 */
"use strict";
var bsg = require( 'bsg-nodejs' )( '<YOUR_ACCESS_KEY>' );

bsg.getBalance().then(
	balance => console.log( "Balance request completed:", balance ),
	error => console.log( "Balance request failed", error )
);