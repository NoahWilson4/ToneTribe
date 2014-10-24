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
			profilePic: 'url("profilepic.jpg")',
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
	noahWilson.save();
	}
});
