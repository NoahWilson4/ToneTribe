var mongoose = require('mongoose');
var User = require('../user.js');


User.find({}, function(err, results){
	if (results.length === 0) {
		var noahWilson = new User({
			password: 'nrw4radi8',
			email: 'behearnowmusic@gmail.com',
			name: 'Noah Wilson',
			location: 'Boulder, CO',
			bands: ['Sangita Devi', 'AyaIris', 'Shrubb'],
			profilePic: 'url("../profilepic.jpg")',
			backgroundPic: 'url("backgroundpic.jpg")',
			instruments: ['Sitar', 'Hammered Dulcimer', 'Bass', 'Guitar', 'Dilruba', 'Electronics'],
			styles: ['Hindustani', 'Tribal Trance', 'Meditation', 'Kirtan'],
			skills: ['Audio Engineering', 'Mixing', 'Mastering', 'Web Design', 'Producing', 'Live Sound'],
			inspirations: ['Nikhil Banerjee', 'Ali Akbar Khan', 'Philip Glass', 'Shpongle', 'Bluetech', 'Tinariwen'],
			improvComp: 20,
			birthdate: '05/24/1985',
			age: 29,
			astro: 'Gemini',
			about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum architecto voluptatibus mollitia esse, est velit incidunt, quisquam ullam rem eligendi assumenda quam nesciunt eaque fugiat commodi quibusdam non dolor at.',
			philosophy: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel, officia. Inventore, culpa, rem. Aliquid id eos, iure. Quia a obcaecati voluptatibus modi illo reiciendis molestiae voluptate, error neque laudantium velit?',
			media: ['<iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/170610719&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>', '<iframe name="full" style="width:100%;height:520px;border:0px;" src="http://widget.cdbaby.com/3138247b-4257-43aa-8ccc-142fbfe8396e/full/light/opaque">', '<iframe width="560" height="315" src="http://www.youtube.com/embed/V1IpKbmdx0Q" frameborder="0" allowfullscreen></iframe>']
		});
		user.save(function(err, user){

      // If there is an error, it will come with some special codes and
      // information. We can customize the printed message based on
      // the error mongoose encounters
      if(err) {

        // By default, we'll show a generic message...
        var errorMessage = 'An error occured, please try again';

        // If we encounter this error, the duplicate key error,
        // this means that one of our fields marked as "unique"
        // failed to validate on this object.
        if(err.code === 11000){
          errorMessage = 'This user already exists.';
        }

        // Flash the message and redirect to the login view to
        // show it.
        req.flash('error', errorMessage);
        return res.redirect('/auth/login');
      }

      // If we make it this far, we are ready to log the user in.
      performLogin(req, res, next, user);
    });


		var dudeMan = new User({
			password: 'nrw4radi8',
			email: 'bewmusic@gmail.com',
			name: 'Dude Man',
			location: 'Boulder, CO',
			bands: ['Sangita Devi', 'Sesame Street', 'Shrubb'],
			profilePic: '',
			backgroundPic: '',
			instruments: ['Bass', 'Guitar', 'Piano', 'Electronics'],
			styles: ['Tribal Trance', 'Rock'],
			skills: ['Audio Engineering', 'Producing', 'Live Sound'],
			inspirations: ['Grateful Dead', 'Bluetech', 'Tinariwen', 'Bob Marley'],
			improvComp: 50,
			birthdate: '05/24/1985',
			age: 29,
			astro: 'Gemini',
			about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum architecto voluptatibus mollitia esse, est velit incidunt, quisquam ullam rem eligendi assumenda quam nesciunt eaque fugiat commodi quibusdam non dolor at.',
			philosophy: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel, officia. Inventore, culpa, rem. Aliquid id eos, iure. Quia a obcaecati voluptatibus modi illo reiciendis molestiae voluptate, error neque laudantium velit?',
			media: ['<iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/170610719&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>', '<iframe name="full" style="width:100%;height:520px;border:0px;" src="http://widget.cdbaby.com/3138247b-4257-43aa-8ccc-142fbfe8396e/full/light/opaque">', '<iframe width="560" height="315" src="http://www.youtube.com/embed/V1IpKbmdx0Q" frameborder="0" allowfullscreen></iframe>']
		});
		dudeMan.save();

		var sisterLady = new User({
			password: 'nrw4radi8',
			email: 'ssdfsic@gmail.com',
			name: 'Sister Lady',
			location: 'Denver, CO',
			bands: ['Sangita Devi'],
			profilePic: '',
			backgroundPic: '',
			instruments: ['Guitar', 'Drums', 'Flute'],
			styles: ['Tribal Trance', 'Meditation', 'Rock', 'Kirtan'],
			skills: ['Producing', 'Live Sound'],
			inspirations: ['Shpongle', 'Beats Antique'],
			improvComp: 20,
			birthdate: '05/24/1985',
			age: 29,
			astro: 'Gemini',
			about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum architecto voluptatibus mollitia esse, est velit incidunt, quisquam ullam rem eligendi assumenda quam nesciunt eaque fugiat commodi quibusdam non dolor at.',
			philosophy: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel, officia. Inventore, culpa, rem. Aliquid id eos, iure. Quia a obcaecati voluptatibus modi illo reiciendis molestiae voluptate, error neque laudantium velit?',
			media: ['<iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/170610719&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>', '<iframe name="full" style="width:100%;height:520px;border:0px;" src="http://widget.cdbaby.com/3138247b-4257-43aa-8ccc-142fbfe8396e/full/light/opaque">', '<iframe width="560" height="315" src="http://www.youtube.com/embed/V1IpKbmdx0Q" frameborder="0" allowfullscreen></iframe>']
		});
		sisterLady.save();
	}
});


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





