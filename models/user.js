var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	name: String,
	location: String,
	bands: [String],
	profilePic: String,
	backgroundPic: String,
	instruments: [String],
	styles: [String],
	skills: [String],
	inspirations: [String],
	improvComp: Number,
	birthdate: String,
	age: Number,
	astro: String,
	about: String,
	philosophy: String,
	media: [String],
	photos: [{
		url: String,
		thumbnail: String,
		caption: String,
		likes: Number
	}],
	cocreationSongs: [mongoose.Schema.ObjectId],
	cocreationCollaborations: [mongoose.Schema.ObjectId],
	posts: [mongoose.Schema.ObjectId],
	tribe: [mongoose.Schema.ObjectId],
	isNewUser: Boolean
});


userSchema.pre('save', function(next){

  if(!this.isModified('password')) return next();
	var user = this;
	bcrypt.genSalt(10, function(err, salt){
		if(err) return next(err);
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err) return next(err);
			user.password = hash;
			return next();
    	});
  	});
});

userSchema.methods.comparePassword = function(candidatePassword, next){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err) return next(err);
	return next(null, isMatch);
  });
};

// Our user model
var User = mongoose.model('user', userSchema);

// Make user model available through exports/require
module.exports = User;





