/**
 * Bulk SMS Solutions
 * nodeJS library
 *
 * example of createSMS call
 *
 * @author Anton Zelenski zelibobla@gmail.com
 * @copyright BSG HONG KONG LIMITED
 */
"use strict";
var bsg = require( 'bsg-nodejs' )( '<YOUR_ACCESS_KEY>' );

bsg.createSMS(
	{
		destination: "phone",
		originator:"alpha name",
		body:"message text",
		msisdn:"380972000000",
		reference:"ext_id_16",
		validity:"1",
		tariff:"0"
	}
).then(
	SMS => console.log( "SMS created:", SMS ),
	error => console.log( "SMS creation failed:", error )
);