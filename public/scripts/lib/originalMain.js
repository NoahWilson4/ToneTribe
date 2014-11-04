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
			var sign = 'Scorpio';
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
	}
	var divsToPage = function(element, array) {
		if (array) {
				$(element).text('');
			for (var i = 0; i < array.length; i++){
				$(element).append(array[i]);
			}
		}
	}

	var findUserById = function(userId){
			for (var i = 0; i < users.length; i++) {
				if (users[i].userId === userId) {
					return users[i];
				}
			}
		}






/////////// create user //////////////
	/////create id?

	var User = function(email, password) {
		this.email = email;
		this.password = password;
		this.photos = [];
		users.push(this);
	}

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
		$('.astro-sign').text(this.astro)
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
	}

	User.prototype.displayAsMember = function(){
				var pic = this.profilePic;
				pic = pic.split('"');
				pic = pic[1];
				this.memberElement = $('<div class="list-group results"><a href="#" class="list-group-item result-block"><img id="memberPic" class="search-profile-pic" src="' + pic + '"><div class="search-result-info"><h4 class="list-group-item-heading">' + this.name + '</h4><p class="list-group-item-text">Location: ' + this.location + '</p></div></a></div>');
				
				
				$('.member-container').append(this.memberElement);


				
				// $('.search-profile-pic').append('<img class="search-profile-pic" src="' + pic + '">');
				//$('#memberPic').css({backgroundImage: pic});
				// return this.memberElement;
			}

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
			}

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

	}
	

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


		this.combineMemberInfo()
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
}
	
Band.prototype.displayResultsBands = function(){var pic = this.profilePic;
				pic = pic.split('"');
				pic = pic[1];
				this.searchElement = $('<div class="list-group results"><a href="#" class="list-group-item result-block"><img id="memberPic" class="search-profile-pic" src="' + pic + '"><div class="search-result-info"><h4 class="list-group-item-heading">' + this.name + '</h4><p class="list-group-item-text">Location: ' + this.location + '</p></div></a></div>');
				$('#search-results-bands').append(this.searchElement);
				return this.searchElement;
			}


//////////////////////////////////////////
	$(document).on('click', '#navbar-search', function(){
		var url = "search-and-results.html";
		window.location = url;
	})


//////////////////////////////////////////
//   ///////// cover page

	// $('#tune-in').on('submit', function(e){
	// 	e.preventDefault();
	// 	var form = $(e.target);
	// 	var email = form.find('[name=email]');
	// 	var password = form.find('[name=password]');
	// 	var url = "profile-user-prepopulated.html";
	// 	window.location = url;
	// })

	$('.join').on('click', function(){
		var url = "signup.html";
		window.location = url;

	})

// /////////// Sign up page
	
	var enterInfo = $('<div class="enter-info"><h1 class="enter-info-heading">enter info</h1></div>');

	$('#new-user-form').on('submit', function(e){
		e.preventDefault();
		var form = $(e.target);
		var name = form.find('[name=new-user]').val();
		var email = form.find('[name=new-email]').val();
		var password = form.find('[name=new-password]').val();
		var newUser = new User(name, email, password);
		users.push(newUser);
		currentUser = newUser;
		$('#new-user-form').hide();
		$('.sign-up-page').append(editPopupShell);
		$('.enter-info').append(editFormWhich, editFormBasicInfo, editFormBandBasicInfo, editFormMusicalInfo, editFormBandMusicalInfo, editFormPics, editFormBandPics, editFormAbout, editFormBandAbout);
		$('.edit-pagination').append(editFormButtonsBasic, editFormButtonsBandBasic, editFormButtonsMusicInfo, editFormButtonsBandMusicalInfo, editFormButtonsPics, editFormButtonsBandPics, editFormButtonsAbout, editFormButtonsBandAbout);
		$(editFormBasicInfo).hide();
		$(editFormBandBasicInfo).hide();
		$(editFormMusicalInfo).hide();
		$(editFormBandMusicalInfo).hide();
		$(editFormPics).hide();
		$(editFormBandPics).hide();
		$(editFormAbout).hide();
		$(editFormBandAbout).hide();
		$(editFormButtonsBasic).hide();
		$(editFormButtonsBandBasic).hide();
		$(editFormButtonsMusicInfo).hide();
		$(editFormButtonsBandMusicalInfo).hide();
		$(editFormButtonsPics).hide();
		$(editFormButtonsBandPics).hide();
		$(editFormButtonsAbout).hide();
		$(editFormButtonsBandAbout).hide();
		
	});

	// //////// edit popup

	


 var editPopupShell = $('<div class="edit-popup"><div class="enter-info-heading"><h2>Create Profile</h2></div><div class="enter-info"></div><div class="edit-pagination"></div></div>');

 var editFormWhich = $('<h3>Is this for an Individual or Band?</h3><button class="which is-individual btn btn-success">Individual</button><button class="which is-band btn btn-success">Band</button>');

$(document).on('click', '.is-individual', function(){
	$(editFormWhich).hide();
 	$(editFormBasicInfo).show();
 	$(editFormButtonsBasic).show();
});

$(document).on('click', '.is-band', function(){
	$(editFormWhich).hide();
 	$(editFormBandBasicInfo).show();
 	$(editFormButtonsBandBasic).show();
});

// /////////////  basic info

 var editFormBasicInfo = $('<h3>Basic Info</h3><form id="edit-profile-form" class="form-horizontal" role="form"><div class="form-group"><h4>Name</h4><div class="col-sm-10"><input type="text" name="name" class="form-control" class="edit-input" placeholder="Your Name..."></div></div><div class="form-group"><h4>Location</h4><div class="col-sm-10"><input type="text" name="location" class="form-control" class="edit-input" placeholder="Your Location..."></div></div><div class="form-group"><h4>Alias/Bandname</h4><div class="col-sm-10"><input type="text" name="alias" class="form-control" class="edit-input" placeholder="Alias/Bandname..."></div></div><div class="form-group"><h4>Birthdate</h4><div class="col-sm-10"><input type="date" id="birthdate" class="form-control" class="edit-input" placeholder=""></div><div id="#birth-date-info"></div></div></form>');

 var editFormButtonsBasic = $('<button class="previous previous-which btn btn-success btn-sm">Previous</button><button class="next next-musicInfo btn btn-success btn-sm">Next</button>');

 

 $(document).on('blur', '#birthdate', function(){
 	$('#birth-date-info').empty();
 	var birthdate = $('#birthdate').val();
 	var ageConverted = ageConvert(birthdate);
 	console.log('ageConverted: ', ageConverted);///////////////// add age and birthdate to user...
 	var astroSign = astroConvert(birthdate);
 	console.log('astro: ', astroSign);//////////////////// add sign
 	var ageInfo = $("<h4>Age: " + ageConverted + ", " + astroSign + "</h4>");
 	$(editFormBasicInfo).append(ageInfo);
 })

 $(document).on('click', '.previous-which', function(){
 	$(editFormBasicInfo).hide();
 	$(editFormButtonsBasic).hide();
 	$(editFormWhich).show();
 });

 $(document).on('click', '.next-musicInfo', function(){
 	$(editFormBasicInfo).hide();
 	$(editFormButtonsBasic).hide();
 	$(editFormMusicalInfo).show();
 	$(editFormButtonsMusicInfo).show();
 });

 var editFormBandBasicInfo = $('<h3>Basic Info</h3><form id="edit-profile-form" class="form-horizontal" role="form"><div class="form-group"><h4>Band Name:</h4><div class="col-sm-10"><input type="text" name="name" class="form-control" class="edit-input" placeholder="Band Name..."></div></div><div class="form-group"><h4>Location:</h4><div class="col-sm-10"><input type="text" name="location" class="form-control" class="edit-input" placeholder="Your Location..."></div></div><div class="form-group"><h4>Have Played Together Since:</h4><div class="col-sm-10"><input type="date" name="birthdate" class="form-control" class="edit-input" placeholder=""></div></div></form>');


 var editFormButtonsBandBasic = $('<button class="previous previous-which btn btn-success btn-sm">Previous</button><button class="next next-band-musicInfo btn btn-success btn-sm">Next</button>');

 $(document).on('click', '.previous-which', function(){
 	$(editFormBandBasicInfo).hide();
 	$(editFormWhich).show();
 	$(editFormButtonsBandBasic).hide();
 });

 $(document).on('click', '.next-band-musicInfo', function(){
 	$(editFormBandBasicInfo).hide();
 	$(editFormBandMusicalInfo).show();
 	$(editFormButtonsBandMusicalInfo).show();
 });

////// Musical Info /////////////////////////////////

var editFormMusicalInfo = $('<h3>Musical Info</h3><form id="edit-profile-form" class="form-horizontal" role="form"><div class="form-group"><h4>Instruments:</h4><div class="col-sm-10"><input type="text" name="instruments" class="form-control edit-input" placeholder="Instruments you play..."></div></div><div class="form-group"><h4>Styles:</h4><div class="col-sm-10"><input type="text" name="styles" class="form-control edit-input" placeholder="Styles you play..."></div></div><div class="form-group"><h4>Skills:</h4><div class="col-sm-10"><input type="text" name="skills" class="form-control edit-input" placeholder="Other music related skills..."></div></div><div class="form-group"><h4>Inspired By:</h4><div class="col-sm-10"><input type="text" name="inspirations" class="form-control edit-input" placeholder="Who inspires you..."></div></div><div class="form-group"><h4>Impovisational/Compositional Orientation:</h4><div class="col-sm-10"><input type="range" min="0" max="100" name="orientation" class="form-control edit-input"></div></div></form>');

var editFormButtonsMusicInfo = $('<button class="previous previous-basicInfo btn btn-success btn-sm">Previous</button><button class="next next-pics btn btn-success btn-sm">Next</button>');

$(document).on('click', '.previous-basicInfo', function(){
 	$(editFormMusicalInfo).hide();
 	$(editFormButtonsMusicInfo).hide();
 	$(editFormBasicInfo).show();
 	$(editFormButtonsBasic).show();
 });
$(document).on('click', '.next-pics', function(){
 	$(editFormMusicalInfo).hide();
 	$(editFormButtonsMusicInfo).hide();
 	$(editFormPics).show();
 	$(editFormButtonsPics).show();
 });

var editFormBandMusicalInfo = $('<h3>Musical Info</h3><form id="edit-profile-form" class="form-horizontal" role="form"><div class="form-group"><h4>Members:</h4><div class="col-sm-10"><input type="text" name="members" class="form-control edit-input" placeholder="Members..."></div></div><div class="form-group"><h4>Instrumentation:</h4><div class="col-sm-10"><input type="text" name="instruments" class="form-control edit-input" placeholder="Band Instrumentation..."></div></div><div class="form-group"><h4>Styles:</h4><div class="col-sm-10"><input type="text" name="styles" class="form-control edit-input" placeholder="Styles you play..."></div></div><div class="form-group"><h4>Inspired By:</h4><div class="col-sm-10"><input type="text" name="inspirations" class="form-control edit-input" placeholder="Who inspires you..."></div></div><div class="form-group"><h4>Impovisational/Compositional Orientation:</h4><div class="col-sm-10"><input type="range" min="0" max="100" name="orientation" class="form-control edit-input"></div></div></form>');

var editFormButtonsBandMusicalInfo = $('<button class="previous previous-band-basicInfo btn btn-success btn-sm">Previous</button><button class="next next-band-pics btn btn-success btn-sm">Next</button>');

$(document).on('click', '.previous-band-basicInfo', function(){
 	$(editFormBandMusicalInfo).hide();
 	$(editFormButtonsBandMusicalInfo).hide();
 	$(editFormBandBasicInfo).show();
 	$(editFormButtonsBandBasic).show();
 });
$(document).on('click', '.next-band-pics', function(){
 	$(editFormBandMusicalInfo).hide();
 	$(editFormButtonsBandMusicalInfo).hide();
 	$(editFormBandPics).show();
 	$(editFormButtonsBandPics).show();
 });

///////// pics ////////////////////////////////////

 var editFormPics = $('<h3>Profile pics</h3><form id="edit-profile-form" class="form-horizontal" role="form"><div class="profile-pic-div"><img class="profile-pic-position" src="http://placehold.it/150x150"><div class="form-group choose-pic"><h4>Profile Pic</h4><div class="col-sm-10"><input type="file" name="profilePic" class="form-control" class="edit-input"></div></div></div><div class="background-pic-div"><div class="background-image-holder" src="http://placehold.it/250x110"></div><div class="form-group"><h4>Background Pic</h4><div class="col-sm-10"><input type="file" name="BackgroundPic" class="form-control choose-pic" class="edit-input"></div></div></div></form></div>');

 var editFormButtonsPics = $('<button class="previous previous-musicInfo btn btn-success btn-sm">Previous</button><button class="next next-about btn btn-success btn-sm">Next</button>');

 $(document).on('click', '.previous-musicInfo', function(){
 	$(editFormPics).hide();
 	$(editFormButtonsPics).hide();
 	$(editFormMusicalInfo).show();
	$(editFormButtonsMusicInfo).show();
 });
$(document).on('click', '.next-about', function(){
 	$(editFormPics).hide();
 	$(editFormButtonsPics).hide();
 	$(editFormAbout).show();
	$(editFormButtonsAbout).show();
 });

var editFormBandPics = $('<h3>Profile pics</h3><form id="edit-profile-form" class="form-horizontal" role="form"><div class="profile-pic-div"><img class="profile-pic-position" src="http://placehold.it/150x150"><div class="form-group choose-pic"><h4>Profile Pic</h4><div class="col-sm-10"><input type="file" name="profilePic" class="form-control" class="edit-input"></div></div></div><div class="background-pic-div"><div class="background-image-holder"></div><div class="form-group"><h4>Background Pic</h4><div class="col-sm-10"><input type="file" name="BackgroundPic" class="form-control choose-pic" class="edit-input"></div></div></div></form></div>');

 var editFormButtonsBandPics = $('<button class="previous previous-band-musicInfo btn btn-success btn-sm">Previous</button><button class="next next-band-about btn btn-success btn-sm">Next</button>');

 $(document).on('click', '.previous-band-musicInfo', function(){
 	$(editFormBandPics).hide();
 	$(editFormButtonsBandPics).hide();
 	$(editFormBandMusicalInfo).show();
	$(editFormButtonsBandMusicalInfo).show();
 });
$(document).on('click', '.next-band-about', function(){
 	$(editFormBandPics).hide();
 	$(editFormButtonsBandPics).hide();
 	$(editFormBandAbout).show();
	$(editFormButtonsBandAbout).show();
 });

//////////// about //////////////////////////////////

var editFormAbout =$('<h3>About</h3><form id="edit-profile-form" class="form-horizontal" role="form"><div class="form-group"><h4>About:</h4><div class="col-sm-10"><textarea type="text" name="about" class="form-control edit-input" placeholder="Tell us about you and your musical endeavors..."></textarea></div></div><div class="form-group"><h4>Philosophy:</h4><div class="col-sm-10"><textarea type="text" name="philosophy" class="form-control edit-input" placeholder="Tell us about your philosophy on music..."></textarea></div></div><div class="form-group"><h4>Eneagram Personality Type:</h4><div class="col-sm-10"><input type="number" name="personality" class="form-control edit-input number-input" min="1" max="9"><button type="button" class="btn btn-default btn-xs" data-container="body" data-toggle="popover" data-placement="right" data-content="The Eneagram is a personality test that is incredibly intuitive and spot on with describing personalities. It is a way of determining how your personality will mesh with the personalities of the musicians you connect with on ToneTribe.  It is also helpful for your own self-knowledge.">?</button></div></form>');

var editFormButtonsAbout = $('<button class="previous previous-pics btn btn-success btn-sm">Previous</button><button class="next done btn btn-success btn-sm">Done</button>');

$(document).on('click', '.previous-pics', function(){
 	$(editFormAbout).hide();
 	$(editFormButtonsAbout).hide();
 	$(editFormPics).show();
	$(editFormButtonsPics).show();
 });

$(document).on('click', '.done', function(){
		$(editPopupShell).hide();
		var url = "profile-user.html";
		window.location = url;

	});

var editFormBandAbout =$('<h3>About</h3><form id="edit-profile-form" class="form-horizontal" role="form"><div class="form-group"><h4>About:</h4><div class="col-sm-10"><textarea type="text" name="about" class="form-control edit-input" placeholder="Tell us about you and your musical endeavors..."></textarea></div></div><div class="form-group"><h4>Philosophy:</h4><div class="col-sm-10"><textarea type="text" name="philosophy" class="form-control edit-input" placeholder="Tell us about your philosophy on music..."></textarea></div></div></form>');

var editFormButtonsBandAbout = $('<button class="previous previous-band-pics btn btn-success btn-sm">Previous</button><button class="next band-done btn btn-success btn-sm">Done</button>');

$(document).on('click', '.previous-band-pics', function(){
 	$(editFormBandAbout).hide();
 	$(editFormButtonsBandAbout).hide();
 	$(editFormBandPics).show();
	$(editFormButtonsBandPics).show();
 });

$(document).on('click', '.band-done', function(){
		$(editPopupShell).hide();
		var url = "band-profile-user.html";
		window.location = url;

	});




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
	})

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
	})


//// edit profile clicker

	$(document).on('click', '.edit-profile', function(){
		// $('.edit-directions').show();
		$('.words').append('<button class="btn btn-default btn-xs delete-word">X</button>');
		$('.words, .about, .philosophy').addClass('editing-profile edit');
		$('.name, .location, .band').addClass('edit');
		$('.sidebar-list-text').addClass('editing-profile');
		$('.name-loc').addClass('edit-name-loc');
		$('#edit').removeClass('edit-profile btn-xs').addClass('edit-done btn-md').text('Done Editing');
		$('edit-directions').show();
		$('.media').before(embedEdit);
		$(embedEdit).show();
		$('.profile-pic').append('<span class="glyphicon glyphicon-picture make-it-white edit-icon-profile">Change-Photo</span>');
		$('.profile-top').append('<span class="glyphicon glyphicon-picture make-it-white edit-icon-background">Change-Background</span>');
		$(this).blur();
		$('.ratio-graph').hide();
		$('.ratio-graph').after('<input type="range" id="edit-ratio">');
		$('.sidebar-list-text').append('<input type="text" class="add-new-word editing-profile edit" placeholder="Add New...">');
		var userId = $('.name').data();
		userId = userId.userId;
		var thisUser = findUserById(userId);
		console.log('this user: ', thisUser);
	
//title attribute search needs to be fixed for name and location..........

	$(document).on('blur', '.add-new-word', function(){
		console.log('find name of value by title: ', $(this).closest('p').attr('title'));
		var val = $(this).val();
		var attr = $(this).closest('p').attr('title');
		thisUser[attr].push(val);
		console.log('thisUser new info added test: ', thisUser);
		$(this).closest('.sidebar-list-text').append('<div class="words editing-profile edit">' + $(this).val() +'</div>');
		$(this).closest('.sidebar-list-text').find('.words').last().append('<button class="btn btn-default btn-xs delete-word">X</button>');
		$(this).closest('.sidebar-list-text').append('<input type="text" class="add-new-word editing-profile edit" placeholder="Add New...">');
		$(this).remove();
	})



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
		
		
		console.log('thisUser new info added test: ', thisUser);


		$(this).closest('.words').remove();
		
	})

	$(document).on('click', '.edit', function(){
		$(this).attr('contenteditable', 'true');
		$(this).focus();

	});

	$(document).on('blur', '.edit', function(){
		console.log('find name of value by title: ', $(this).closest('p').attr('title'));
		var attr = $(this).closest('p').attr('title');
		console.log('attr blur .edit', attr);
		

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
		$('#edit').addClass('edit-profile btn-xs').removeClass('edit-done btn-md').text('Edit Profile');
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
		})
		$('#edit-ratio').hide();
		$('.add-new-word').remove();
	})

});
//////// finish with editing user/////
///////////////////////////////////////////////
////////////   search pages //////////////////////////////////
////////////   search pages //////////////////////////////////
////////////   search pages //////////////////////////////////
////////////   search pages //////////////////////////////////
////////////   search pages //////////////////////////////////


// var isDuplicate = function(array) {
// 		for (var z = 0; z < array.length; z++) {
// 			var idSearch = array[z];
// 			if (idSearch.userId === user.userId) {
// 				return true;
// 			} else {
// 				return false;
// 			}
// 		}
// 	};


// var propertySearch = function(property, value){
// 	//////// users ////////////
// 	console.log('prop search......');
// 	console.log('property, value', property, value);
// 	$.post('/api/findUsers',)
// 		for (var i = 0; i < users.length; i++) {
// 			var user = users[i];
// 			var userProp = user[property];
// 			if ($.isArray(userProp) === true) {
// 				var propertyArray = lowerCase(userProp);
// 				var isDuplicate = false;
// 						for (var z = 0; z < positiveResults.length; z++) {
// 							var idSearch = positiveResults[z];
// 							if (idSearch.userId === user.userId) {
// 								isDuplicate = true;
// 							}
// 						}
// 						if ( isDuplicate === false){
// 							positiveResults.push(users[i]);
// 						}						
// 			} else {
// 				var userProp = lowerCase(userProp);
// 				if (userProp === value) {
// 					var isDuplicate = false;
// 						for (var z = 0; z < positiveResults.length; z++) {
// 							var idSearch = positiveResults[z];
// 							if (idSearch.userId === user.userId) {
// 								isDuplicate = true;
// 							}
// 						}
// 						if ( isDuplicate === false){
// 							positiveResults.push(users[i]);
// 						}						
// 				}
// 			}
// 		}
// 	////// bands //////////
// 		for (var i = 0; i < bands.length; i++) {
// 			var band = bands[i];
// 			var bandProp = band[property];
// 			if ($.isArray(bandProp) === true) {
// 				console.log('band array being searched');
// 				var propertyArray = lowerCase(bandProp);
// 				var isDuplicate = false;
// 						for (var z = 0; z < positiveResultsBands.length; z++) {
// 							var idSearch = positiveResultsBands[z];
// 							if (idSearch.bandId === band.bandId) {
// 								isDuplicate = true;
// 							}
// 						}
// 						if ( isDuplicate === false){
// 							positiveResultsBands.push(bands[i]);
// 						}						
// 			} else {
// 				var bandProp = lowerCase(bandProp);
// 				if (bandProp === value) {
// 					var isDuplicate = false;
// 						for (var z = 0; z < positiveResultsBands.length; z++) {
// 							var idSearch = positiveResultsBands[z];
// 							if (idSearch.bandId === band.bandId) {
// 								isDuplicate = true;
// 							}
// 						}
// 						if ( isDuplicate === false){
// 							positiveResultsBands.push(bands[i]);
// 						}						
// 				}
// 			}
// 		}
// 	};


// 	var positiveResultsBands = [];
// 	var positiveResultsFinalBands = [];

// 	var positiveResults = [];
// 	var positiveResultsFinal = [];
	
// 	$('#submitSearch').on('submit', function(e){
// 		console.log('submitted...');
// 		$('.search-result-info').hide();
// 		$('#search-results-musicians').empty();
// 		$('#search-results-bands').empty();
// 		e.preventDefault();
// 		var form = $(e.target);
// 		var searchedFor = [];
// 		var searchedForValue = [];
// 		form.find('.searchInput')
// 			.map(function() {
// 			return {
// 				name: $(this).attr('name'),
// 				value: lowerCase($(this).val())
// 				}
// 				})
// 				.toArray()
// 				.filter(function(searchObject) {
// 					return searchObject.value;
// 				})
// 				.forEach(function(searchObject) {
// 					searchedFor.push(searchObject.name);
// 					searchedForValue.push(searchObject.value);
// 					// propertySearch(searchObject.name, searchObject.value);
// 				});
// 		console.log('searchedForValue: ', searchedForValue);
// 		console.log('searchedFor: ', searchedFor);
// 		console.log('positiveResults: ', positiveResults);
// 		console.log('positiveResultsBands', positiveResultsBands);
// 		var searchFor = {
// 			searchedFor: searchedFor, 
// 			searchedForValue: searchedForValue
// 		};
// 		console.log('searchFor: ', searchFor);

// 		$.ajax({
// 			type: 'POST',
// 			url: '/api/findUsers',
// 			traditional: true,
// 			data: searchFor
// 		})

// 		// $.post('/api/findUsers', searchFor, function(err, result){
// 		// 	console.log('result: ', result);
// 		// })

// 	///// users /////////
// 		for (var i = 0; i < positiveResults.length; i++) {
// 			var userToQualify = positiveResults[i];
// 			var matches = 0;

// 			for (var x = 0; x < searchedFor.length; x++){
							
// 				var key = searchedFor[x];
// 				var value = searchedForValue[x];
// 				var userKey = userToQualify[key];

// 				if ( $.isArray(userKey)) {
// 					for (var z = 0; z < userKey.length; z++) {
// 						if (userKey[z] === value) {
// 					matches++;
// 						}
// 					}
// 				}
// 				var userValue = userToQualify[key];
// 				userValue = lowerCase(userValue);
// 				if ( userValue === value ) {
// 					matches++;
// 				}
// 				if (matches === searchedFor.length) {
// 					positiveResultsFinal.push(positiveResults[i]);
// 				}
// 			}	
// 		};
// 	///// bands /////////
// 		for (var i = 0; i < positiveResultsBands.length; i++) {
// 			var userToQualify = positiveResultsBands[i];
// 			console.log('band to qualify test: ', userToQualify);
// 			var matches = 0;

// 			for (var x = 0; x < searchedFor.length; x++){
							
// 				var key = searchedFor[x];
// 				var value = searchedForValue[x];
// 				var userKey = userToQualify[key];
// 				console.log('searchedFor test: ', searchedFor);
// 				console.log('searchedForValue test: ', searchedForValue);
// 				console.log('band to qualify key test: ', userKey);

// 				if ( $.isArray(userKey)) {
// 					for (var z = 0; z < userKey.length; z++) {
// 						if (userKey[z] === value) {
// 					matches++;
// 						}
// 					}
// 				}
// 				var userValue = userToQualify[key];
// 				userValue = lowerCase(userValue);
// 				if ( userValue === value ) {
// 					matches++;
// 				}
// 				if (matches === searchedFor.length) {
// 					positiveResultsFinalBands.push(positiveResultsBands[i]);
// 				}
// 			}	
// 		};

// 		console.log('positiveResultsFinal: ', positiveResultsFinal);
// 		console.log('positiveResultsFinalBands', positiveResultsFinalBands);
			

// /////// search page rendering and displaying results ////////

// 			$('.search-results').show();
// 			$('.search-form').hide();
	
			

// 			for (var i = 0; i < positiveResultsFinal.length; i++){
// 				var result = positiveResultsFinal[i];
// 				result.displayResultsMusicians();
// 			}
// 			if (positiveResultsFinal.length < 1 && positiveResultsFinalBands < 1) {
// 				$('.search-result-info').show();
// 			}

// 			for (var i = 0; i < positiveResultsFinalBands.length; i++){
// 				var result = positiveResultsFinalBands[i];
// 				result.displayResultsBands();
// 			}
// 			// if (positiveResultsFinalBands.length < 1) {
// 			// 	$('#search-results-container').prepend('<div class="list-group results"</div><div class="search-result-info"><h4 class="list-group-item-heading">No results found.</h4></div>')
// 			// }

// 	});
// 	// $('.search-results').hide();

// 	$(document).on('click', '.search-again', function(){
// 		// $('.search-results').hide();
// 		// $('.search-results-container').empty();
// 		positiveResults = [];
// 		positiveResultsFinal = [];
// 		positiveResultsBands = [];
// 		positiveResultsFinalBands = [];
// 		$('.search-form').show();
// 		$('input').val('');
// 	})






////////////// premade users ////////////////////////
////////////// premade users ////////////////////////
////////////// premade users ////////////////////////
////////////// premade users ////////////////////////
////////////// premade users ////////////////////////
////////////// premade users ////////////////////////
////////////// premade users ////////////////////////


// var users = [];


// var noahWilson = new User('behearnowmusic@gmail.com', 'nrw4radi8');
// 	noahWilson.userId = 1;
// 	noahWilson.name = 'Noah Wilson';
// 	noahWilson.location = 'Boulder, CO';
// 	noahWilson.bands = ['AyaIris'];
// 	noahWilson.profilePic = 'url("profilepic.jpg")';
// 	noahWilson.backgroundPic = 'url("backgroundpic.jpg")'; 
// 	noahWilson.instruments = ['Sitar', 'Hammered Dulcimer', 'Bass', 'Guitar', 'Dilruba', 'Electronics'];
// 	noahWilson.styles = ['Hindustani', 'Tribal Trance', 'Meditation', 'Kirtan'];
// 	noahWilson.skills = ['Audio Engineering', 'Mixing', 'Mastering', 'Web Design', 'Producing', 'Live Sound'];
// 	noahWilson.inspirations = ['Nikhil Banerjee', 'Ali Akbar Khan', 'Philip Glass', 'Shpongle', 'Bluetech', 'Tinariwen'];
// 	noahWilson.improvComp = 20;
// 	noahWilson.birthdate = '05/24/1985';
// 	noahWilson.age = 29;
// 	noahWilson.astro = 'Gemini';
// 	noahWilson.eneagram = 9;
// 	noahWilson.about = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, enim nobis doloribus alias, dolores eveniet natus pariatur necessitatibus dolorem vero ratione, error deserunt excepturi reiciendis cupiditate provident unde eius consequuntur.';
// 	noahWilson.philosophy = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, enim nobis doloribus alias, dolores eveniet natus pariatur necessitatibus dolorem vero ratione, error deserunt excepturi reiciendis cupiditate provident unde eius consequuntur.';
// 	noahWilson.media = ['<iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/170610719&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>', '<iframe name="full" style="width:100%;height:520px;border:0px;" src="http://widget.cdbaby.com/3138247b-4257-43aa-8ccc-142fbfe8396e/full/light/opaque">', '<iframe width="560" height="315" src="http://www.youtube.com/embed/V1IpKbmdx0Q" frameborder="0" allowfullscreen></iframe>'];






// var newDude = new User('email@gmail.com', 'lkdlkfjl3');
// 	newDude.userId = 2;
// 	newDude.name = 'Dude Man';
// 	newDude.location = 'Denver, CO';
// 	newDude.bands = ['the Roosters'];
// 	newDude.profilePic = 'url("dudeman.jpeg")';
// 	newDude.backgroundPic = '")'; 
// 	newDude.instruments = ['Guitar', 'Bass', 'Saxaphone'];
// 	newDude.styles = ['Jazz', 'Rock'];
// 	newDude.skills = ['Mixing', 'Live Sound'];
// 	newDude.inspirations = ['John Coltrane', 'Grateful Dead'];
// 	newDude.improvComp = 50;
// 	newDude.birthdate = '05/24/1985';
// 	newDude.age = 29;
// 	newDude.astro = 'Gemini';
// 	newDude.eneagram = 9;
// 	newDude.about = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, enim nobis doloribus alias, dolores eveniet natus pariatur necessitatibus dolorem vero ratione, error deserunt excepturi reiciendis cupiditate provident unde eius consequuntur.';
// 	newDude.philosophy = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, enim nobis doloribus alias, dolores eveniet natus pariatur necessitatibus dolorem vero ratione, error deserunt excepturi reiciendis cupiditate provident unde eius consequuntur.';
// 	newDude.media = ['<iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/170610719&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>'];



// var newDudette = new User('emsdfail@gmail.com', 'lkdlkfjl3');
// 	newDudette.userId = 3;
// 	newDudette.name = 'Dude Lady';
// 	newDudette.location = 'Denver, CO';
// 	newDudette.bands = ['the Roosters'];
// 	newDudette.profilePic = 'url("dudelady.jpg")';
// 	newDudette.backgroundPic = '")'; 
// 	newDudette.instruments = ['Drums', 'Bass', 'Percussion'];
// 	newDudette.styles = ['Jazz', 'Rock'];
// 	newDudette.skills = ['Marketing', 'Graphic Design'];
// 	newDudette.inspirations = ['John Coltrane', 'Grateful Dead', 'Miles Davis'];
// 	newDudette.improvComp = 40;
// 	newDudette.birthdate = '05/24/1985';
// 	newDudette.age = 29;
// 	newDudette.astro = 'Gemini';
// 	newDudette.eneagram = 9;
// 	newDudette.about = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, enim nobis doloribus alias, dolores eveniet natus pariatur necessitatibus dolorem vero ratione, error deserunt excepturi reiciendis cupiditate provident unde eius consequuntur.';
// 	newDudette.philosophy = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, enim nobis doloribus alias, dolores eveniet natus pariatur necessitatibus dolorem vero ratione, error deserunt excepturi reiciendis cupiditate provident unde eius consequuntur.';
// 	newDudette.media = ['<iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/170610719&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>'];


// var brotherMan = new User('emsdfail@gmail.com', 'lkdlkfjl3');
// 	brotherMan.userId = 4;
// 	brotherMan.name = 'Brother Man';
// 	brotherMan.location = 'Boulder, CO';
// 	brotherMan.bands = ['AyaIris'];
// 	brotherMan.profilePic = 'url("brotherman.jpg")';
// 	brotherMan.backgroundPic = '")'; 
// 	brotherMan.instruments = ['Drums', 'Guitar', 'Percussion', 'Tabla'];
// 	brotherMan.styles = ['Tribal Trance', 'Kirtan'];
// 	brotherMan.skills = ['Marketing', 'Graphic Design'];
// 	brotherMan.inspirations = ['Nikhil Banerjee', 'Beats Antique'];
// 	brotherMan.improvComp = 30;
// 	brotherMan.birthdate = '05/24/1985';
// 	brotherMan.age = 29;
// 	brotherMan.astro = 'Gemini';
// 	brotherMan.eneagram = 9;
// 	brotherMan.about = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, enim nobis doloribus alias, dolores eveniet natus pariatur necessitatibus dolorem vero ratione, error deserunt excepturi reiciendis cupiditate provident unde eius consequuntur.';
// 	brotherMan.philosophy = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, enim nobis doloribus alias, dolores eveniet natus pariatur necessitatibus dolorem vero ratione, error deserunt excepturi reiciendis cupiditate provident unde eius consequuntur.';
// 	brotherMan.media = ['<iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/170610719&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>'];


// var sisterLady = new User('emsdfail@gmail.com', 'lkdlkfjl3');
// 	sisterLady.userId = 5;
// 	sisterLady.name = 'Sister Lady';
// 	sisterLady.location = 'Boulder, CO';
// 	sisterLady.bands = ['AyaIris'];
// 	sisterLady.profilePic = 'url("sisterlady.jpg")';
// 	sisterLady.backgroundPic = '")'; 
// 	sisterLady.instruments = ['Bass', 'Keys'];
// 	sisterLady.styles = ['Tribal Trance', 'Kirtan'];
// 	sisterLady.skills = ['Marketing', 'Graphic Design'];
// 	sisterLady.inspirations = ['Bluetech', 'Shpongle', 'Grateful Dead'];
// 	sisterLady.improvComp = 30;
// 	sisterLady.birthdate = '05/24/1985';
// 	sisterLady.age = 29;
// 	sisterLady.astro = 'Gemini';
// 	sisterLady.eneagram = 9;
// 	sisterLady.about = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, enim nobis doloribus alias, dolores eveniet natus pariatur necessitatibus dolorem vero ratione, error deserunt excepturi reiciendis cupiditate provident unde eius consequuntur.';
// 	sisterLady.philosophy = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, enim nobis doloribus alias, dolores eveniet natus pariatur necessitatibus dolorem vero ratione, error deserunt excepturi reiciendis cupiditate provident unde eius consequuntur.';
// 	sisterLady.media = ['<iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/170610719&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>'];

// var maximusprime = new User('emsdfail@gmail.com', 'lkdlkfjl3');
// 	maximusprime.userId = 6;
// 	maximusprime.name = 'Maximus Prime';
// 	maximusprime.location = 'Boulder, CO';
// 	maximusprime.bands = ['Max and the Prariedogs'];
// 	maximusprime.profilePic = 'url("max.jpg")';
// 	maximusprime.backgroundPic = '")'; 
// 	maximusprime.instruments = ['Vocals', 'flute', 'Kazoo'];
// 	maximusprime.styles = ['Nude Acapella', 'Ballet Dance'];
// 	maximusprime.skills = ['Marketing', 'Graphic Design'];
// 	maximusprime.inspirations = ['Bluetech', 'Shpongle', 'Grateful Dead'];
// 	maximusprime.improvComp = 30;
// 	maximusprime.birthdate = '05/24/1985';
// 	maximusprime.age = 29;
// 	maximusprime.astro = 'Gemini';
// 	maximusprime.eneagram = 9;
// 	maximusprime.about = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, enim nobis doloribus alias, dolores eveniet natus pariatur necessitatibus dolorem vero ratione, error deserunt excepturi reiciendis cupiditate provident unde eius consequuntur.';
// 	maximusprime.philosophy = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, enim nobis doloribus alias, dolores eveniet natus pariatur necessitatibus dolorem vero ratione, error deserunt excepturi reiciendis cupiditate provident unde eius consequuntur.';
// 	maximusprime.media = ['<iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/170610719&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>'];











	


// ////////////// premade bands //////////////////////////////
// ////////////// premade bands //////////////////////////////
// ////////////// premade bands //////////////////////////////
// ////////////// premade bands //////////////////////////////
// ////////////// premade bands //////////////////////////////
// ////////////// premade bands //////////////////////////////
// ////////////// premade bands //////////////////////////////




// var prariedogs = new Band('Max and the Prariedogs');
// 	prariedogs.bandId = 1;
// 	prariedogs.location = 'Boulder, CO';
// 	prariedogs.profilePic = 'url("max.jpg")';
// 	prariedogs.backgroundPic = 'url("prairie-dogs.jpg")';
// 	prariedogs.members = [maximusprime, newDudette, sisterLady];  ///id's instead?
// 	prariedogs.instruments = ['vocals'];
// 	prariedogs.styles = ['Acapella in the Nude'];
// 	prariedogs.inspirations = [];
// 	prariedogs.improvComp = 50;
// 	prariedogs.birthdate = '11/11/11';
// 	prariedogs.about = 'Check us out on Sunday mornings on Pearl Street, where we perform our specialty, Acapella in the Nude! Videos will be posted soon.';
// 	prariedogs.philosophy = 'All music is best performed in the nude, especially accappella. One day we were hanging out in the park.  Four happy little prairie dogs made us very happy with a silly little song, so we started a band to share joy that through music.';
// 	prariedogs.media = [];

// var funkyfunksters = new Band('Funky Funksters');
// 	funkyfunksters.bandId = 2;
// 	funkyfunksters.location = 'Boulder, CO';
// 	funkyfunksters.profilePic = 'url("funky.jpg")';
// 	funkyfunksters.backgroundPic = 'url("defaultbackground.jpg")';
// 	funkyfunksters.members = [noahWilson, sisterLady, brotherMan];  ///id's instead?
// 	funkyfunksters.instruments = [];
// 	funkyfunksters.styles = [];
// 	funkyfunksters.inspirations = [];
// 	funkyfunksters.improvComp = 50;
// 	funkyfunksters.birthdate = '11/11/11';
// 	funkyfunksters.about = 'someithing about us';
// 	funkyfunksters.philosophy = 'we believe in this';
// 	funkyfunksters.media = [];


// var band3 = new Band('Psychonauticalistic Krunksters');
// 	band3.bandId = 3;
// 	band3.location = 'Denver, CO';
// 	band3.profilePic = 'url("krunksters.jpg")';
// 	band3.backgroundPic = 'url("")';
// 	band3.members = [newDudette, newDude, brotherMan, noahWilson];  ///id's instead?
// 	band3.instruments = [];
// 	band3.styles = [];
// 	band3.inspirations = [];
// 	band3.improvComp = 50;
// 	band3.birthdate = '08/08/08';
// 	band3.about = 'something about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about us';
// 	band3.philosophy = 'we believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in this';
// 	band3.media = [];

// var ayairis = new Band('AyaIris');
// 	ayairis.bandId = 4;
// 	ayairis.location = 'Boulder, CO';
// 	ayairis.profilePic = 'url("ayairis.jpg")';
// 	ayairis.backgroundPic = 'url("")';
// 	ayairis.members = [sisterLady, noahWilson, brotherMan];  ///id's instead?
// 	ayairis.instruments = [];
// 	ayairis.styles = [];
// 	ayairis.inspirations = [];
// 	ayairis.improvComp = 50;
// 	ayairis.birthdate = '12/12/12';
// 	ayairis.about = 'something about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about us';
// 	ayairis.philosophy = 'we believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in this';
// 	ayairis.media = [];

// 	var roosters = new Band('The Roosters');
// 	roosters.bandId = 5;
// 	roosters.location = 'Denver, CO';
// 	roosters.profilePic = 'url("roosters.jpg")';
// 	roosters.backgroundPic = 'url("")';
// 	roosters.members = [sisterLady, maximusprime, newDude];  ///id's instead?
// 	roosters.instruments = [];
// 	roosters.styles = [];
// 	roosters.inspirations = [];
// 	roosters.improvComp = 50;
// 	roosters.birthdate = '01/01/01';
// 	roosters.about = 'something about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about ussomething about us';
// 	roosters.philosophy = 'we believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in thiswe believe in this';
// 	roosters.media = [];
 	


//  // var isDuplicateArrayItem = function(testArray, testItem){
//  // 	console.log('is running?');
//  // 	for (var z = 0; z < testArray.length; z++) {
//  // 		console.log('isDuplicateArrayItem testArray testItem test: ', testArray, testItem);
//  // 		if (testArray[z] === testItem) {
//  // 			return true;
//  // 		} else {
//  // 			return false;
//  // 		}
//  // 	}
//  // }



// ///////// pre-render////////////////////////
// noahWilson.render();
// console.log(users);
// // funkyfunksters.render();
// prariedogs.render();
// console.log('bands: ', bands);



















});