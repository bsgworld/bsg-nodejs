/**
 * Bulk SMS Solutions
 * nodeJS library
 *
 * example of getSMSPrices call
 *
 * @author Anton Zelenski zelibobla@gmail.com
 * @copyright BSG HONG KONG LIMITED
 */
"use strict";
var bsg = require( 'bsg-nodejs' )( '<YOUR_ACCESS_KEY>' );

bsg.getSMSPrices().then(
	prices => console.log( "SMS prices retrieved:", prices ),
	error => console.log( "SMS prices retrieval failed:", error )
);