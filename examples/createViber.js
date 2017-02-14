/**
 * Bulk Viber Solutions
 * nodeJS library
 *
 * example of createViber call
 *
 * @author Anton Zelenski zelibobla@gmail.com
 * @copyright BSG HONG KONG LIMITED
 */
"use strict";
var bsg = require( 'bsg-nodejs' )( '<YOUR_ACCESS_KEY>' );

bsg.createViber(
	{
		tariff:0,
		validity:1,
		messages:[
			{
				to:[
					{
						msisdn:380972920000,
						reference:"ext_id_19"
					}
				],
				text:"My Viber messages is shinier than your SMS messages",
				alpha_name:"BSG",
				is_promotional:false,
				options:{
					viber:{
						img:"http://mysite.com/logo.png",
						caption:"See Details",
						action:"http://mysite.com/"
					}
				}
			}
		]
	}
).then(
	viber => console.log( "Viber created:", viber ),
	error => console.log( "Viber creation failed:", error )
);