/**
 * Bulk SMS Solutions
 * nodeJS library
 *
 * current file is mocha.js test
 *
 * @author Anton Zelenski zelibobla@gmail.com
 * @copyright BSG HONG KONG LIMITED
 */
"use strict";
var bsg = require( '../lib/bsg.js' )( '<YOUR_ACCESS_KEY>' );
var should = require( 'should' );

describe(
	'Get balance',
	() => {
		it(
			'returns HTTP 200 with json encoded balance info',
			() => {
				return bsg.getBalance().then(
					r => {
						r.should.have.property( 'error' );
						r.error.should.be.equal( 0 );
						return r;
					}
				).should.eventually.have.property( 'amount' );
			}
		);
	}
);
describe(
	'Create and retrieve HLR',
	() => {
		it(
			'returns HTTP 200 with json encoded HLR on single HLR creation request ',
			() => {
				return bsg.createHLR(
					{
						msisdn: '380972920000',
						reference: 'extid1',
						tariff: '0',
						callback_url: 'http://someurl.com/callback/?id=12345'
					}
				).then(
					r => {
						r.should.have.property( 'result' );
						r.result[ 0 ].should.have.property( 'error' );
						r.result[ 0 ].error.should.be.oneOf( 0, 63 );
						return r;
					}
				).should.eventually.have.property( 'result' );

			}
		);
		it(
			'returns HTTP 200 with json encoded array of HLRs on multiple HLR creation request',
			() => {
				return bsg.createHLR(
					[ 
						{
							msisdn:"380972920000",
							reference:"extid1",
							tariff:"0",
							callback_url:"http://someurl.com/callback/?id=12345"
						},
						{
							msisdn:"380972920000",
							reference:"extid2",
							tariff:"0",
							callback_url:"http://someurl.com/callback/?id=12346"
						}
					]
				).then(
					r => {
						r.should.have.property( 'result' );
						r.result[ 0 ].should.have.property( 'error' );
						r.result[ 0 ].error.should.be.oneOf( 0, 63 );
						return r;
					}
				).should.eventually.have.property( 'result' );
			}
		);
		it(
			'returns HTTP 200 with json encoded HLR on HLR retrieve by reference',
			() => {
				return bsg.getHLR(
					{
						reference: 'extid1'
					}
				).should.eventually.have.property( 'name' );
			}
		);
	}
);
describe(
	'Create and retrieve SMS',
	() => {
		it(
			'returns HTTP 200 with json encoded SMS on single SMS creation request ',
			() => {
				return bsg.createSMS(
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
					r => {
						r.should.have.property( 'result' );
						r.result.should.have.property( 'error' );
						r.result.error.should.be.oneOf( 0, 23 );
						return r;
					}
				).should.eventually.have.property( 'result' );

			}
		);
		it(
			'returns HTTP 200 with json encoded array of SMSs on multiple SMS creation request',
			() => {
				return bsg.createSMS(
					{
						validity:"1",
						tariff:"0", 
						destination:"phones",
						originator:"alpha_name",
						body:"message text",
						phones:[
							{ 
								msisdn:"380972000000",
								reference:"ext_id_17"
							},
							{
								msisdn:"380972000001",
								reference:"ext_id_18"
							}
						]
					}
				).then(
					r => {
						r.should.have.property( 'task_id' );
						r.should.have.property( 'result' );
						r.result[ 0 ].should.have.property( 'error' );
						r.result[ 0 ].error.should.be.oneOf( 0, 23 );
						return r;
					}
				).should.eventually.have.property( 'result' );
			}
		);
		it(
			'returns HTTP 200 with json encoded SMS on SMS retrieve by reference',
			() => {
				return bsg.getSMS(
					{
						reference: 'ext_id_16'
					}
				).should.eventually.have.property( 'msisdn' );
			}
		);
	}
);
describe(
	'Create and retrieve Viber message',
	() => {
		it(
			'returns HTTP 200 with json encoded message on Viber creation request ',
			() => {
				return bsg.createViber(
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
					r => {
						r.should.have.property( 'result' );
						r.result[ 0 ].should.have.property( 'error' );
						r.result[ 0 ].error.should.be.oneOf( 0, 43 );
						return r;
					}
				).should.eventually.have.property( 'result' );

			}
		);
		it(
			'returns HTTP 200 with json encoded message on Viber retrieve by reference',
			() => {
				return bsg.getViber(
					{
						reference: 'ext_id_19'
					}
				).should.eventually.have.property( 'msisdn' );
			}
		);
	}
);
describe(
	'Retrieve prices',
	() => {
		it(
			'returns HTTP 200 with json encoded information about HLR prices',
			() => {
				return bsg.getHLRPrices().then(
					r => {
						r.should.have.property( 'error' );
						r.error.should.be.equal( 0 );
						r.should.have.property( 'prices' );
						r.prices.should.be.instanceof( Array );
						r.prices[0].should.have.property( 'price' );
						return r;
					}
				).should.eventually.have.property( 'error' );

			}
		);
		it(
			'returns HTTP 200 with json encoded information about SMS prices',
			() => {
				return bsg.getSMSPrices().then(
					r => {
						r.should.have.property( 'error' );
						r.error.should.be.equal( 0 );
						r.should.have.property( 'prices' );
						r.prices.should.be.instanceof( Array );
						r.prices[0].should.have.property( 'price' );
						return r;
					}
				).should.eventually.have.property( 'error' );

			}
		);it(
			'returns HTTP 200 with json encoded information about Viber prices',
			() => {
				return bsg.getViberPrices().then(
					r => {
						r.should.have.property( 'error' );
						r.error.should.be.equal( 0 );
						r.should.have.property( 'prices' );
						r.prices.should.be.instanceof( Array );
						r.prices[0].should.have.property( 'price' );
						return r;
					}
				).should.eventually.have.property( 'error' );

			}
		);
	}
);
