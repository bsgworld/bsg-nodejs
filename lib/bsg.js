/**
 * Bulk SMS Solutions
 * nodeJS library
 *
 * @author Anton Zelenski zelibobla@gmail.com
 * @copyright BSG HONG KONG LIMITED
 */
"use strict";

var library = function(){
	
	var request = require( 'request' );
	var police = require( './police.js' );

	/**
	 * just wrap public API of BSG into several methods
	 * @param String key – secret key given you in order to access bsg server
	 * @return Object
	 */
	var bsg = ( key ) => {
		
		/** @var String baseUrl – BSG server address */
		var baseUrl = 'https://app.bsg.hk';
		
		/**
		 * since all requests to API must follow same rules
		 * and responses can be handled in one way wrap all requests into this private helper
		 * @param String route – part of request url after domain name
		 * @param (optional) Object data – set of key value pair to pass in POST requests
		 * @return Promise.<Object>
		 */
		var remoteCall = ( route, data ) => {
			return new Promise(
				( resolve, reject ) => {
					var method = 'object' == typeof data ? 'post' : 'get';
					var params = {
							method: method,
							url: `${baseUrl}${route}`,
							headers: {
								"X-API-KEY": key
							},
							resolveWithFullResponse: true
						};
					if( data ){
						params.headers[ 'Content-type' ] = 'multipart/form-data'
						params.body = JSON.stringify( data );
					}
					request(
						params,
						( error, response, body ) => {
							if( error ){
								reject( `BSG server rejected request on HTTP level: ${e}` );
								return;
							}
							try{
								var body = JSON.parse( body ); 
							} catch( e ){
								reject( `Unexpected response from BSG server: ${r}` );
								return;
							}
							resolve( body );
						}
					);
				}
			);
		}
		
		return {
			/**
			 * Call API to get the balance information of your account
			 * @return Promise.<Object>
			 */
			getBalance: () => {
				return remoteCall( '/rest/common/balance' );
			},

			/**
			 * Call API to get existing HLR info
			 * @param Object params – object with only one of following fields specified
			 * 			Integer id – unique id of sms
			 *			String reference – reference of sms
			 *			Integer task_id – unique id of task
			 * @return Promise.<Object>
			 * @throws Exception in case of invalid term type
			 */
			getHLR: ( params ) => {
				var checkResult = police.getHLR( params );
				if( !checkResult.is_allowed ){
					throw checkResult.reason;
				}
				var route = params.id
					? `/rest/hlr/${params.id}`
					: `/rest/hlr/reference/${params.reference}`;
				return remoteCall( route );
			},
		
			/**
			 * Call API to create HLR
			 * @param Object fields – Object of fields:
			 *			integer msisdn – the telephone number that you want to do a network query on
			 * 			string reference – a client reference
			 *		  Array of such objects also accepted
			 * @return Promise.<Object>
			 * @throws Exception in case of invalid fields specification
			 */
			createHLR: ( fields ) => {
				var array = !( fields instanceof Array ) ? [ fields ] : fields;
				array.forEach(
					obj => {
						var checkResult = police.createHLR( obj );
						if( !checkResult.is_allowed ){
							throw checkResult.reason;
						}
					}
				)
				return remoteCall( `/rest/hlr/create`, array );
			},
			
			/**
			 * Call API to get existing SMS info
			 * @param Object params – object with only one of following fields specified
			 * 			Integer id – unique id of sms
			 *			String reference – reference of sms
			 *			Integer task_id – unique id of task
			 * @return Promise.<Object>
			 * @throws Exception in case of invalid params
			 */
			getSMS: ( params ) => {
				var checkResult = police.getSMS( params );
				if( !checkResult.is_allowed ){
					throw checkResult.reason;
				}
				var route = params.id
					? `/rest/sms/${params.id}`
					: params.reference
						? `/rest/sms/reference/${params.reference}`
						: `/rest/sms/task_id/${params.task_id}`;
				return remoteCall( route );
			},
			
			/**
			 * Call API to create SMS
			 * @param Object fields – Object of fields:
			 *			integer msisdn – the telephone number that you want to do a network query on
			 * 			string reference – a client reference
			 *		  Array of such objects also accepted
			 * @return Promise.<Object>
			 * @throws Exception in case of invalid fields specification
			 */
			createSMS: ( fields ) => {
				var array = !( fields instanceof Array ) ? [ fields ] : fields;
				array.forEach(
					obj => {
						var checkResult = police.createSMS( obj );
						if( !checkResult.is_allowed ){
							throw checkResult.reason;
						}
					}
				)
				var route = `/rest/sms/create`;
				return remoteCall( route, fields );
			},
			
			/**
			 * Call API to get existing viber message info
			 * @param Object params – object with only one of following fields specified
			 * 			Integer id – unique id of sms
			 *			String reference – reference of sms
			 * @return Promise.<Object>
			 * @throws Exception in case of invalid params
			 */
			getViber: ( params ) => {
				var checkResult = police.getViber( params );
				if( !checkResult.is_allowed ){
					throw checkResult.reason;
				}
				var route = params.id
					? `/rest/viber/${params.id}`
					: `/rest/viber/reference/${params.reference}`;
				return remoteCall( route );
			},
			
			/**
			 * Call API to create viber message
			 * @param Object fields – Object of fields:
			 *			integer msisdn – the telephone number that you want to do a network query on
			 * 			string reference – a client reference
			 *		  Array of such objects also accepted
			 * @return Promise.<Object>
			 * @throws Exception in case of invalid fields specification
			 */
			createViber: ( fields ) => {
				var array = !( fields instanceof Array ) ? [ fields ] : fields;
				array.forEach(
					obj => {
						var checkResult = police.createViber( obj );
						if( !checkResult.is_allowed ){
							throw checkResult.reason;
						}
					}
				)
				var route = `/rest/viber/create`;
				return remoteCall( route, fields );
			},
			
			/**
			 * Call API to get HLR prices
			 * @param (optional) String tariff – tariff code of a price grid
			 * @return Promise.<Object>
			 * @throws Exception in case of invalid term type
			 */
			getHLRPrices: ( tariff ) => {
				var route = tariff
					? `/rest/hlr/prices/${tariff}`
					: `/rest/hlr/prices`;
				return remoteCall( route );
			},
			
			/**
			 * Call API to get SMS prices
			 * @param (optional) String tariff – tariff code of a price grid
			 * @return Promise.<Object>
			 * @throws Exception in case of invalid term type
			 */
			getSMSPrices: ( tariff ) => {
				var route = tariff
					? `/rest/sms/prices/${tariff}`
					: `/rest/sms/prices`;
				return remoteCall( route );
			},
			
			/**
			 * Call API to get Viber prices
			 * @param (optional) String tariff – tariff code of a price grid
			 * @return Promise.<Object>
			 * @throws Exception in case of invalid term type
			 */
			getViberPrices: ( tariff ) => {
				var route = tariff
					? `/rest/viber/prices/${tariff}`
					: `/rest/viber/prices`;
				return remoteCall( route );
			},
		}
			
	}
	
	return bsg;
}

module.exports = library();