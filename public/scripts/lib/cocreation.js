$(document).on('ready', function() {

////////////// cocreation main page ///////////////////////

	var cocreationTemplate = $('#cocreation-template').html();
	var compileCocreationTemplate = Handlebars.compile(cocreationTemplate);

Handlebars.registerHelper('if_even', function(conditional, options) {
  if((conditional % 2) == 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

var cocreationSongs;

$.get('/api/getAllCocreations', function(response){
	console.log('response: ', response);
	cocreationSongs = response.cocreationSongs;
	console.log('cocreationSongs: ', cocreationSongs);
//// fill page with songs //////////
	cocreationSongs.map(function(song){
		console.log('song test: ', song);
		var outputHTML = compileCocreationTemplate(song);
		$('#cocreation-container').prepend(outputHTML);
	});
});


	$('#create-new-song').on('submit', function(e){
		e.preventDefault();
		var songName = $(this).find('[name=name]').val();
		var song = {
			name: songName
		};

		$.post('/api/createNewSong', song, function(responseData){
			console.log('responseData: ', responseData);
			var outputHTML = compileCocreationTemplate(responseData);
			$('#cocreation-container').prepend(outputHTML);
		});
	});




});
	//////// dynamically add a new track to the DOM ////////////

	// var audio = new Audio();
	// audio.src = '';
	// audio.controls = true;
	// audio.autoplay = true;
	// document.body.appendChild(audio);

	// var context = new webkitAudioContext();
	// var analyser = context.createAnalyser();

	// // Wait for window.onload to fire. See crbug.com/112368
	// window.addEventListener('load', function(e) {
	//   // Our <audio> element will be the audio source.
	//   var source = context.createMediaElementSource(audio);
	//   source.connect(analyser);
	//   analyser.connect(context.destination);

	//   // ...call requestAnimationFrame() and render the analyser's output to canvas.
	// }, false);
/////////////////////////////////////////////////////////////