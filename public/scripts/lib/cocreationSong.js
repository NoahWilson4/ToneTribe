$(document).on('ready', function() {
// song and user data is bootstrapped into the script



///// like song /////

$('#like-song').on('click', function(){
	console.log('click?');
	$.post('/song/likeSong', {_id: song._id}, function(response){
		$('#song-likes').text(response.likes + ' Likes');
	});
});

//// share song /////////

$('#share-form').on('submit', function(e){
	console.log('submitting share');
	e.preventDefault();
	var shareMessage = $(this).find('[name=share-message]').val();
	var date = moment().format('MMMM Do YYYY, h:mm:ss a');
	var songShare = {
		text: shareMessage,
		cocreationSong: song._id,
		cocreationSongPic: song.backgroundImage,
		cocreationSongName: song.name,
		cocreationSongDescription: song.description,
		user: user._id,
		userName: user.name,
		userProfilePic: user.profilePic,
		postedTo: user._id,
		date: date
	};
	console.log('submitting share2', songShare);
	$.post('/api/shareSong', {songShare: songShare}, function(response){
		console.log('response: ', response);
	});
});










	////////// uploading tracks ///////////

	$('#uploadTrackButton0').on('click', function(){
		$('#uploadingTrack0').removeClass('hide');
		$(this).addClass('hide');
		$('#close0').addClass('hide');
	});

	$('#uploadTrackButton1').on('click', function(){
		$('#uploadingTrack1').removeClass('hide');
		$(this).addClass('hide');
		$('#close1').addClass('hide');
	});

	$('#uploadTrackButton2').on('click', function(){
		$('#uploadingTrack2').removeClass('hide');
		$(this).addClass('hide');
		$('#close2').addClass('hide');
	});

	$('#uploadTrackButton3').on('click', function(){
		$('#uploadingTrack3').removeClass('hide');
		$(this).addClass('hide');
		$('#close3').addClass('hide');
	});

	$('#uploadTrackButton4').on('click', function(){
		$('#uploadingTrack4').removeClass('hide');
		$(this).addClass('hide');
		$('#close4').addClass('hide');
	});

	$('#uploadTrackButton5').on('click', function(){
		$('#uploadingTrack5').removeClass('hide');
		$(this).addClass('hide');
		$('#close5').addClass('hide');
	});

//////////////////////// comments ///////////////////////


$(document).on('click', '.drop-note', function(){
	console.log('click');
	$('#addComment').css({display: 'inherit'});
	$('#dropNote').text('Cancel').addClass('cancel').removeClass('drop-note');
});

$(document).on('click', '.cancel', function(){
	$('#addComment').css({display: 'none'});
	$('#dropNote').text('Drop a Note').removeClass('cancel').addClass('drop-note');
});


	// var commentTemplate = $('#comment-template').html();
	// var compileCommentTemplate = Handlebars.compile(commentTemplate);

	var postTemplate = $('#post-template').html();
	var compilePostTemplate = Handlebars.compile(postTemplate);

//////// on page load, add previous comments to page

	song.comments.map(function(comment){
		console.log('comment: ', comment);
		// var outputHTML = compileCommentTemplate(comment);
		var outputHTML = compilePostTemplate(comment);
		$('#comments-container').prepend(outputHTML);
	});

	$('#addComment').on('submit', function(event){
		event.preventDefault();
		var text = $(this).find('textarea').val();
		var date = moment().format('MMMM Do YYYY, h:mm:ss a');
		var comment = {
			userProfilePic: user.profilePic,
			user: user,
			userName: user.name,
			date: date,
			text: text,
			likes: 0,
			songId: song._id
		};


		$.post('/api/postComment', {comment: comment, songId: song._id} , function(responseData){
			console.log('responseData: ', responseData);
			console.log('addComment responseData: ', responseData);
		});

		// var outputHTML = compileCommentTemplate(comment);
		var outputHTML = compilePostTemplate(comment);
		$('#comments-container').prepend(outputHTML);

		$('#addComment').css({display: 'none'});
		$('#dropNote').text('Drop a Note').removeClass('cancel').addClass('drop-note');
	});

	$(document).on('click', '.like-comment', function(){
		var clicked = $(this);
		var songId = $(this).find('#commentInfo').attr('value');
		var commentText = $(this).closest('.list-group').find('#comment-text').text();
		console.log('songId, commentText: ', songId, commentText);
		var responseData = $.ajax({
			type: "POST",
			data: {
				songId: songId,
				comment: commentText
			},
			url: '/api/addCommentLike',
			traditional: true
		})
		.error(function(){
			console.log('error');
		})
		.done(function(err, result){
			console.log('done.', JSON.parse(responseData.responseText).likes);
			console.log('this test: ', this);
			$(clicked).closest('.list-group').find('.likes-comment').text(JSON.parse(responseData.responseText).likes + " Likes");
		});
	});

//////////////  add background image to player /////////

$('#uploadBackgroundPic').on('click', function(){
	console.log('click');
	$('#upload-container').toggle('reveal');
});

$('#uploadBackgroundButton').on('click', function(){
		$('#uploadingBackground').removeClass('hide');
		$(this).addClass('hide');

	});

/////////////  description ////////

$(document).on('click', '#edit-description', function(){
	$(this).addClass('hide');
	$('#add-description').find('[name=songDescription]').val($('#song-description').find('p').text());
	$('#add-description').removeClass('hide');
	$('#song-description').find('p').remove();
});

$('#add-description').on('submit', function(e){
	e.preventDefault();
	var description = $(this).find('[name=songDescription]').val();
	$('#song-description').append('<button id="edit-description" class="btn btn-default btn-simple-sm btn-post pull-right">Edit</button><p class="about">' + description + '</p>');
	$(this).toggle('reveal');

	$.post('/api/addSongDescription', {description: description, _id: song._id}, function(response){
		console.log('response: ', response);
	});
});



///// upload-download tracks

$('#upload-button0').on('click', function(){
	$('#upload-download0').toggle('reveal');
});
$('#upload-button1').on('click', function(){
	$('#upload-download1').toggle('reveal');
});
$('#upload-button2').on('click', function(){
	$('#upload-download2').toggle('reveal');
});
$('#upload-button3').on('click', function(){
	$('#upload-download3').toggle('reveal');
});
$('#upload-button4').on('click', function(){
	$('#upload-download4').toggle('reveal');
});
$('#upload-button5').on('click', function(){
	$('#upload-download5').toggle('reveal');
});


///////////////// audio context /////////////
var navigator = window.navigator;
navigator.getUserMedia = (
  navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
);

var context = new (window.AudioContext || window.webkitAudioContext)();
	// var note;

	// function playNote(url) {
	// 	note = context.createBufferSource();
	// 	  request = new XMLHttpRequest();
	// 	  request.open('GET', url, true);
	// 	  request.responseType = 'arraybuffer';

	// 	  request.onload = function() {
	// 	    var audioData = request.response;
	// 	    context.decodeAudioData(audioData, function(buffer) {
	// 	        note.buffer = buffer;
	// 	        note.connect(context.destination);
	// 	        note.loop = false;
	// 	    },
	// 	    function(e){"Error with decoding audio data" + e.err});
	// 	  }
	// 	request.send();
	// 	note.start(0);
	// }

/////////////// get urls /////////////////

	var allTracks;

	$.post('/api/getTrackUrls', {id: song._id}, function(responseData){
		allTracks = responseData;
		console.log('responseData 1: ', responseData);
		console.log('allTracks 1: ', allTracks);

	



		var tracks0 = allTracks[0];
		var tracks1 = allTracks[1];
		var tracks2 = allTracks[2];
		var tracks3 = allTracks[3];
		var tracks4 = allTracks[4];
		var tracks5 = allTracks[5];

		var gain0 = context.createGain();
		var gain1 = context.createGain();
		var gain2 = context.createGain();
		var gain3 = context.createGain();
		var gain4 = context.createGain();
		var gain5 = context.createGain();

		
		console.log('tracks0 at beginning', tracks0);
		console.log('tracks1 at beginning', tracks1);


		////// like track   //////////

$(document).on('click', '.like-track', function(){
	var trackId = $(this).attr('value');
	var trackNum = $(this).attr('name');
	var songId = song._id;
	var optionSelect = $('option[id=' + trackId + ']');
	var displayLikes = $(this).closest('.upload-switch-track').find('.likes');
	console.log('displayLikes: ', displayLikes);
	console.log('optionSelect: ', optionSelect);

	$.post('/song/likeTrack', {
			songId: songId,
			trackId: trackId,
			trackNum: trackNum
		}, function(response){
			$(displayLikes).removeClass('hide');
			$(displayLikes).text(response.likes + ' Likes');
			$(optionSelect).attr("data", response.likes);
			$(optionSelect).text($(optionSelect).attr('value') + ', By ' + $(optionSelect).attr('name') + ', ' + response.likes + ' Likes');

///// buggy buggy..... not worth fixing for demo, just dance around it.

			var allTracks = [tracks0, tracks1, tracks2, tracks3, tracks4, tracks5];
			console.log('allTracks: !!!!!!!', allTracks);
			for (var i = 0; i < allTracks[trackNum].length; i++){
				console.log('allTracks[trackNum][i]', allTracks[trackNum][i]);
				console.log('allTracks[trackNum][i].id', allTracks[trackNum][i].id);
				console.log(allTracks[trackNum][i].id.id);
				console.log(trackId);
				console.log('trackId: ',trackId);
				if( allTracks[trackNum][i].id.id.toString() === trackId.toString()){
					console.log('!! Yay!!!!!');
					allTracks[trackNum][i].likes = response.likes;
					console.log(allTracks[trackNum][i].likes);
					console.log(allTracks[trackNum][i]);
					console.log(tracks0);
				}
			}
		}
	);
});





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

		//connect sources
		if (tracks0[0]){
			var source0 = context.createMediaElementSource(track0);
				source0.connect(gain0);
				gain0.connect(analyser0);
				gain0.connect(context.destination);
			}
		if (tracks1[0]){
			var source1 = context.createMediaElementSource(track1);
				source1.connect(gain1);
				gain1.connect(analyser1);
				gain1.connect(context.destination);
			}
		if (tracks2[0]){
			var source2 = context.createMediaElementSource(track2);
				source2.connect(gain2);
				gain2.connect(analyser2);
				gain2.connect(context.destination);
			}
		if (tracks3[0]){
			var source3 = context.createMediaElementSource(track3);
				source3.connect(gain3);
				gain3.connect(analyser3);
				gain3.connect(context.destination);
			}
		if (tracks4[0]){
			var source4 = context.createMediaElementSource(track4);
				source4.connect(gain4);
				gain4.connect(analyser4);
				gain4.connect(context.destination);
			}
		if (tracks5[0]){
			var source5 = context.createMediaElementSource(track5);
				source5.connect(gain5);
				gain5.connect(analyser5);
				gain5.connect(context.destination);
			}


		$('.play0').on('click', function(){
			console.log('play click!');
			track0.play();
		})
		$('.play1').on('click', function(){
			console.log('play click!');
			track1.play();
		})
		$('.play2').on('click', function(){
			console.log('play click!');
			track2.play();
		})
		$('.play3').on('click', function(){
			console.log('play click!');
			track3.play();
		})
		$('.play4').on('click', function(){
			console.log('play click!');
			track4.play();
		})
		$('.play5').on('click', function(){
			console.log('play click!');
			track5.play();
		})

		$(document).on('click', '.mute0', function(){
			gain0.gain.value = 0;
			$(this).addClass('unmute0').removeClass('mute0');
		})
		$(document).on('click', '.unmute0', function(){
			gain0.gain.value = 1;
			$(this).removeClass('unmute0').addClass('mute0');
		})

		$(document).on('click', '.mute1', function(){
			gain1.gain.value = 0;
			$(this).addClass('unmute1').removeClass('mute1');
		})
		$(document).on('click', '.unmute1', function(){
			gain1.gain.value = 1;
			$(this).removeClass('unmute1').addClass('mute1');
		})

		$(document).on('click', '.mute2', function(){
			gain2.gain.value = 0;
			$(this).addClass('unmute2').removeClass('mute2');
		})
		$(document).on('click', '.unmute2', function(){
			gain2.gain.value = 1;
			$(this).removeClass('unmute2').addClass('mute2');
		})

		$(document).on('click', '.mute3', function(){
			gain3.gain.value = 0;
			$(this).addClass('unmute3').removeClass('mute3');
		})
		$(document).on('click', '.unmute3', function(){
			gain3.gain.value = 1;
			$(this).removeClass('unmute3').addClass('mute3');
		})

		$(document).on('click', '.mute4', function(){
			gain4.gain.value = 0;
			$(this).addClass('unmute4').removeClass('mute4');
		})
		$(document).on('click', '.unmute4', function(){
			gain4.gain.value = 1;
			$(this).removeClass('unmute4').addClass('mute4');
		})

		$(document).on('click', '.mute5', function(){
			gain5.gain.value = 0;
			$(this).addClass('unmute5').removeClass('mute5');
		})
		$(document).on('click', '.unmute5', function(){
			gain5.gain.value = 1;
			$(this).removeClass('unmute5').addClass('mute5');
		})
		



		$('#play').on('click', function(){
			console.log('play all...');
			if(track0){track0.play();}
			if (track1){track1.play();}
			if (track2){track2.play();}
			if (track3){track3.play();}
			if (track4){track4.play();}
			if (track5){track5.play();}
		})
		$('#stop').on('click', function(){
			console.log('play all...');
			if(track0){track0.pause();}
			if (track1){track1.pause();}
			if (track2){track2.pause();}
			if (track3){track3.pause();}
			if (track4){track4.pause();}
			if (track5){track5.pause();}
		})

////////// should be able to be refactored ...., this was being a pain and not working....

		// var setTrackUrl = function(tracks, track, trackTitle) {
		// 	console.log('tracks: ', tracks);
		// 	console.log('track: ', track);
		// 	for(var i = 0; i < tracks.length; i++){
		//     	var testVal = tracks[i].trackTitle;
		//     	if (testVal === trackTitle) {
		//     		console.log('match!')
		//     		track.setAttribute('src', tracks[i].url);
		//     	}
		//     }
		// }



		$('#select0').on('change', function() {
		    console.log('test: ', $("#select0 option:selected").val());
		    var trackTitle = $("#select0 option:selected").val();
		    console.log('tracks0 in selector, trackTitle', trackTitle, tracks0);
		    // setTrackUrl(tracks0, track0, trackTitle);
		    for(var i = 0; i < tracks0.length; i++){
		    	var testVal = tracks0[i].trackTitle;
		    	if (testVal === trackTitle) {
		    		console.log('match!');
		    		track0.setAttribute('src', tracks0[i].url);
		    		$(this).closest('.track-container').find('.song-user-name').text(tracks0[i].userName);
		    		$(this).closest('.track-container').find('.song-track-name').text(trackTitle);
		    		$(this).closest('.track-container').find('.song-user-image').css({backgroundImage: 'url(' + tracks0[i].userPic + ')'});
		    		$(this).closest('.track-container').find('.likes').text(tracks0[i].likes + ' Likes');
		    	}
		    }
		  })
		  .trigger( "change" );

		$('#select1').on('change', function() {
		    console.log('test: ', $("#select1 option:selected").val());
		    var trackTitle = $("#select1 option:selected").val();
		    console.log('tracks1 in selector, trackTitle', trackTitle, tracks1);
		    // setTrackUrl(tracks0, track0, trackTitle);
		    for(var i = 0; i < tracks1.length; i++){
		    	var testVal = tracks1[i].trackTitle;
		    	if (testVal === trackTitle) {
		    		console.log('match!');
		    		track1.setAttribute('src', tracks1[i].url);
		    		$(this).closest('.track-container').find('.song-user-name').text(tracks1[i].userName);
		    		$(this).closest('.track-container').find('.song-track-name').text(trackTitle);
		    		$(this).closest('.track-container').find('.song-user-image').css({backgroundImage: 'url(' + tracks1[i].userPic + ')'});
		    		$(this).closest('.track-container').find('.likes').text(tracks1[i].likes + ' Likes');

		    	}
		    }
		  })
		  .trigger( "change" );

		  $('#select2').on('change', function() {
		    console.log('test: ', $("#select2 option:selected").val());
		    var trackTitle = $("#select2 option:selected").val();
		    console.log('tracks2 in selector, trackTitle', trackTitle, tracks2);
		    // setTrackUrl(tracks0, track0, trackTitle);
		    for(var i = 0; i < tracks2.length; i++){
		    	var testVal = tracks2[i].trackTitle;
		    	if (testVal === trackTitle) {
		    		console.log('match!');
		    		track2.setAttribute('src', tracks2[i].url);
		    		$(this).closest('.track-container').find('.song-user-name').text(tracks2[i].userName);
		    		$(this).closest('.track-container').find('.song-track-name').text(trackTitle);
		    		$(this).closest('.track-container').find('.song-user-image').css({backgroundImage: 'url(' + tracks2[i].userPic + ')'});
		    		$(this).closest('.track-container').find('.likes').text(tracks2[i].likes + ' Likes');
		    	}
		    }
		  })
		  .trigger( "change" );

		  $('#select3').on('change', function() {
		    console.log('test: ', $("#select3 option:selected").val());
		    var trackTitle = $("#select3 option:selected").val();
		    console.log('tracks3 in selector, trackTitle', trackTitle, tracks3);
		    // setTrackUrl(tracks0, track0, trackTitle);
		    for(var i = 0; i < tracks3.length; i++){
		    	var testVal = tracks3[i].trackTitle;
		    	if (testVal === trackTitle) {
		    		console.log('match!');
		    		track3.setAttribute('src', tracks3[i].url);
		    		$(this).closest('.track-container').find('.song-user-name').text(tracks3[i].userName);
		    		$(this).closest('.track-container').find('.song-track-name').text(trackTitle);
		    		$(this).closest('.track-container').find('.song-user-image').css({backgroundImage: 'url(' + tracks3[i].userPic + ')'});
		    		$(this).closest('.track-container').find('.likes').text(tracks3[i].likes + ' Likes');
		    	}
		    }
		  })
		  .trigger( "change" );

		  $('#select4').on('change', function() {
		    console.log('test: ', $("#select4 option:selected").val());
		    var trackTitle = $("#select4 option:selected").val();
		    console.log('tracks4 in selector, trackTitle', trackTitle, tracks4);
		    // setTrackUrl(tracks0, track0, trackTitle);
		    for(var i = 0; i < tracks4.length; i++){
		    	var testVal = tracks4[i].trackTitle;
		    	if (testVal === trackTitle) {
		    		console.log('match!');
		    		track4.setAttribute('src', tracks4[i].url);
		    		$(this).closest('.track-container').find('.song-user-name').text(tracks4[i].userName);
		    		$(this).closest('.track-container').find('.song-track-name').text(trackTitle);
		    		$(this).closest('.track-container').find('.song-user-image').css({backgroundImage: 'url(' + tracks4[i].userPic + ')'});
		    		$(this).closest('.track-container').find('.likes').text(tracks4[i].likes + ' Likes');
		    	}
		    }
		  })
		  .trigger( "change" );

		  $('#select5').on('change', function() {
		    console.log('test: ', $("#select5 option:selected").val());
		    var trackTitle = $("#select5 option:selected").val();
		    console.log('tracks5 in selector, trackTitle', trackTitle, tracks5);
		    // setTrackUrl(tracks0, track0, trackTitle);
		    for(var i = 0; i < tracks5.length; i++){
		    	var testVal = tracks5[i].trackTitle;
		    	if (testVal === trackTitle) {
		    		console.log('match!');
		    		track5.setAttribute('src', tracks5[i].url);
		    		$(this).closest('.track-container').find('.song-user-name').text(tracks5[i].userName);
		    		$(this).closest('.track-container').find('.song-track-name').text(trackTitle);
		    		$(this).closest('.track-container').find('.song-user-image').css({backgroundImage: 'url(' + tracks5[i].userPic + ')'});
		    		$(this).closest('.track-container').find('.likes').text(tracks5[i].likes + ' Likes');
		    	}
		    }
		  })
		  .trigger( "change" );


	});


////// microphone access

	// navigator.getUserMedia({audio: true}, function(stream) {
	//   var microphone = context.createMediaStreamSource(stream);
	//   microphone.connect(context.destination);
	// }, function(err){});

	var analyser0 = context.createAnalyser();
    var canvas0 = document.getElementById('canvas0');
	var canvasCtx0 = canvas0.getContext('2d');
	var canvas0Width = canvas0.width;
	var canvas0Height  = 90;
	
	analyser0.fftSize = 256;
    var bufferLength0 = analyser0.frequencyBinCount;
    console.log(bufferLength0);
    var dataArray0 = new Uint8Array(bufferLength0);

    canvasCtx0.clearRect(0, 0, canvas0Width, canvas0Height);

    function drawBars0() {
      drawVisual = requestAnimationFrame(drawBars0);

      analyser0.getByteFrequencyData(dataArray0);

      canvasCtx0.fillStyle = 'rgba(250, 250, 250, 0)';
      canvasCtx0.fillRect(0, 0, canvas0Width, canvas0Height);

      var barWidth = (canvas0Width / bufferLength0) * 2;
      var barHeight;
      var x = 0;
      for(var i = 0; i < bufferLength0; i++) {
        barHeight = dataArray0[i]/2.2;

        canvasCtx0.fillStyle = 'rgb(20,' + (barHeight+100) + ',150)';
        canvasCtx0.fillRect(x,canvas0Height-barHeight/1,barWidth,barHeight);

        x += barWidth + 2;
      }
    };

    drawBars0();

    var analyser1 = context.createAnalyser();
    var canvas1 = document.getElementById('canvas1');
	var canvasCtx1 = canvas1.getContext('2d');
	var canvas1Width = canvas1.width;
	var canvas1Height  = 90;
	
	analyser1.fftSize = 256;
    var bufferLength1 = analyser1.frequencyBinCount;
    console.log(bufferLength1);
    var dataArray1 = new Uint8Array(bufferLength1);

    canvasCtx1.clearRect(0, 0, canvas1Width, canvas1Height);

    function drawBars1() {
      drawVisual = requestAnimationFrame(drawBars1);

      analyser1.getByteFrequencyData(dataArray1);

      canvasCtx1.fillStyle = 'rgba(250, 250, 250, 0)';
      canvasCtx1.fillRect(0, 0, canvas1Width, canvas1Height);

      var barWidth = (canvas1Width / bufferLength1) * 2;
      var barHeight;
      var x = 0;
      for(var i = 0; i < bufferLength1; i++) {
        barHeight = dataArray1[i]/2.2;

        canvasCtx1.fillStyle = 'rgb(20,120,'  + (barHeight+120);
        canvasCtx1.fillRect(x,canvas1Height-barHeight/1,barWidth,barHeight);

        x += barWidth + 1;
      }
    };

    drawBars1();

    var analyser2 = context.createAnalyser();
    var canvas2 = document.getElementById('canvas2');
	var canvasCtx2 = canvas2.getContext('2d');
	var canvas2Width = canvas2.width;
	var canvas2Height  = 90;
	
	analyser2.fftSize = 256;
    var bufferLength2 = analyser2.frequencyBinCount;
    console.log(bufferLength2);
    var dataArray2 = new Uint8Array(bufferLength2);

    canvasCtx2.clearRect(0, 0, canvas2Width, canvas2Height);

    function drawBars2() {
      drawVisual = requestAnimationFrame(drawBars2);

      analyser2.getByteFrequencyData(dataArray2);

      canvasCtx2.fillStyle = 'rgba(250, 250, 250, 0)';
      canvasCtx2.fillRect(0, 0, canvas2Width, canvas2Height);

      var barWidth = (canvas2Width / bufferLength2) * 2;
      var barHeight;
      var x = 0;
      for(var i = 0; i < bufferLength2; i++) {
        barHeight = dataArray2[i]/2.2;

        canvasCtx2.fillStyle = 'rgb(' + (barHeight+100) + ',224,126)';
        canvasCtx2.fillRect(x,canvas2Height-barHeight/1,barWidth,barHeight);

        x += barWidth + 2;
      }
    };

    drawBars2();

    var analyser3 = context.createAnalyser();
    var canvas3 = document.getElementById('canvas3');
	var canvasCtx3 = canvas3.getContext('2d');
	var canvas3Width = canvas3.width;
	var canvas3Height  = 90;
	
	analyser3.fftSize = 256;
    var bufferLength3 = analyser3.frequencyBinCount;
    console.log(bufferLength3);
    var dataArray3 = new Uint8Array(bufferLength3);

    canvasCtx3.clearRect(0, 0, canvas3Width, canvas3Height);

    function drawBars3() {
      drawVisual = requestAnimationFrame(drawBars3);

      analyser3.getByteFrequencyData(dataArray3);

      canvasCtx3.fillStyle = 'rgba(250, 250, 250, 0)';
      canvasCtx3.fillRect(0, 0, canvas3Width, canvas3Height);

      var barWidth = (canvas3Width / bufferLength3) * 2;
      var barHeight;
      var x = 0;
      for(var i = 0; i < bufferLength3; i++) {
        barHeight = dataArray3[i]/2.2;

        canvasCtx3.fillStyle = 'rgb(' + (barHeight+80) + ',224,200)';
        canvasCtx3.fillRect(x,canvas3Height-barHeight/1,barWidth,barHeight);

        x += barWidth + 3;
      }
    };

    drawBars3();

    var analyser4 = context.createAnalyser();
    var canvas4 = document.getElementById('canvas4');
	var canvasCtx4 = canvas4.getContext('2d');
	var canvas4Width = canvas4.width;
	var canvas4Height  = 90;
	
	analyser4.fftSize = 256;
    var bufferLength4 = analyser4.frequencyBinCount;
    console.log(bufferLength4);
    var dataArray4 = new Uint8Array(bufferLength4);

    canvasCtx4.clearRect(0, 0, canvas4Width, canvas4Height);

    function drawBars4() {
      drawVisual = requestAnimationFrame(drawBars4);

      analyser4.getByteFrequencyData(dataArray4);

      canvasCtx4.fillStyle = 'rgba(250, 250, 250, 0)';
      canvasCtx4.fillRect(0, 0, canvas4Width, canvas4Height);

      var barWidth = (canvas4Width / bufferLength4) * 2;
      var barHeight;
      var x = 0;
      for(var i = 0; i < bufferLength4; i++) {
        barHeight = dataArray4[i]/2.2;

        canvasCtx4.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        canvasCtx4.fillRect(x,canvas4Height-barHeight/1,barWidth,barHeight);

        x += barWidth + 4;
      }
    };

    drawBars4();

    var analyser5 = context.createAnalyser();
    var canvas5 = document.getElementById('canvas5');
	var canvasCtx5 = canvas5.getContext('2d');
	var canvas5Width = canvas5.width;
	var canvas5Height  = 90;
	
	analyser5.fftSize = 256;
    var bufferLength5 = analyser5.frequencyBinCount;
    console.log(bufferLength5);
    var dataArray5 = new Uint8Array(bufferLength5);

    canvasCtx5.clearRect(0, 0, canvas5Width, canvas5Height);

    function drawBars5() {
      drawVisual = requestAnimationFrame(drawBars5);

      analyser5.getByteFrequencyData(dataArray5);

      canvasCtx5.fillStyle = 'rgba(250, 250, 250, 0)';
      canvasCtx5.fillRect(0, 0, canvas5Width, canvas5Height);

      var barWidth = (canvas5Width / bufferLength5) * 2;
      var barHeight;
      var x = 0;
      for(var i = 0; i < bufferLength5; i++) {
        barHeight = dataArray5[i]/2.2;

        canvasCtx5.fillStyle = 'rgb(75,50,' + (barHeight+100);
        canvasCtx5.fillRect(x,canvas5Height-barHeight/1,barWidth,barHeight);

        x += barWidth + 5;
      }
    };

    drawBars5();
 









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