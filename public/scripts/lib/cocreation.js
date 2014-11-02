$(document).on('ready', function() {

////////////// cocreation main page ///////////////////////

$.get('/api/getSongs', {}, function(responseData){
	console.log(responseData);
	responseData.map(function(song){
		$('.song-container').append(renderSong(song));
		});
})


var renderSong = function(songData) {
	console.log('songData',songData);
	var el = $('<div>')
	el.append('<form id="viewSong"></form>')
	el.append('<h3><a href="/song/?songId=' + songData._id + '">' + songData.name + '</a></h3>');
	el.attr('data-id', songData._id);
	return el;
};

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