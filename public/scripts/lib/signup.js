$(document).on('ready', function() {

	var ageConvert = function(birthdate) {
		var birthday = birthdate;
		birthday = birthday.split('-');
		var now = new Date();
		var year = now.getYear() + 1900;
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var today =[];
		today.push(year, month, date);
		for (var i = 0; i < birthday.length; i++) {
			birthday[i] = Number(birthday[i]);
		};
		var age = today[0] - birthday[0];
		if (birthday[1] >= today[1] && birthday[2] > today[2]) {
			age--;
		}
		return age;
	};

	// capricorn 12-22 1-19
	// aquarius 1-20 2-19
	// pisces 2-20 3-20
	// aries 3-21 4-19
	// taurus 4-20 5-20
	// gemini 5-21 6-20
	// cancer 6-21 7-22
	// leo 7-23 8-22
	// virgo 8-23 9-22
	// libra 9-23 10-23
	// scorpio 10-24 11-22 
	// sagittarius 11-23 12-21

	var astroConvert = function(birthdate) {
		var birthday = birthdate;
		birthday = birthday.split('-');
		birthday.shift();
		for (var i = 0; i < birthday.length; i++) {
			birthday[i] = Number(birthday[i]);
		};
		console.log('birthday: ', birthday);
		if ((birthday[0] === 12 && birthday[1] >= 22) || (birthday[0] === 1 && birthday[1] <= 19)) {
			var sign = 'Capricorn';
		} else if ((birthday[0] === 1 && birthday[1] >= 20) || (birthday[0] === 2 && birthday[1] <= 19)) {
			var sign = 'Aquarius';
		} else if ((birthday[0] === 2 && birthday[1] >= 20) || (birthday[0] === 3 && birthday[1] <= 20)) {
			var sign = 'Pisces';
		} else if ((birthday[0] === 3 && birthday[1] >= 21) || (birthday[0] === 4 && birthday[1] <= 19)) {
			var sign = 'Aries';
		} else if ((birthday[0] === 4 && birthday[1] >= 20) || (birthday[0] === 5 && birthday[1] <= 20)) {
			var sign = 'Taurus';
		} else if ((birthday[0] === 5 && birthday[1] >= 21) || (birthday[0] === 6 && birthday[1] <= 20)) {
			var sign = 'Gemini';
		} else if ((birthday[0] === 6 && birthday[1] >= 21) || (birthday[0] === 7 && birthday[1] <= 22)) {
			var sign = 'Cancer';
		} else if ((birthday[0] === 7 && birthday[1] >= 23) || (birthday[0] === 8 && birthday[1] <= 22)) {
			var sign = 'Leo';
		} else if ((birthday[0] === 8 && birthday[1] >= 23) || (birthday[0] === 9 && birthday[1] <= 22)) {
			var sign = 'Virgo';
		} else if ((birthday[0] === 9 && birthday[1] >= 23) || (birthday[0] === 10 && birthday[1] <= 24)) {
			var sign = 'Libra';
		} else if ((birthday[0] === 10 && birthday[1] >= 24) || (birthday[0] === 11 && birthday[1] <= 22)) {
			var sign = 'Scorpio';
		} else if ((birthday[0] === 11 && birthday[1] >= 23) || (birthday[0] === 12 && birthday[1] <= 21)) {
			var sign = 'Scorpio';
		} 
		console.log('sign: ', sign);
		return sign;  
	};

	

var userInfo = {
	bands: [],
	instruments: [],
	styles: [],
	skills: [],
	inspirations: [],
	improvComp: undefined
}
	

	$('.sidebar-list-text').append('<input type="text" class="add-new-word editing-profile edit" placeholder="Add New...">');
//// add new item 
	$(document).on('blur', '.add-new-word', function(){
			console.log('find id...');
			var val = $(this).val();
			var attr = $(this).closest('p').attr('name');
			console.log('attr, val: ', attr, val);
			userInfo[attr].push(val);
			console.log('userInfo', userInfo);
			$(this).closest('.sidebar-list-text').append('<div class="words editing-profile edit">' + $(this).val() +'</div>');
			$(this).closest('.sidebar-list-text').find('.words').last().append('<button class="btn btn-default btn-xs delete-word">X</button>');
			$(this).closest('.sidebar-list-text').append('<input type="text" class="add-new-word editing-profile edit" placeholder="Add New...">');
			$(this).remove();
	});

//////// delete item
	$(document).on('click', '.delete-word', function(){
			// var val = $(this).closest('.words').text().split(',').shift().split('X').pop();
			var val = $(this).closest('.words').text();
			val = val.substring(0, val.length-1);
			var attr = $(this).closest('p').attr('name');
			console.log('val, attr', val, attr);
			console.log('before deleted...', userInfo[attr]);
			var a = userInfo[attr];
			console.log('a: ', a);
			for (var i = 0; i < a.length; i++){
				console.log('a[i], val', a[i], val);
				if (a[i] === val) {
					a.splice(i, 1);
					console.log('a deleted: ', a);
				}
			}
			console.log('after deleted...', userInfo);
			$(this).closest('.words').remove();
			//// ajax request here
			
	});

	

	$('#improvCompRange').change(function(){
		userInfo.improvComp = $(this).text();
		console.log(userInfo);
		$('#comp').text($(this).text());
		$('#improv').text(100 - $(this).text());
		$('#ratio-bar-signup').attr("style", "width: " + $(this).text() + "%")
		$('#ratio-bar-signup2').attr("style", "width: " + (100 - $(this).text()) + "%")
	})

	$('#signup2-submit').on('click', function(){
		var id = $(this).closest('form').find('#id').attr('value');
		console.log('id: ', id);
		userInfo['id'] = id;
		var searchResults = $.ajax({
			type: 'POST',
			url: '/updateUserFromClient',
			traditional: true,
			data: userInfo
		}).done(function() {
		  	console.log( "success" );
		  })
		  .fail(function() {
		    console.log( "error" );
		  })
		  .always(function() {
		    console.log( "complete, searchResults: ", searchResults );
		  });
		// $.post('/updateUserFromClient', {userInfo: userInfo}, function(response){

		// })
	})

	function findProfileUrl(){
		console.log('hello?');
		var profileUrl = 'url(' + $('#upload-profilePic').find('#profileUrl').attr('value') + ')';
		console.log('url', profileUrl);
		$('#profile-image-holder').css({
			backgroundImage: profileUrl
		})
	};
	findProfileUrl();
	
	function findBackgroundUrl(){
		console.log('hello?');
		var backgroundUrl = 'url(' + $('#upload-backgroundPic').find('#backgroundUrl').attr('value') + ')';
		console.log('url', backgroundUrl);
		$('#background-image-holder').css({
			backgroundImage: backgroundUrl
		})
	};
	findBackgroundUrl();


	//////////  create ajax call to save userinfo on submit/go to next page

})