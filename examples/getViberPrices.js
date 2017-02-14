/**
 * Bulk Viber Solutions
 * nodeJS library
 *
 * example of getViberPrices call
 *
 * @author Anton Zelenski zelibobla@gmail.com
 * @copyright BSG HONG KONG LIMITED
 */
"use strict";
var bsg = require( 'bsg-nodejs' )( '<YOUR_ACCESS_KEY>' );

bsg.getViberPrices().then(
	prices => console.log( "Viber prices retrieved:", prices ),
	error => console.log( "Viber prices retrieval failed:", error )
);