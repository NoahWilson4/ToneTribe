$(document).on('ready', function() {

////////////// cocreation main page ///////////////////////

var renderSong = function(songData) {
	var el = $('<div>')
	el.append('<h3><a href="/song/' + songData._id + '">' + songData.name + '</a></h3>');
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



////////////// for song page /////////////////////


///////////////// audio context /////////////
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

/////////////// get urls /////////////////
	var track0 = [];
	var track1 = [];
	var track2 = [];
	var track3 = [];
	var track4 = [];
	var track5 = [];

	var id = window.location.pathname.split('/').pop();
	console.log('id: ', id);
	var requestUrl = '/api/getTrackUrls/' + id;
	$.post('/api/getTrackUrls', {id: id}, function(responseData){
		console.log('responseData:', responseData);
		trackData = responseData.NumUrls;
		console.log('trackData', trackData);
		for (var i = 0; i < trackData.length; i++){
			if (trackData[i].track === 0) {
				track0.push(trackData[i]);
			} else if (trackData[i].track === 1) {
				track1.push(trackData[i]);
			} else if (trackData[i].track === 2) {
				track2.push(trackData[i]);
			} else if (trackData[i].track === 3) {
				track3.push(trackData[i]);
			} else if (trackData[i].track === 4) {
				track4.push(trackData[i]);
			} else if (trackData[i].track === 5) {
				track5.push(trackData[i]);
			}
		}
		console.log(track0, track1, track2, track3, track4, track5);
	});



	$('.track0').on('click', function(){
		console.log('play click!');
		playNote(track0[0].url);
	})




























});