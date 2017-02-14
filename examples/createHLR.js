/**
 * Bulk SMS Solutions
 * nodeJS library
 *
 * example of createHLR call
 *
 * @author Anton Zelenski zelibobla@gmail.com
 * @copyright BSG HONG KONG LIMITED
 */
"use strict";
var bsg = require( 'bsg-nodejs' )( '<YOUR_ACCESS_KEY>' );

bsg.createHLR(
	{
		msisdn: '380972920000',
		reference: 'extid1',
		tariff: '0',
		callback_url: 'http://someurl.com/callback/?id=12345'
	}
).then(
	HLR => console.log( "HLR created:", HLR ),
	error => console.log( "HLR creation failed:", error )
);