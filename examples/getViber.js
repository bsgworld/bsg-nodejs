/**
 * Bulk Viber Solutions
 * nodeJS library
 *
 * example of getViber call
 *
 * @author Anton Zelenski zelibobla@gmail.com
 * @copyright BSG HONG KONG LIMITED
 */
"use strict";
var bsg = require( 'bsg-nodejs' )( '<YOUR_ACCESS_KEY>' );

bsg.getViber(
	{
		reference: 'ext_id_19'
	}
).then(
	viber => console.log( "Viber retrieved:", viber ),
	error => console.log( "Viber retrieval failed:", error )
);