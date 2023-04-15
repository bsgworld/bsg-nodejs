/**
 * Bulk SMS Solutions
 * nodeJS library
 *
 * current file checks if provided data can be applied to specified method
 *
 * @author Anton Zelenski zelibobla@gmail.com
 * @copyright BSG HONG KONG LIMITED
 */
"use strict";

module.exports = function() {
	
	/**
	 * auxilary function returns type of any variable in readable string
	 * @param Mixed v – any variable
	 * @see https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
	 * @return srting
	 */
	var getType = ( v ) => ({}).toString.call( v ).match( /\s([a-zA-Z]+)/ )[ 1 ].toLowerCase();
	
	var patterns = {
			digitsOnly: /^\d+$/,
			url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
		};

	/** object with list of API methods to check provided params */
	var police = {
		
		/**
		 * check if params can be used in getHLR method
		 * @param Object params – object with only one of following fields specified
		 * 			Integer id – unique id of sms
		 *			String reference – reference of sms
		 *			Integer task_id – unique id of task
		 * @return Object { Boolean allowed: , String reason: }
		 */
		getHLR: ( params ) => {
			if( 'object' != typeof params ){
				var type = getType( params );
				return {
					is_allowed: false,
					reason: `getHLR method expects params object. '${type}' provided`
				};
			}
			var defineds = Object.keys(
					params
				).filter(
					k => {
						return -1 !== [ 'id', 'reference', 'task_id' ].indexOf( k ) &&
							'undefined' != typeof params[ k ]
					}
				);
			if( 1 !== defineds.length ){
				return {
					is_allowed: false,
					reason: `getHLR method got more than one param which is ambiguous. Only one must be specified`
				};
			}
			if( 'undefined' != typeof params.id &&
				(
					'number' != typeof params.id ||
					!(
						'string' == typeof params.id &&
						patterns.digitsOnly.test( params.id )
					)
				)
			){
				var type = getType( params.id );
				return {
					is_allowed: false,
					reason: `getHLR method expects in params.id only integer or string of digits. '${type}' given`
				};
			}
			if( 'undefined' != typeof params.reference &&
				'string' != typeof params.reference
			){
				var type = getType( params.reference );
				return {
					is_allowed: false,
					reason: `getHLR method expects in params.reference only string. '${type}' given`
				};
			}
			return {
				is_allowed: true
			};
		},
		
		/**
		 * Call API to create HLR
		 * @param Object fields – Object of fields:
		 *			String msisdn – the telephone number that you want to do a network query on
		 * 			String reference – a client reference
		 *			(optional) Integer tariff – tariff code of a price grid
		 *			(optional) String callback_url – URL on your server on which the
		 *											 Number Lookup response will be sent.
		 * @return Object { Boolean allowed: , String reason: }
		 */
		createHLR: ( fields ) => {
			if( 'object' != typeof fields ){
				var type = getType( fields );
				return { is_allowed: false, reason: `createHLR method requires fields object. '${type}' provided` };
			}
			if( 'undefined' == typeof fields.msisdn ){
				return { is_allowed: false, reason: `createHLR method requires 'msisdn' field` };
			}
			if( !patterns.digitsOnly.test( fields.msisdn ) ){
				return { is_allowed: false, reason: `createHLR method expects 'msisidn' field to be integer` };
			}
			if( 'undefined' == typeof fields.reference ){
				return { is_allowed: false, reason: `createHLR method requires 'reference' field` };
			}
			if( 'undefined' != typeof fields.tariff &&
				'number' != typeof fields.tariff &&
				!(
					'string' == typeof fields.tariff && 
					patterns.digitsOnly.test( fields.tariff )
				)
			){
				var type = getType( fields.tariff );
				return {
					is_allowed: false,
					reason: `createHLR method 'tariff' field must be an integer, ${type} provided`
				};
			}
			if( 'undefined' != typeof fields.callback_url &&
				!patterns.url.test( fields.callback_url ) ){
				return {
					is_allowed: false,
					reason: `createHLR method 'callback_url' field doesn't look like url: ${fields.callback_url}`
				};
			}
			return { is_allowed: true };
		},
		
		/**
		 * check if params can be used in getSMS method
		 * @param Object params – object with only one of following fields specified
		 * 			Integer id – unique id of sms
		 *			String reference – reference of sms
		 *			Integer task_id – unique id of task
		 * @return Object { Boolean allowed: , String reason: }
		 */
		getSMS: ( params ) => {
			if( 'object' != typeof params ){
				var type = getType( params );
				return {
					is_allowed: false,
					reason: `getSMS method expects params object. '${type}' provided`
				};
			}
			var defineds = Object.keys(
					params
				).filter(
					k => {
						return -1 !== [ 'id', 'reference', 'task_id' ].indexOf( k ) &&
							'undefined' != typeof params[ k ]
					}
				);
			if( 1 !== defineds.length ){
				return {
					is_allowed: false,
					reason: `getSMS method got more than one param which is ambiguous. Only one must be specified`
				};
			}
			if( 'undefined' != typeof params.id &&
				(
					'number' != typeof params.id ||
					!(
						'string' == typeof params.id &&
						patterns.digitsOnly.test( params.id )
					)
				)
			){
				var type = getType( params.id );
				return {
					is_allowed: false,
					reason: `getSMS method expects in params.id only integer or string of digits. '${type}' given`
				};
			}
			if( 'undefined' != typeof params.task_id &&
				(
					'number' != typeof params.task_id ||
					!(
						'string' == typeof params.task_id &&
						patterns.digitsOnly.test( params.task_id )
					)
				)
			){
				var type = getType( params.task_id );
				return {
					is_allowed: false,
					reason: `getSMS method expects in params.task_id only integer or string of digits. '${type}' given`
				};
			}
			if( 'undefined' != typeof params.reference &&
				'string' != typeof params.reference
			){
				var type = getType( params.reference );
				return {
					is_allowed: false,
					reason: `getSMS method expects in params.reference only string. '${type}' given`
				};
			}
			return {
				is_allowed: true
			};
		},
		
		/**
		 * Call API to create SMS
		 * @param Object fields – Object of fields:
		 *			Integer originator – the sender of the message. This can be a telephone number 
		 *				(including country code) or an alphanumeric string.
		 *				In case of an alphanumeric string, the maximum length is 11 characters
		 * 			String body – the body of the SMS message
		 *			String msisdn – the telephone number
		 *			String destination – The type of message campaign "phone" || "phones"
		 *			String reference – client reference
		 *			Array phones – The array of recipients msisdn's & reference's.
		 * 				Required only if multiple message request ("destination": "phones")
		 *			Integer msisdn – the telephone number
		 *			(optional) Integer validity – amount of seconds that the message is valid
		 *			(optional) Integer tariff – tariff code of a price grid
		 * @return Object { Boolean allowed: , String reason: }
		 */
		createSMS: ( fields ) => {
			if( 'object' != typeof fields ){
				var type = getType( fields );
				return { is_allowed: false, reason: `createSMS method requires fields object. '${type}' provided` };
			}
			if( 'undefined' == typeof fields.originator ){
				return { is_allowed: false, reason: `createSMS method requires 'originator' field` };
			}
			if( 'undefined' == typeof fields.body ){
				return { is_allowed: false, reason: `createSMS method requires 'body' field` };
			}
			if( -1 === [ "phone", "phones" ].indexOf( fields.destination ) ){
				return {
					is_allowed: false,
					reason: `createSMS method requires 'body' field to one of "phone" or "phones"`
				};
			}
			if( "phone" == fields.destination ){
				if( 'undefined' == typeof fields.msisdn ){
					return { is_allowed: false, reason: `createSMS method requires 'msisdn' field` };
				}
				if( !patterns.digitsOnly.test( fields.msisdn ) ){
					return { is_allowed: false, reason: `createSMS method expects 'msisidn' field to be integer` };
				}
				if( 'undefined' == typeof fields.reference ){
					return { is_allowed: false, reason: `createSMS method requires 'reference' field` };
				}
			}
			if( "phones" == fields.destination ){
				if(
					!( fields.phones instanceof Array ) ||
					!fields.phones.length
				){
					return {
						is_allowed: false,
						reason: `createSMS method requires 'phones' field to be non-empty array`
					};
				}
			}
			if( 'undefined' != typeof fields.tariff &&
				'number' != typeof fields.tariff &&
				!(
					'string' == typeof fields.tariff && 
					patterns.digitsOnly.test( fields.tariff )
				)
			){
				var type = getType( fields.tariff );
				return {
					is_allowed: false,
					reason: `createSMS method 'tariff' field must be an integer, ${type} provided`
				};
			}
			if( 'undefined' != typeof fields.validity &&
				!patterns.digitsOnly.test( fields.validity ) ){
				return { is_allowed: false, reason: `createSMS method expects 'msisidn' field to be integer` };
			}
			if( 'undefined' != typeof fields.callback_url &&
				!patterns.url.test( fields.callback_url ) ){
				return {
					is_allowed: false,
					reason: `createSMS method 'callback_url' field doesn't look like url: ${fields.callback_url}`
				};
			}
			return { is_allowed: true };
		},
		
		/**
		 * check if params can be used in getViber method
		 * @param Object params – object with only one of following fields specified
		 * 			Integer id – unique id of sms
		 *			String reference – reference of sms
		 * @return Object { Boolean allowed: , String reason: }
		 */
		getViber: ( params ) => {
			if( 'object' != typeof params ){
				var type = getType( params );
				return {
					is_allowed: false,
					reason: `getViber method expects params object. '${type}' provided`
				};
			}
			var defineds = Object.keys(
					params
				).filter(
					k => {
						return -1 !== [ 'id', 'reference' ].indexOf( k ) &&
							'undefined' != typeof params[ k ]
					}
				);
			if( 1 !== defineds.length ){
				return {
					is_allowed: false,
					reason: `getViber method got more than one param which is ambiguous. Only one must be specified`
				};
			}
			if( 'undefined' != typeof params.id &&
				(
					'number' != typeof params.id ||
					!(
						'string' == typeof params.id &&
						patterns.digitsOnly.test( params.id )
					)
				)
			){
				var type = getType( params.id );
				return {
					is_allowed: false,
					reason: `getViber method expects in params.id only integer or string of digits. '${type}' given`
				};
			}
			if( 'undefined' != typeof params.reference &&
				'string' != typeof params.reference
			){
				var type = getType( params.reference );
				return {
					is_allowed: false,
					reason: `getViber method expects in params.reference only string. '${type}' given`
				};
			}
			return {
				is_allowed: true
			};
		},
		
		/**
		 * Call API to create Viber message
		 * @param Object fields – Object of fields:
		 *			Array messages – array of Viber message objects
		 * 				Array to – array of recipients' msisdn & reference
		 *					String msisdn – telephone number
		 * 					String reference – client reference
		 *	 			String text – body of the Viber message
		 *				String alpha_name – sender of the message
		 * 				(optional) Object options – object with Viber options
		 *			(optional) Integer validity – amount of seconds that the message is valid
		 *			(optional) Integer tariff – tariff code of a price grid
		 * 			(optional) String reference – client reference
		 * @return Object { Boolean allowed: , String reason: }
		 */
		createViber: ( fields ) => {
			if( 'object' != typeof fields ){
				var type = getType( fields );
				return { is_allowed: false, reason: `createViber method requires fields object. '${type}' provided` };
			}
			if( !( fields.messages instanceof Array ) ){
				var type = getType( fields.messages );
				return {
					is_allowed: false,
					reason: `createViber method requires 'messages' array. '${type}' provided`
				};
			}
			var mErrors = [];
			fields.messages.forEach(
				m => {
					if( !( m.to instanceof Array ) ){
						var type = getType( m.to );
						mErrors.push( `createViber messages array object must have 'to' Array. ${type} provided` );
						return;
					}
					m.to.forEach(
						( r, index ) => {
							if( 'string' != typeof r.reference ){
								var type = getType( r.reference );
								mErrors.push( `createViber message.to[ ${index} ] object must have 'reference' string. ${type} provided` );
								return;
							}
							if( 'number' != typeof r.msisdn &&
								(
									'string' != typeof r.msisdn ||
									!patterns.digitsOnly.test( r.msisdn )
								)
							){
								var type = getType( r.msisdn );
								mErrors.push( `createViber message.to[ ${index} ] object must have 'msisdn' string. ${type} provided` );
								return;
							}
						}
					)
					if( 'string' != typeof m.text ){
						var type = getType( m.text );
						mErrors.push( `createViber message.text must be a string. ${type} provided` );
						return;
					}
					if( 'string' != typeof m.alpha_name ){
						var type = getType( m.alpha_name );
						mErrors.push( `createViber message.alpha_name must be a string. ${type} provided` );
						return;
					}
					if( 'object' != typeof m.options ){
						var type = getType( m.options );
						mErrors.push( `createViber message.options must be an object. ${type} provided` );
						return;
					}
				}
			)
			if( mErrors.length ){
				return {
					is_allowed: false,
					reason: mErrors.join( "; " )
				};
			}
			if( 'undefined' != typeof fields.tariff &&
				'number' != typeof fields.tariff &&
				!(
					'string' == typeof fields.tariff && 
					patterns.digitsOnly.test( fields.tariff )
				)
			){
				var type = getType( fields.tariff );
				return {
					is_allowed: false,
					reason: `createViber method 'tariff' field must be an integer, ${type} provided`
				};
			}
			if( 'undefined' != typeof fields.validity &&
				!patterns.digitsOnly.test( fields.validity ) ){
				return { is_allowed: false, reason: `createViber method expects 'msisidn' field to be integer` };
			}
			return { is_allowed: true };
		}
		
	}
	
	return police;
}();