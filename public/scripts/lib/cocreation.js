$(document).on('ready', function() {

////////////// cocreation main page ///////////////////////

	var cocreationTemplate = $('#cocreation-template').html();
	var compileCocreationTemplate = Handlebars.compile(cocreationTemplate);
	var cocreationTemplateSmall = $('#cocreation-template-small').html();
	var compileCocreationTemplateSmall = Handlebars.compile(cocreationTemplateSmall);


var cocreationSongs;

$.get('/api/getAllCocreations', function(response){
	console.log('response: ', response);
	cocreationSongs = response.cocreationSongs;
	console.log('cocreationSongs: ', cocreationSongs);

	var sortedByLikes = cocreationSongs.sort(function(a, b){
		console.debug(a, b);
		if ( (a.likes||0) > (b.likes||0) ) {
		    return -1;
		} else if ( (a.likes||0) < (b.likes||0) ) {
		    return 1;
		}
		return 0;
	});
//// fill page with songs //////////
	sortedByLikes.map(function(song){
		console.log('song test: ', song);
		var outputHTML = compileCocreationTemplate(song);
		$('#cocreation-container').append(outputHTML);
	});

	// $('#song-of-the-week').append(compileCocreationTemplateSmall(sortedByLikes[0]));
	$('#song-of-the-week').append(compileCocreationTemplate(sortedByLikes[0]));
});


	// $('#create-new-song').on('submit', function(e){
	// 	e.preventDefault();
	// 	var songName = $(this).find('[name=name]').val();
	// 	var song = {
	// 		name: songName
	// 	};

	// 	$.post('/api/createNewSong', song, function(responseData){
	// 		console.log('responseData: ', responseData);
	// 		var outputHTML = compileCocreationTemplate(responseData);
	// 		$('#cocreation-container').prepend(outputHTML);
	// 	});
	// });




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