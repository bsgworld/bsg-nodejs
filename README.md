BSG API for Node.js
================================

This repository contains the open source Node.js client for BSG API.


Requirements
------------

- [Sign up](https://bsg.world) for a free account
- Get `access_key`


Installation
------------

`npm install bsg-nodejs`


Usage
-----


```javascript
var bsg = require( 'bsg' )( '<YOUR_ACCESS_KEY>' );

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
```

```javascript
var bsg = require( 'bsg' )( '<YOUR_ACCESS_KEY>' );

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
```

```javascript
var bsg = require( 'bsg' )( '<YOUR_ACCESS_KEY>' );

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
```

```javascript
var bsg = require( 'bsg' )( '<YOUR_ACCESS_KEY>' );

bsg.getBalance().then(
	balance => console.log( "Balance request completed:", balance ),
	error => console.log( "Balance request failed", error )
);
```

```javascript
var bsg = require( 'bsg' )( '<YOUR_ACCESS_KEY>' );

bsg.getHLR(
	{
		reference: 'extid1'
	}
).then(
	HLR => console.log( "HLR retrieved:", HLR ),
	error => console.log( "HLR retrieval failed:", error )
);
```

```javascript
var bsg = require( 'bsg' )( '<YOUR_ACCESS_KEY>' );

bsg.getHLRPrices().then(
	prices => console.log( "HLR prices retrieved:", prices ),
	error => console.log( "HLR prices retrieval failed:", error )
);
```

```javascript
var bsg = require( 'bsg' )( '<YOUR_ACCESS_KEY>' );

bsg.getSMS(
	{
		reference: 'ext_id_16'
	}
).then(
	SMS => console.log( "SMS retrieved:", SMS ),
	error => console.log( "SMS retrieval failed:", error )
);
```

```javascript
var bsg = require( 'bsg' )( '<YOUR_ACCESS_KEY>' );

bsg.getSMSPrices().then(
	prices => console.log( "SMS prices retrieved:", prices ),
	error => console.log( "SMS prices retrieval failed:", error )
);
```

```javascript
var bsg = require( 'bsg' )( '<YOUR_ACCESS_KEY>' );

bsg.getViber(
	{
		reference: 'ext_id_19'
	}
).then(
	viber => console.log( "Viber retrieved:", viber ),
	error => console.log( "Viber retrieval failed:", error )
);
```

```javascript
var bsg = require( 'bsg' )( '<YOUR_ACCESS_KEY>' );

bsg.getViberPrices().then(
	prices => console.log( "Viber prices retrieved:", prices ),
	error => console.log( "Viber prices retrieval failed:", error )
);
```

Take a look into 'examples' folder for complete list of available calls