(function($){
	
	
	/**
	*  initialize_field
	*
	*  This function will initialize the $field.
	*
	*  @date	30/11/17
	*  @since	5.6.5
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	function initialize_field( $field ) {
		
		//$field.doStuff();
		
		// mapboxgl.accessToken = 'pk.eyJ1IjoiaWduaXNtIiwiYSI6ImNqOG9tdXRrYTA1OGozMm5uZDJrMWsydHkifQ.tkOkehct0nuaV6Pls1vlSg';
		// var element = document.querySelector('.values #mapbox_address')
		// var map = new mapboxgl.Map({
		// 	container: element,
		// 	style: 'mapbox://styles/mapbox/streets-v9'
		// });
	}
	
	
	if( typeof acf.add_action !== 'undefined' ) {
	
		/*
		*  ready & append (ACF5)
		*
		*  These two events are called when a field element is ready for initizliation.
		*  - ready: on page load similar to $(document).ready()
		*  - append: on new DOM elements appended via repeater field or other AJAX calls
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		acf.add_action('ready_field/type=address_geocoding', initialize_field);
		acf.add_action('append_field/type=address_geocoding', initialize_field);
		
	} else {
		
		/*
		*  acf/setup_fields (ACF4)
		*
		*  These single event is called when a field element is ready for initizliation.
		*
		*  @param	event		an event object. This can be ignored
		*  @param	element		An element which contains the new HTML
		*  @return	n/a
		*/
		
		$(document).on('acf/setup_fields', function(e, postbox){
			// find all relevant fields
			$(postbox).find('.field[data-field_type="address_geocoding"]').each(function(){
				
				// initialize
				initialize_field( $(this) );
				
			});
		
		});
	
	}

})(jQuery);