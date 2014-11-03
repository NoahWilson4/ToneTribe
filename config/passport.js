// var passport = require('passport');
// var FacebookStrategy = require('passport-facebook').Strategy;
// var UserModel = require('../models/user.js');

// passport.serializeUser(function(user, done){
// 	done(null, user._id);
// });

// passport.deserializeUser(function(userid, done){
// 	UserModel.findOne({_id: userid}, function(err, user){
// 		done(err, user);
// 	});
// });

// var facebookStrategy = new FacebookStrategy({
// 	clientID: '216214371907270',
// 	clientSecret: '5c13728421e0696d9800369682b1c45f',
// 	callbackURL: 'http://localhost:3000/facebook/callback'
// }, function(accessToken, refreshToken, profile, done){
// 	console.log(accessToken, refreshToken, profile);

// 	UserModel.findOne({userid: profile.id}, function(err, user){
// 		if(user){
// 			return done(err, user);
// 		}

// 		var newUser = new UserModel({
// 			userid: profile.id,
// 			username: profile.username,
// 			profile: profile
// 		});
// 		newUser.save(function(err, doc){
// 			return done(err, doc);
// 		});
// 	});

// });
// passport.use(facebookStrategy);