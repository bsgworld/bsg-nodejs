/**
 * Bulk SMS Solutions
 * nodeJS library
 *
 * example of getSMS call
 *
 * @author Anton Zelenski zelibobla@gmail.com
 * @copyright BSG HONG KONG LIMITED
 */
"use strict";
var bsg = require( 'bsg-nodejs' )( '<YOUR_ACCESS_KEY>' );

bsg.getSMS(
	{
		reference: 'ext_id_16'
	}
).then(
	SMS => console.log( "SMS retrieved:", SMS ),
	error => console.log( "SMS retrieval failed:", error )
);