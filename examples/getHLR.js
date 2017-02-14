/**
 * Bulk SMS Solutions
 * nodeJS library
 *
 * example of getHLR call
 *
 * @author Anton Zelenski zelibobla@gmail.com
 * @copyright BSG HONG KONG LIMITED
 */
"use strict";
var bsg = require( 'bsg-nodejs' )( '<YOUR_ACCESS_KEY>' );

bsg.getHLR(
	{
		reference: 'extid1'
	}
).then(
	HLR => console.log( "HLR retrieved:", HLR ),
	error => console.log( "HLR retrieval failed:", error )
);