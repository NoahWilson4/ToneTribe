var CocreationSong = require('../models/cocreationSong.js');
var User = require('../models/user.js');

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var async = require('async');
var _ = require('underscore');
//for aws
var http = require('http');
var path = require('path');
var aws = require('aws-sdk');
var fs = require('fs');

var multer = require('multer');

var KEY, SECRET;
if(process.env.AWS_KEY){
  // if the process has AWS_KEY set, we'll use those values
  KEY = process.env.AWS_KEY;
  SECRET = process.env.AWS_SECRET;
} else {
  // if the process doesn't have stuff set, we'll load in our config file
  var privateSettings = require('../private.js');
  KEY = privateSettings.aws.key;
  SECRET = privateSettings.aws.secret;
}

var BUCKET = 'tonetribe';


aws.config.update({
  accessKeyId: KEY,
  secretAccessKey: SECRET
});
var s3 = new aws.S3();
/// environments
var app = express();
// app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
///// switch to new connector..... in new student sample code example
app.use(require('connect-multiparty')());



///// add to api?
var lowerCase = function(x){
		if (_.isArray(x) === true){
			for (var y = 0; y < x.length; y++){
				x[y] = x[y].toLowerCase();
			}
			return x;
		} else if (x) {
			var lowerCased = x.toLowerCase();
			return lowerCased;
			}
		};


var apiController = {
	addUser: function(req, res){
		console.log('req.body add user: ', req.body);
		var newUser = new User(req.body);
		newUser.save();
		var id = newUser._id;
		console.log('id on add user: ', id);
		res.render('signup2', {
			id: id,
			user: req.user
		});
	},
	updateUserFromClient: function(req, res){
		console.log('req.user updateUserFromClient: ', req.user);
		console.log('req.body update user from client: ', req.body);
		var id = req.body.id;
		var user;
		console.log('id: ', id);

		User.find({_id: id}, function(err, result){
			console.log('find user result', result);
			user = result[0];
			
				user.bands = req.body.bands;
				user.instruments = req.body.instruments;
				user.styles = req.body.styles;
				user.skills = req.body.skills;
				user.inspirations = req.body.inspirations || [];
				user.improvComp = req.body.improvComp || [];
				console.log('user updated: ', user);
				user.save(function(err, results){
					console.log('saving...');
					res.send(results);
				});
		
		});
	},
	updateUser: function(req, res){
		console.log('req.user updateUser: ', req.user);
		var id = req.body.id;
		res.render('signup3', {
			id: id
		});

	},
	updateUser2: function(req, res){
		console.log('req.user updateUser2: ', req.user);
		console.log('req.body update user2: ', req.body);
		var id = req.body._id;
		User.find({_id: id}, function(err, result){
			console.log('updateUser2 result', result);
			var user = result[0];
			user.about = req.body.about || '';
			user.philosophy = req.body.philosophy || '';
			console.log('user updated before save: ', user);
			user.save(function(err, results){
				var profileUrl = '';
				res.render('signup4', {
					id: id,
					profileUrl: profileUrl
				});	
			});
		});

	},
	updateUser3: function(req, res){
		console.log('req.user updateUser3: ', req.user);
		console.log('req.body update user3: ', req.body);
		var id = req.body.id;
		User.find({_id: id}, function(err, result){
			console.log('updateUser2 result', result);
			result.profilePic = req.body.profilePic || '';
			result.backgroundPic = req.body.backgroundPic || '';
			//////// why is it not able to save??????
			result.save();
		});
		res.render('profile-user' + id, {
			id: id
		});

	},
	createNewSong: function(req, res){
		console.log('req.user createNewSong: ', req.user);
		var songName = req.body.name;
		var userId = req.user._id;
		var song = {
			name: songName,
			userId: userId
		}
		console.log('song objecta: ', song);
		var newSong = new CocreationSong(song);
		newSong.save(function(err, result){
			console.log('result test: ', result);

			req.user.cocreationSongs.push({
				songName: songName,
				songId: result._id
			});
			req.user.save();
			res.send(result);
		});
	},
	addTrack: function(req, res){
		console.log('req.body addTrack: ', req);
		// console.log('add track req test:', req);
		//// i need to add user id!!
		var userId = req.userId;
		var userPic = req.userPic;
		var userName = req.userName;
		var trackNumber = req.trackNumber;
		var trackTitle = req.trackTitle;
		var ETag = req.ETag;
		var Key = req.Key;
		var songId = req.songId;
		var trackUrl = req.url;
		console.log('trackUrl test: ', trackUrl);

		CocreationSong.findById(songId, function(err, result){
			// console.log('result: ', result);
			// console.log('result.tracks: ', result.tracks);
			var trackNumberMatches = 0;
			for (var i = 0; i < result.tracks.length; i++) {
				var trackNum = result.tracks[i].track;
				// console.log('trackNum: ', trackNum);
				// console.log('trackNumber: ', trackNumber);

///////// why does if(trackNum === trackNumber){} not work???????????
				if (trackNum - trackNumber === 0){
					console.log('is same track in tracks...');
					result.tracks[i].userTracks.push({
								url: trackUrl,
								userId: userId,
								userPic: userPic,
								userName: userName,
								Key: Key,
								trackTitle: trackTitle,
								likes: 0
					})
					trackNumberMatches++;
					result.save();
				}
			}
			
			if (trackNumberMatches === 0) {
				console.log('is a new track...')
				result.tracks.push({
							track: trackNumber,
							userTracks: [{
								url: trackUrl,
								userId: userId,
								userPic: userPic,
								userName: userName,
								Key: Key,
								userId: '',
								trackTitle: trackTitle,
								likes: 0
							}]
						});
				result.save();
			}
			console.log('result updated?: ', result);	
		});
	},
	getTrackUrl: function(key){
		console.log('key test: ', key);
		var params = {Bucket: BUCKET};
		var trackUrl;
          s3.listObjects(params, function(err, data){
              var bucketContents = data.Contents;
              for (var i = 0; i < bucketContents.length; i++){
                if (key === bucketContents[i].Key){
                  console.log('key: ', key, "bucketContents[i].Key)", bucketContents[i].Key);
                  console.log('match!!!!');
                  var urlParams = {Bucket: BUCKET, Key: bucketContents[i].Key};
                  s3.getSignedUrl('getObject',urlParams, function(err, url){
                    trackUrl = url;

                    var asyncCount = 0;

			          async.whilst(
			              function () { return trackUrl === undefined; },
			              function (callback) {
			                  asyncCount++;
			                  console.log('Waiting for response.....');
			                  setTimeout(callback, 200);
			              },
			              function (err) {
			              	console.log('url at end of api..... : ', trackUrl);
                    		return trackUrl;    	
			              }
			          );
                  });
                }
                 
              }
          });
	},
	getSongs: function(req, res){
		console.log('req.user getSongs: ', req.user);
		CocreationSong.find({}, function(err, result){
			// console.log('result of songs: ', result);
			res.send(result);
		})
	},
	getTrackUrls: function(req, res, onComplete){
		console.log('req.user getTrackUrls: ', req.user);
		var tracks;
		var trackKeys = [[],[],[],[],[],[]];
		var songId;
		
			console.log('req.body getTrackUrls: ', req.body);
			
			if (req.id) {
				songId = req.id;
				console.log('id coming from index');
			} else {
				songId = req.body;
				console.log('id coming from js');
			}	
			var sId = songId.id;
			console.log('sId!!!!!', sId);
			var id = 'ObjectId("' + songId.id + '")';
			console.log('ObjectId', id);
			CocreationSong.findOne({ _id: sId }, function(err, result){
				console.log('***result: ', result);
				var tracks = result;
				console.log('result!!!!!!!!!!!!!!!!', result);

				
				async.series([
				    function(callback){
				        // do some stuff ...
					for (var i = 0; i < result.tracks.length; i++){
						// console.log('looping...');
						for (var z = 0; z < result.tracks[i].userTracks.length; z++){
								var userPic = result.tracks[i].userTracks[z].userPic;
								var userName = result.tracks[i].userTracks[z].userName;
								var userId = result.tracks[i].userTracks[z].userId;
								var trackNum = result.tracks[i].track;
								var trackTitle = result.tracks[i].userTracks[z].trackTitle;
								var key = result.tracks[i].userTracks[z].Key;
								var likes = result.tracks[i].userTracks[z].likes;
								var url = 'https://s3.amazonaws.com/tonetribe/' + key;
								var keyAndNum = {
									userPic: userPic,
									userName: userName,
									userId: userId,
									Key: key,
									track: trackNum,
									likes: likes,
									id: songId,
									url: url,
									trackTitle: trackTitle
								}
								console.log('trackNum: ', trackNum);
								trackKeys[trackNum].push(keyAndNum);
								
						}
					}
						var track0 = [];
						var track1 = [];
						var track2 = [];
						var track3 = [];
						var track4 = [];
						var track5 = [];
					for (var i = 0; i < trackKeys.length; i++){
						var trackiArray = trackKeys[i];
						for (var z = 0; z < trackiArray.length; z++) {
							if (trackiArray[z].track === 0) {
								track0.push(trackiArray[z]);
							} else if (trackiArray[z].track === 1) {
								track1.push(trackiArray[z]);
							} else if (trackiArray[z].track === 2) {
								track2.push(trackiArray[z]);
							} else if (trackiArray[z].track === 3) {
								track3.push(trackiArray[z]);
							} else if (trackiArray[z].track === 4) {
								track4.push(trackiArray[z]);
							} else if (trackiArray[z].track === 5) {
								track5.push(trackiArray[z]);
							}
						}
					}
			
					tracks = [track0, track1, track2, track3, track4, track5];
					console.log();
					callback(null, 'one');
					},
					function(callback){
					      // do some more stuff ...
						if (req.id) {
							onComplete(tracks);
						} else {
							res.send(tracks);
						     callback(null, 'two');
						}	
					    }
						],
						// optional callback
						function(err, results){
					    
				});
				
			});
	},
	submitFoundation: function (req, res) {
		console.log('req.user submitFoundation: ', req.user);
		  var fName = req.files.audio.name;
		  var fPath = req.files.audio.path;
		  var cType = req.files.audio.type;
		  var size = req.files.audio.size;
		  var audio = req.body;

		  var key = 'public/' + fName;
		  var trackTitle = req.body.trackTitle;
		  var songId = req.body.id;
		  var trackNumber = req.body.trackNumber;
		  var trackUrl = 'https://s3.amazonaws.com/tonetribe/' + key;

		  console.log('trackNumber, trackUrl', trackNumber, trackUrl);
		 
		  fs.readFile(fPath, function (err, data) {
		    console.log(err);
		    s3.putObject({
		        Bucket: BUCKET,
		        Key: 'public/' + fName,
		        ACL: 'public-read',
		        Body: data
		      }, function (err, result) {
		          console.log(err, result);
		          var track = {
		          
		                Key: key,
		                trackTitle: trackTitle,
		                ETag: trackETag,
		                songId: songId,
		                trackNumber: trackNumber,
		                url: trackUrl
		          };

		          apiController.addTrack(track);

		        });
		   
		    res.redirect('/song/' + songId);
		  });
		},
		submitPrivate: function (req, res) {
			console.log('req.user submitPrivate: ', req.user);
		  console.log(req.files);
		  var fName = req.files.image.name;
		  var fPath = req.files.image.path;
		  var cType = req.files.image.type;
		  var size = req.files.image.size;

		  fs.readFile(fPath, function (err, data) {
		    console.log(err);
		    s3.putObject({
		      Bucket: BUCKET,
		      Key: 'private/' + fName,
		      ContentType: cType,
		      Body: data
		    }, function (err, result) {
		      console.log(err, result);
		      res.redirect('search');
		      
		    });
		  });
		},
		findUsers: function(req, res){
			console.log('req.user findUsers: ', req.user);
			var positiveResults = [];
			var positiveResultsBands = [];
			var property = req.body.searchedFor;
			var value = req.body.searchedForValue;
			if (_.isArray(property) === false){
				property = [property];
				value = [value];
			}
			console.log('property: ', property);
			console.log('value: ', value);
			User.find({}, function(err, result){
				var users = result;

				for (var i = 0; i < users.length; i++) {
					var user = users[i];
					console.log('user.name:', user.name);
					var matches = 0;
					for (var y = 0; y < property.length; y++){
						var userProp = user[property[y]] || user[property];
						console.log('userProp', userProp);
						if (_.isArray(userProp) === true) {
							console.log('isArray');
							var propertyArray = lowerCase(userProp);
							console.log('propertyArray', propertyArray);
							for (var z = 0; z < propertyArray.length; z++) {
								console.log('looping in array: propertyArray[z] comparing to value; ', propertyArray[z], value[y]);

								if (propertyArray[z] === value[y]){
									console.log('is array positive match!!!!');
									matches++;
								}
							}
						} else {
							console.log('is not array');
							var userProp = lowerCase(userProp);
							console.log('userProp, value[i], value: ', userProp, value[y], value);
							if (userProp === value[y] || userProp === value) {
								console.log('nonarray positive match!!!!');
								matches++;
							}
						}
					console.log('matches, property.length: ', matches, property.length);
					if (matches === property.length){
						positiveResults.push(users[i]);
					}
					}
				
				}

			// bands //////////
				
			// positiveResultsBands.push(bands[i]);
				

				// console.log('positiveResults serverside: ', positiveResults);
				console.log('positiveResults.length', positiveResults.length);
				// console.log('positiveResultsBands: ', positiveResultsBands);
				res.send(positiveResults);

			});

		},
		uploadProfilePic: function (req, res){
		console.log('req', req);
		  console.log('req.files on uploadProfilePic: ', req.files);
		  console.log('req.body on uploadProfilePic: ', req.body);
		  var fName = req.name;
		      var fPath = req.path;
		      var cType = req.type;
		      var size = req.size;

		      var profileUrl = 'https://s3.amazonaws.com/tonetribe/public/' + fName;

		      var image = {
		          Key: 'public/' + fName,
		              };
		     console.log('image', image);
		      fs.readFile(fPath, function (err, data) {
		        console.log(err);
		        s3.putObject({
		            Bucket: BUCKET,
		            Key: 'public/' + fName,
		            ACL: 'public-read',
		            Body: data
		          }, function (err, result) {
		                console.log('finishing with upload.......', err, result);
		          // console.log('about to render.........');
		              });
		       	// res.send();
		          // res.render('signup4', {
		          //   id: id,
		          //   profileUrl: profileUrl,
		          //   backgroundUrl: backgroundUrl
		          // });
		      });
		},
		postComment: function(req, res){
			console.log('req.body: ', req.body);
			CocreationSong.findOne({_id: req.body.songId}, function(err, result){
				console.log('find song comment posting: ', result);
				// var comment = req.body.comment;
				result.comments.push(req.body.comment);
				console.log('updated result: ', result);
				result.save();

			res.send(result);
			})
		},
		getComments: function(req, res){
			console.log('getComments req.body: ', req.body);

		}

};

module.exports = apiController;