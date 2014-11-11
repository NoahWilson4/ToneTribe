$(document).on('ready', function() {

////////////// cocreation main page ///////////////////////


/////// cocreation templating ///////////

	var cocreationTemplate = $('#cocreation-template').html();
	var compileCocreationTemplate = Handlebars.compile(cocreationTemplate);


	/// append songs to page
	user.cocreationSongs.map(function(song){
		console.log('song test: ', song);
		var outputHTML = compileCocreationTemplate(song);
			$('#cocreation-container').prepend(outputHTML);
	});




});
	