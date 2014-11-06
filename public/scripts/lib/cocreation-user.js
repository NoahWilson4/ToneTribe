$(document).on('ready', function() {

////////////// cocreation main page ///////////////////////




var renderSong = function(songData) {
	console.log('songData',songData);
	var el = $('<div>')
	el.append('<form id="viewSong"></form>')
	el.append('<div class="song-result-container"><h3><a href="/song/?id=' + songData.songId + '">' + songData.songName + '</a></h3></div>');
	el.attr('data-id', songData.songId);
	return el;
};
user.cocreationSongs.map(function(song){
	console.log('song test: ', song);
	$('.song-container').append(renderSong(song));

});

$('#create-new-song').on('submit', function(e){
	e.preventDefault();
	var songName = $(this).find('[name=name]').val();
	var songData = {
		name: songName
	};

	$.post('/api/createNewSong', songData, function(responseData){
		console.log('responseData: ', responseData);
		var songEl = renderSong(responseData);
		console.log('songEl: ', songEl);
		$('.song-container').append(songEl);
	})
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