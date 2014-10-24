$(document).on('ready', function() {

	var song = $('audio');


	function playSong() {
		song.play();
	};

	function pauseSong() {
		song.pause();
	};

	$('#play').on('click', function(){
		console.log('play');
		playSong();
	});



});