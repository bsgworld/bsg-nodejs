/**
 * Bulk SMS Solutions
 * nodeJS library
 *
 * example of getHLRPrices call
 *
 * @author Anton Zelenski zelibobla@gmail.com
 * @copyright BSG HONG KONG LIMITED
 */
"use strict";
var bsg = require( 'bsg-nodejs' )( '<YOUR_ACCESS_KEY>' );

bsg.getHLRPrices().then(
	prices => console.log( "HLR prices retrieved:", prices ),
	error => console.log( "HLR prices retrieval failed:", error )
);