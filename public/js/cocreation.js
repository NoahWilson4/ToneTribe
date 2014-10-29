$(document).on('ready', function() {

////////////// cocreation main page ///////////////////////

////////////// for song page /////////////////////
var renderSong = function(songData) {
	currentId = songData._id
	var el = $('<div>')
	el.append('<form id="viewSong"></form>')
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

	var allTracks;
	var id = window.location.pathname.split('/').pop();
	console.log('id: ', id);
	var requestUrl = '/api/getTrackUrls/' + id;
	$.post('/api/getTrackUrls', {id: id}, function(responseData){
		allTracks = responseData;
		console.log('allTracks 1: ', allTracks);

	// async.whilst([function(){ return alltracks === undefined }],
		

	// 	)

		var tracks0 = allTracks[0];
		var tracks1 = allTracks[1];
		var tracks2 = allTracks[2];
		var tracks3 = allTracks[3];
		var tracks4 = allTracks[4];
		var tracks5 = allTracks[5];

		$('.track0').append(tracks0[0].trackTitle);
		$('.track1').append(tracks1[0].trackTitle);
		$('.track2').append(tracks2[0].trackTitle);
		$('.track3').append(tracks3[0].trackTitle);
		$('.track4').append(tracks4[0].trackTitle);
		$('.track5').append(tracks5[0].trackTitle);

		console.log('test....')

		if (tracks0[0]){
			var track0 = document.createElement('audio');
					    track0.setAttribute('src', tracks0[0].url);
					    track0.load()
					    track0.controls = true;
					    $.get();
			}
		if (tracks1[0]){
		var track1 = document.createElement('audio');
				    track1.setAttribute('src', tracks1[0].url);
				    track1.load()
				    track1.controls = true;
				    $.get();
			}
		if (tracks2[0]){
		var track2 = document.createElement('audio');
				    track2.setAttribute('src', tracks2[0].url);
				    track2.load()
				    track2.controls = true;
				    $.get();
			}
		if (tracks3[0]){
		var track3 = document.createElement('audio');
				    track3.setAttribute('src', tracks3[0].url);
				    track3.load()
				    track3.controls = true;
				    $.get();
			}
		if (tracks4[0]){
		var track4 = document.createElement('audio');
				    track4.setAttribute('src', tracks4[0].url);
				    track4.load()
				    track4.controls = true;
				    $.get();
			}
		if (tracks5[0]){
		var track5 = document.createElement('audio');
				    track5.setAttribute('src', tracks5[0].url);
				    track5.load()
				    track5.controls = true;
				    $.get();
			}

		$('.track0').on('click', function(){
			console.log('play click!');
			track0.play();
		})
		$('.track1').on('click', function(){
			console.log('play click!');
			track1.play();
		})
		$('.track2').on('click', function(){
			console.log('play click!');
			track2.play();
		})
		$('.track3').on('click', function(){
			console.log('play click!');
			track3.play();
		})
		$('.track4').on('click', function(){
			console.log('play click!');
			track4.play();
		})
		$('.track5').on('click', function(){
			console.log('play click!');
			track5.play();
		})


		$('#play').on('click', function(){
			console.log('play all...');
			if(track0){

			track0.play();
			}
			track1.play();
			track2.play();
			track3.play();
			track4.play();
			track5.play();
		})


	});














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