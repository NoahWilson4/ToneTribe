var mongoose = require('mongoose');

var bandSchema = mongoose.Schema({
	password: String,
	email: String,
	name: String,
	location: String,
	users: [String],
	profilePic: String,
	backgroundPic: String,
	instruments: [String],
	styles: [String],
	skills: [String],
	inspirations: [String],
	improvComp: Number,
	birthdate: String,
	age: Number,
	about: String,
	philosophy: String,
	media: [String],
	cocreationSongs: [String]
});

module.exports = mongoose.model('band', userSchema);