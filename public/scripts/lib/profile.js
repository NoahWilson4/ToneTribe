$(document).on('ready', function() {


	//////  helper functions   /////////////////////////////////

	var lowerCase = function(x){
		if ($.isArray(x) === true){
			for (var y = 0; y < x.length; y++){
				x[y] = x[y].toLowerCase();
			}
			return x;
		} else if (x) {
			var lowerCased = x.toLowerCase();
			return lowerCased;
			}
		};

	var capitolizeFirst = function(string) {
		var split = string.split(' ');
		for (var i = 0; i < split.length; i++){
			split[i] = split[i].charAt(0).toUpperCase() + split[i].substr(1);
		}
		split = split.join(' ');
		return split;
	};

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
			var sign = 'Sagittarius';
		} 
		console.log('sign: ', sign);
		return sign;  
	};

	


///////// what the freak!!! changes the values within the user object...

	// var arrayToDivs = function(array) {
	// 	console.log('original array test: ', array);
	// 	var originalArray = array;
	// 	console.log('original array copy test: ', originalArray);
	// 	var arrayDiv = array;
	// 	for (var i = 0; i < arrayDiv.length - 1; i++) {
	// 		arrayDiv[i] = "<div class='words'> " + arrayDiv[i] + ", </div>";
	// 		console.log('arrayDiv[i] test: ', arrayDiv[i]);
	// 	}
	// 	arrayDiv[arrayDiv.length - 1] = "<div class='words'>" + arrayDiv[i] +"</div>";
	// 	console.log('ending array test array test: ', array);
	// 	console.log('ending copy test: ', originalArray);
	// 	return arrayDiv;
	// }


	//// rendering functions...

	var arrayToDivs = function(array) {
		if (array) {
			var originalArray = array;
			var newArray = [];
			for (var x = 0; x < originalArray.length; x++) {
				newArray.push(originalArray[x]);
			}
			for (var i = 0; i < newArray.length - 1; i++) {
				newArray[i] = "<div class='words'> " + newArray[i] + ", </div>";
			}
			newArray[newArray.length - 1] = "<div class='words'>" + newArray[i] +"</div>";
			return newArray;
		}
	};
	var divsToPage = function(element, array) {
		if (array) {
				$(element).text('');
			for (var i = 0; i < array.length; i++){
				$(element).append(array[i]);
			}
		}
	};

	var findUserById = function(userId){
			for (var i = 0; i < users.length; i++) {
				if (users[i].userId === userId) {
					return users[i];
				}
			}
		};






/////////// create user //////////////
	/////create id?

	var User = function(email, password) {
		this.email = email;
		this.password = password;
		this.photos = [];
		users.push(this);
	};

	User.prototype.render = function(){
		
		$('.name').text(this.name);
		$('.name').data('userId', this.userId);
		$('.location').text(this.location);
		var bandsArray = this.bands;
		var bandsRender = arrayToDivs(bandsArray);
		var bandsElement = '.bands';
		divsToPage(bandsElement, bandsRender);
		$('.profile-pic').css({backgroundImage: this.profilePic});
		$('.profile-top').css({backgroundImage: this.backgroundPic});
		var instrumentArray = this.instruments;
		var instrumentsRender = arrayToDivs(instrumentArray);
		var instrumentElement = '.instruments';
		divsToPage(instrumentElement, instrumentsRender);
		var stylesArray = this.styles;
		var stylesRender = arrayToDivs(stylesArray);
		var stylesElement = '.styles';
		divsToPage(stylesElement, stylesRender);
		var skillsArray = this.skills;
		var skillsRender = arrayToDivs(skillsArray);
		var skillsElement = '.skills';
		divsToPage(skillsElement, skillsRender);
		var inspirationsArray = this.inspirations;
		var inspirationsRender = arrayToDivs(inspirationsArray);
		var inspirationsElement = '.inspirations';
		divsToPage(inspirationsElement, inspirationsRender);
		$('.improv-comp').val(this.improvComp);
		$('.birthday').text(this.age);
		$('.astro-sign').text(this.astro);
		for (var i = 0; i < this.media.length; i++){
			$('.media').append(this.media[i]);
		}
		$('.about').text(this.about);
		$('.philosophy').text(this.philosophy);


	};

///this needs to be tested....
	User.prototype.addToBand = function(band){
		this.band = band;
		console.log('this: ');
		band.push(this);
		band.combineMemberInfo();
	};

	User.prototype.displayAsMember = function(){
				var pic = this.profilePic;
				pic = pic.split('"');
				pic = pic[1];
				this.memberElement = $('<div class="list-group results"><a href="#" class="list-group-item result-block"><img id="memberPic" class="search-profile-pic" src="' + pic + '"><div class="search-result-info"><h4 class="list-group-item-heading">' + this.name + '</h4><p class="list-group-item-text">Location: ' + this.location + '</p></div></a></div>');
				
				
				$('.member-container').append(this.memberElement);


				
				// $('.search-profile-pic').append('<img class="search-profile-pic" src="' + pic + '">');
				//$('#memberPic').css({backgroundImage: pic});
				// return this.memberElement;
			};

// User.prototype.displayAsMember = function(){
// 				this.memberElement = $('<div class="list-group results"><a href="#" class="list-group-item result-block"><div id="memberPic" class="search-profile-pic"></div><div class="search-result-info"><h4 class="list-group-item-heading">' + this.name + '</h4><p class="list-group-item-text">Location: ' + this.location + '</p></div></a></div>');
				
				
// 				$('.member-container').append(this.memberElement);


// 				var pic = this.profilePic;
// 				console.log('pic test: ', pic);
				
// 				pic = pic.split('"');
// 				pic = pic[1];
// 				console.log('pic transformed: ', pic);
// 				// $('.search-profile-pic').append('<img class="search-profile-pic" src="' + pic + '">');
// 				//$('#memberPic').css({backgroundImage: pic});
// 				// return this.memberElement;
// 			}

			


	User.prototype.displayResultsMusicians = function(){
		var pic = this.profilePic;
				pic = pic.split('"');
				pic = pic[1];
				this.searchElement = $('<div class="list-group results"><a href="#" class="list-group-item result-block"><img id="memberPic" class="search-profile-pic" src="' + pic + '"><div class="search-result-info"><h4 class="list-group-item-heading">' + this.name + '</h4><p class="list-group-item-text">Location: ' + this.location + '</p></div></a></div>');
				$('#search-results-musicians').append(this.searchElement);
				return this.searchElement;
			};

// User.prototype.displayResultsMusicians = function(){
// 				this.searchElement = $('<div class="list-group results"><a href="#" class="list-group-item result-block"><div class="search-profile-pic"></div><div class="search-result-info"><h4 class="list-group-item-heading">' + this.name + '</h4><p class="list-group-item-text">Location: ' + this.location + '</p></div></a></div>');
// 				$('#search-results-musicians').append(this.searchElement);
// 				return this.searchElement;
// 			}
			

////////////////////////////////////////
//// users and bands, current users
	var users = [];
	var currentUser;
	var bands = [];
	var currentBand;

	var Band = function(name) {
		this.name = name;
		bands.push(this);
		this.members = [];
		this.photos = [];

	};
	

Band.prototype.render = function(){
		
		$('.band-name').text(this.name);
		$('.band-location').text(this.location);
		$('.band-profile-pic').css({backgroundImage: this.profilePic});
		$('.band-profile-top').css({backgroundImage: this.backgroundPic});
		////// remove duplicates.......
		
		$('.band-improv-comp').val(this.improvComp);
		$('.band-birthdate').text(this.birthdate);
		for (var i = 0; i < this.media.length; i++){
			$('.band-media').append(this.media[i]);
		}
		for (var i = 0; i < this.members.length; i++) {
			this.members[i].displayAsMember();
		}
		$('.band-about').text(this.about);
		$('.band-philosophy').text(this.philosophy);


		this.combineMemberInfo();
		console.log('this band: ', this);

		var instrumentArray = this.instruments;
		var instrumentsRender = arrayToDivs(instrumentArray);
		var instrumentElement = '.band-instrumentation';
		divsToPage(instrumentElement, instrumentsRender);
		var stylesArray = this.styles;
		var stylesRender = arrayToDivs(stylesArray);
		var stylesElement = '.band-styles';
		divsToPage(stylesElement, stylesRender);
		var inspirationsArray = this.inspirations;
		var inspirationsRender = arrayToDivs(inspirationsArray);
		var inspirationsElement = '.band-inspirations';
		divsToPage(inspirationsElement, inspirationsRender);
	};

Band.prototype.combineMemberInfo = function() {
	console.log('this test: ', this);
	var combineInstruments = _.chain(this.members)
				.pluck('instruments')
				.flatten()
				.uniq()
				.value();
	this.instruments = combineInstruments;
	var combineStyles = _.chain(this.members)
				.pluck('styles')
				.flatten()
				.uniq()
				.value();
	this.styles = combineStyles;
	var combineInspirations = _.chain(this.members)
				.pluck('inspirations')
				.flatten()
				.uniq()
				.value();
	this.inspirations = combineInspirations;
};
	
Band.prototype.displayResultsBands = function(){var pic = this.profilePic;
				pic = pic.split('"');
				pic = pic[1];
				this.searchElement = $('<div class="list-group results"><a href="#" class="list-group-item result-block"><img id="memberPic" class="search-profile-pic" src="' + pic + '"><div class="search-result-info"><h4 class="list-group-item-heading">' + this.name + '</h4><p class="list-group-item-text">Location: ' + this.location + '</p></div></a></div>');
				$('#search-results-bands').append(this.searchElement);
				return this.searchElement;
			};



////////////////////////////////////////////////////////////////////////
////////////////////// profile page///////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////// profile page///////////////////////////////




//////// photo gallery

	var gallery = $('<div class="gallery-background"><div class="gallery"><h3 class="gallery-heading">Photo Gallery</h3></div></div>');

	$(document).on('click', '.view-gallery', function(){
		$('.container').append(gallery);
	});


	

	/////////////// Profile-user edit//////////////////////////////
////////////////////////////////////////////////////////////////////////


////////// embedding media

	$('.edit-directions').hide();
	var embedEdit = $('<div class="info-block embed-info-block"><h5 class="info-block-heading embed-heading">Embed Media</h5><div class="embed-info">Here you can embed media from other sites including Soundcloud, Youtube, CDBaby, and any other site that provides the iframe code for media. Click on share, and there you will find an embed link. (Make sure that http:// is in the code.)</div><form id="embed-form" class="form-horizontal" role="form"><div class="form-group"><label for="code" class="col-sm-2 control-label">Embed Code:</label><div class="col-sm-10"><input type="text" class="form-control" name="code" ></div></div><div class="form-group"><div class="col-sm-offset-2 col-sm-10"><button type="submit" class="btn btn-success btn-xs">Embed</button></div></div></form></div>');

	$(document).on('click', '.embed-media-button', function(){
		
		$('.media').before(embedEdit);
		$('.embed-media-button').hide();
	});

	$(document).on('submit', '#embed-form', function(e){
		e.preventDefault();
		$(embedEdit).hide();
		$('.embed-media-button').show();
		var form = $(e.target);
		var media = form.find('[name=code]').val();
		$('.media').append(media);
		var userId = $('.name').data();
		userId = userId.userId;
		var thisUser = findUserById(userId);
		thisUser.media.push(media);


		//////////////////////// add new media to user by id?????
	});


//// edit profile clicker

	$(document).on('click', '.edit-profile', function(){
		// $('.edit-directions').show();
		var userInfo = [$('.bands'), $('.instruments'), $('.styles'), $('.skills'), $('.inspirations')];
		userInfo.map(function(info){
			var attr = info.closest('.sidebar-list').attr('title');
			console.log('info attr: ', attr);
			info.text(user[attr]);
			var infoArray = info.text().split(', ');

			info.empty();
			console.log('infoArray: ', infoArray);
			infoArray.map(function(item){
				var testX = item.split('').pop();
				if (testX === 'X'){
					item = item.substring(0, item.length - 1);
				}
				info.append('<div class="words editing-profile edit">' + item +'</div>');
			});
		});
		// $(this).closest('.sidebar-list-text').append('<div class="words editing-profile edit">' + $(this).val() +'</div>');
		$('.words').append('<button class="btn btn-default btn-xs delete-word">X</button>');
		$('.words, .about, .philosophy').addClass('editing-profile edit');
		$('.name, .location, .band').addClass('edit');
		$('.sidebar-list-text').addClass('editing-profile');
		$('.name-loc').addClass('edit-name-loc');
		$('.edit-profile').removeClass('edit-profile btn-xs').addClass('edit-done btn-md').text('Done Editing');
		$('.media').before(embedEdit);
		$(embedEdit).show();
		$('.profile-pic').append('<span class="glyphicon glyphicon-picture make-it-white edit-icon-profile">Change-Photo</span>');
		$('.profile-top').append('<span class="glyphicon glyphicon-picture make-it-white edit-icon-background">Change-Background</span>');
		$(this).blur();
		$('.ratio-graph').hide();
		$('.ratio-graph').after('<input type="range" id="edit-ratio">');
		$('.sidebar-list-text').append('<input type="text" class="add-new-word editing-profile edit" placeholder="Add New...">');
		

	$(document).on('blur', '.add-new-word', function(){
		var val = $(this).val();
		var attr = $(this).closest('.sidebar-list').attr('title');
		console.log('attr: ', attr);
		$(this).closest('.sidebar-list-text').append('<div class="words editing-profile edit">' + $(this).val() +'</div>');
		$(this).closest('.sidebar-list-text').find('.words').last().append('<button class="btn btn-default btn-xs delete-word">X</button>');
		$(this).closest('.sidebar-list-text').append('<input type="text" class="add-new-word editing-profile edit" placeholder="Add New...">');
		///// hacked way of getting info...
		var updatedInfo = $(this).closest('.sidebar-list-text').text().split('X');
		updatedInfo.pop();
		updatedInfo = updatedInfo.join(', ');
		console.log('updatedInfo: ', updatedInfo);
		user[attr]= updatedInfo;
		console.log(user);

		// user[attr].push(val);

		$(this).remove();
	});



	$(document).on('click', '.delete-word', function(){
		console.log('find name of value by title: ', $(this).closest('p').attr('title'));
		var val = $(this).closest('.words').text().split(',').shift().split('X').pop();
		var attr = $(this).closest('p').attr('title');
		console.log('val', val);
		console.log('attr', attr);
		console.log('thisuser:', thisUser);
		var array = thisUser[attr];
		console.log('array: ', array);
		console.log('array index of', array.indexOf(val));
		$(this).closest('.words').remove();
		
	});

	$(document).on('click', '.edit', function(){
		$(this).attr('contenteditable', 'true');
		$(this).focus();

	});

	$('.about, .philosophy').on('blur', function(){
		var attr = $(this).closest('.info-block').attr('title');
		var text = $(this).text();
		user[attr] = text;
		console.log('user updated about philosophy: ', user);
	});
	

	// $(document).on('blur', '.current-edit', function(){
	// 	console.log('find name of value by title: ', $(this).closest('p').attr('title'));
	// 	var updatedText = $(this).val();
	// 	var textToUpdate = $(this).prev();
	// 	$(textToUpdate).show();
	// 	$(textToUpdate).text(updatedText);
	// 	$(this).empty();
	// 	$(this).hide();
	// 	$(this).removeClass('current-edit');

	// })


  	
  	$(document).on('click', '.edit-done', function(){
  		$('.edit').attr('contenteditable', 'false');
		$('.sidebar-list-text, .words, .name-loc, .about, .philosophy').removeClass('editing-profile edit');
		$('.edit-done').addClass('edit-profile btn-xs').removeClass('edit-done btn-md').text('Edit Profile');
		$('.name, .location, .band').removeClass('edit');
		$('.name-loc').removeClass('edit-name-loc');
		$(embedEdit).hide();
		$('.edit-icon').hide();
		$('.edit-directions').hide();
		$('.edit-icon-profile').hide();
		$('.edit-icon-background').hide();
		$('.delete-word').hide();
		$('.ratio-graph').show();
		// var orientation = $('#edit-ratio').val(); /////////// send this to user info...
		var ratioValue = $('#edit-ratio').val() * 2;
		console.log('ratioValue: ', ratioValue);
		$('#ratio-bar').css({
			width: ratioValue
		});
		$('#edit-ratio').hide();
		$('.add-new-word').remove();
		$.post('/api/updateUserProfile', user, function(responseData){
			console.log('responseData: ', responseData);
		});
	});

});

$('#btn-connect').on('click', function(){
	console.log('click');
	$.post('/addUserToTribe', {}, function(responseData){
		console.log('responseData: ', responseData);
	});
});

















});