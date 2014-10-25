$(document).on('ready', function() {

var renderSong = function(songData) {
	var el = $('<div>')
	el.append('<h3><a href="/song/' + songData._id + '">' + songData.name + '</a></h3>');

	// set an attribute on the main containing li that will let us access the track's specific database ID
	// 
	el.attr('data-id', songData._id);

	//append some action items
	
	// add _id to url variable, set up in app.js
	// el.append('<a class="btn btn-info" href="/view/' + songData._id + '">View</a>');
	// el.append('<button class="btn btn-success edit">Edit</button>');
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
	$('.upload-view').css({display: 'inline'})
});






var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var note;

	function playNote(url) {
		note = audioCtx.createBufferSource();
		  request = new XMLHttpRequest();
		  request.open('GET', url, true);
		  request.responseType = 'arraybuffer';

		  request.onload = function() {
		    var audioData = request.response;
		    audioCtx.decodeAudioData(audioData, function(buffer) {
		        note.buffer = buffer;
		        note.connect(audioCtx.destination);
		        note.loop = false;
		    },
		    function(e){"Error with decoding audio data" + e.err});
		  }
		request.send();
		note.start(0);
	}





});