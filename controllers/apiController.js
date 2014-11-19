var CocreationSong = require('../models/cocreationSong.js');
var User = require('../models/user.js');
var Post = require('../models/post.js');

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var async = require('async');
var _ = require('underscore');
var moment = require('moment');
//for aws
var http = require('http');
var path = require('path');
var aws = require('aws-sdk');
var fs = require('fs');

/// if developing
var privateSettings = require('../private.js');

var multer = require('multer');

var KEY, SECRET;
if(process.env.AWS_KEY){
  // if the process has AWS_KEY set, we'll use those values
  KEY = process.env.AWS_KEY;
  SECRET = process.env.AWS_SECRET;
} else {
  // if the process doesn't have stuff set, we'll load in our config file
  
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
	updateUserProfile: function(req, res){
		console.log('updateUserProfile req.body: ', req.body);
		User.findOne({_id: req.user._id}, function(err, result){
			console.log('result: ', result);
			result.bands = req.body.bands;
			result.instruments = req.body.instruments;
			result.styles = req.body.styles;
			result.skills = req.body.skills;
			result.inspirations = req.body.inspirations;
			result.improvComp = req.body.improvComp;
			result.about = req.body.about;
			result.philosophy = req.body.philosophy;
			console.log('result updated: ', result);
			result.save();
			res.send('success');
		});
	},
	isNewUserFalse: function(req, res){
		User.findOne({_id: req.user._id}, function(err, result){
			result.isNewUser = false;
			result.save();
			console.log('result no longer new user: ', result);
			res.send('saved.');
		});
	},
	addToTribe: function(req, res){
		console.log('addToTribe req.user: ', req.user);
		console.log('addToTribe req.body: ', req.body);
		User.findOne({_id: req.user._id}, function(err, result){
			result.tribe.push(req.body.userIdToAdd);
			result.save();
			console.log('addToTribe current user result: ', result);
		});
		User.findOne({_id: req.body.userIdToAdd}, function(err, result){
			result.tribe.push(req.user._id);
			result.save();
			console.log('addToTribe user result: ', result);
		});
		res.send('joined tribe.');
	},
	getTribe: function(req, res){
		console.log('getTribe req.body: ', req.body);
		User
			.findOne({_id: req.body._id})
			.populate('tribe', null, 'user')
			.exec(function(err, result){
				var tribe = _.uniq(result.tribe);
				console.log('unip tribe: ', tribe);
				res.send({
					tribe: tribe
				});
		});
	},
	// createNewSong: function(req, res){
	// 	console.log('req.user createNewSong: ', req.user);
	// 	var songName = req.body.name;
	// 	var userId = req.user._id;
	// 	var song = {
	// 		name: songName,
	// 		userId: userId
	// 	};
	// 	console.log('song objecta: ', song);
	// 	var newSong = new CocreationSong(song);
	// 	newSong.save(function(err, result){
	// 		console.log('result test: ', result);
	// 		req.user.cocreationSongs.push(newSong);
	// 		req.user.save();
	// 		res.send(result);
	// 	});
	// },
	createNewSong: function(req, res){
		console.log('req.user createNewSong: ', req.user);
		console.log('req.user createNewSong: ', req.user);
		var songName = req.body.name;
		var userId = req.user._id;
		var date = moment().format('MMMM Do YYYY, h:mm:ss a');
		var song = {
			name: songName,
			userId: userId,
			likes: 0,
			date: date
		};
		console.log('song objecta: ', song);
		var newSong = new CocreationSong(song);
		newSong.save(function(err, result){
			console.log('result test: ', result);
			req.user.cocreationSongs.push(newSong);
			req.user.save();
			res.redirect('../song?id=' + result._id);
		});
	},
	shareSong: function(req, res){
		console.log('shareSong req.body: ', req.body);
		var newPost = new Post(req.body.songShare);
		console.log('newPost: ', newPost);
		newPost.save(function(err, result){
			User.findOne({_id: req.user._id}, function(err, user){
				console.log('newpost result._id:', result._id);
				console.log('user: ', user);
				user.posts.push(result._id);
				console.log('user posts updated: ', user);
				user.save();
				res.send('saved.');
			});
		});
	},
	addSongDescription: function(req, res){
		console.log('addSongDescription req.body: ', req.body);
		CocreationSong.findOne({_id: req.body._id}, function(err, result){
			result.description = req.body.description;
			console.log('result description updated: ', result);
			result.save();
			res.send('description saved.');
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
					});
					trackNumberMatches++;
					result.save();
				}
			}
			
			if (trackNumberMatches === 0) {
				console.log('is a new track...');
				result.tracks.push({
							track: trackNumber,
							userTracks: [{
								url: trackUrl,
								userId: userId,
								userPic: userPic,
								userName: userName,
								Key: Key,
								trackTitle: trackTitle,
								likes: 0
							}]
						});
				result.save();
			console.log('result updated?: ', result);

			}
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
		});
	},
	getAllCocreations: function(req, res){
		console.log('getting all cocreationSongs');
		CocreationSong
			.find({})
			.populate('users', 'name profilePic _id', 'user')
			.exec(function(err, result){
				console.log('foundsongs');
				var songsSorted = result.sort(function(a, b){
					console.log('sorting...');
					return parseFloat(a.likes) - parseFloat(b.likes);
				});
		////////// sorting not working....  /////////////
				console.log('songsSorted: ', songsSorted);
				res.send({
					cocreationSongs: songsSorted
			});
		});
	},
	getTrackUrls: function(req, res, onComplete){
		// console.log('req.user getTrackUrls: ', req.user);
		var tracks;
		var trackKeys = [[],[],[],[],[],[]];
		var songId;
		
			// console.log('req.body getTrackUrls: ', req.body);
			
			if (req.id) {
				songId = req.id;
				// console.log('id coming from index');
			} else {
				songId = req.body;
				// console.log('id coming from js');
			}	
			var sId = songId.id;
			// console.log('sId!!!!!', sId);
			var id = 'ObjectId("' + songId.id + '")';
			// console.log('ObjectId', id);
			CocreationSong.findOne({ _id: sId }, function(err, result){
				// console.log('***result: ', result);
				var tracks = result;
				// console.log('result!!!!!!!!!!!!!!!!', result);

				
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
								};
								// console.log('trackNum: ', trackNum);
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

	      fs.readFile(fPath, function (err, data) {
	        console.log(err);
	        s3.putObject({
	            Bucket: BUCKET,
	            Key: 'public/' + fName,
	            ACL: 'public-read',
	            Body: data
	          }, function (err, result) {
	                console.log('finishing with upload.......', err, result);
	          		console.log('about to render.........');

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
			});
		},
		getComments: function(req, res){
			console.log('getComments req.body: ', req.body);

		},
		uploadSongBackgroundPic: function(req, res){
			console.log('req!!!', req);
			console.log('req.body uploadSongBackgroundPic: ', req.body);
			var fName = req.files.songBackgroundImage.name;
		      var fPath = req.files.songBackgroundImage.path;
		      var cType = req.files.songBackgroundImage.type;
		      var size = req.files.songBackgroundImage.size;

		      var songId = req.body.songId;
		      console.log('song id uploadSongBackgroundPic: ', songId);
		      var songPicUrl = 'https://s3.amazonaws.com/tonetribe/public/' + fName;
		      CocreationSong.findOne({_id: songId}, function(err, result){
		      	console.log('err: ', err);
				console.log('uploadSongBackgroundPic find song: ', result);
				result.backgroundImage = songPicUrl;
				result.save();
			  });
		      fs.readFile(fPath, function (err, data) {
		        console.log(err);
		        s3.putObject({
		            Bucket: BUCKET,
		            Key: 'public/' + fName,
		            ACL: 'public-read',
		            Body: data
		          }, function (err, result) {
		                console.log('finishing with songPic upload.......', err, result);
		          console.log('about to render.........');
		          res.redirect('song?id=' + songId);
		              });
		      });

		},
		addMedia: function(req, res){
			console.log('adding media...');
			console.log('req.user._id, req.body.media', req.user._id, req.body.media);
			User.findOne({_id: req.user._id}, function(err, user){
				(user.media).push(req.body.media);
				user.save();
				console.log('user.media updated: ', user);
			});
		},
		addCommentLike: function(req, res){
			var comment = req.body.comment.trim();
			CocreationSong.findOne({_id: req.body.songId}, function(err, result){
				for (var i = 0; i < result.comments.length; i++){
					console.log(comment);
					console.log(result.comments[i].comment);
					if (result.comments[i].comment === comment) {
						var likes = parseInt(result.comments[i].likes);
						console.log('likes: ', likes);
						result.comments[i].likes = likes + 1;
						console.log('result likes updated:', result);
						result.save();
						res.send({likes: result.comments[i].likes});
					}
				}
			});
		},
		addPost: function(req, res){
			console.log('addPost req.body: ', req.body);

			var postedTo;
			if (req.query.length > 0){
				console.log('posted to different user');
				postedTo = req.query;
				var newPost = new Post({
					userName: req.body.userName,
					userProfilePic: req.body.userProfilePic,
					user: req.user,
					postedTo: postedTo,
					text: req.body.text,
					likes: 0,
					date: req.body.date
				});
				console.log('newPost: ', newPost);
				User.findOne({_id: postedTo}, function(err, result){
					result.posts.push(newPost._id);
					console.log('result updated post: ', result);
					result.save();
					console.log('newPost._id: ', newPost._id);
					res.send({postId: newPost._id});
				});
				User.findOne({_id: req.user._id}, function(err, result){
					result.posts.push(newPost._id);
					console.log('result updated post: ', result);
					result.save();
					console.log('newPost._id: ', newPost._id);
					res.send({postId: newPost._id});
				});
			} else {
				('posted to current user', req.user._id);
				postedTo = req.user._id;
				var newPost = new Post({
					userName: req.body.userName,
					userProfilePic: req.body.userProfilePic,
					user: req.user,
					postedTo: postedTo,
					text: req.body.text,
					likes: 0,
					date: req.body.date
				});
				console.log('newPost: ', newPost);
				User.findOne({_id: req.user._id}, function(err, result){
					result.posts.push(newPost._id);
					console.log('result updated post: ', result);
					result.save();
					console.log('newPost._id: ', newPost._id);
					res.send({postId: newPost._id});
				});

			}
			
			console.log('newPost: ', newPost);
			newPost.save();
			
		},
		getAllPosts: function(req, res){
			var posts = [];
			Post.find({})
				.populate('user', 'name _id profilePic', 'user')
				.populate('postedTo', 'name _id profilePic', 'user')
				.populate('cocreationSong', null, 'cocreationsong')
				.exec(function(err, results){
					var numOfPosts = results.length;
					console.log('numOfPosts: ', numOfPosts);
					results.map(function(post){
						Post.findOne({_id: post._id})
							.populate('user', 'name profilePic _id', 'user')
							.populate('postedTo', 'name profilePic _id', 'user')
							.populate('cocreationSong', null, 'cocreationsong')
							.exec(function(err, result){
								console.log('pushing post');
								posts.push(result);
								if (posts.length === numOfPosts){
									console.log('posts: ', posts);
									console.log('complete with populate, now sending');
									var sortedPosts = posts.sort(function(a, b){
										if (a.date < b.date){
										     return -1;
										}
										if (a.date > b.date) {
										    return 1;
										}
										return 0;
									});
									res.send({
										posts: sortedPosts
									});
								}
						});
					});
				});
		},
		getPosts: function(req, res){
			var posts = [];
			console.log('getPosts req.body._id: ', req.body._id);
			User.findOne({_id: req.body._id})
				.populate('posts', null, 'post')
				.exec(function(err, doc){
					var numOfPosts = doc.posts.length;
					console.log('numOfPosts: ', numOfPosts);
					doc.posts.map(function(post){
						Post.findOne({_id: post._id})
							.populate('user', 'name profilePic _id', 'user')
							.populate('postedTo', 'name profilePic _id', 'user')
							.populate('cocreationSong', null, 'cocreationsong')
							.exec(function(err, result){
								console.log('pushing post');
								posts.push(result);
								if (posts.length === numOfPosts){
									console.log('posts: ', posts);
									console.log('complete with populate, now sending');
									var sortedPosts = posts.sort(function(a, b){
										if (a.date < b.date){
										     return -1;
										}
										if (a.date > b.date) {
										    return 1;
										}
										return 0;
									});
									res.send({
										posts: sortedPosts
									});
								}
						});
					});
				});
		},
		likePost: function(req, res){
		console.log('req.body liking post', req.body);
		console.log('req.body._id liking post', req.body._id);
		Post.findOne({_id: req.body._id}, function(err, post){
			console.log('post:', post);
			var likes;
			if (post.likes > 0) {
				likes = parseInt(post.likes);
				console.log('likes: ', likes);
				likes = likes + 1;
			} else {
				likes = 1;
			}
			post.likes = likes;
			console.log('post.likes updated:', post.likes);
			post.save();
			res.send({
				likes: likes
			});
		});
	}
		// getPosts: function(req, res){
		// 	console.log('getPosts req.body._id: ', req.body._id);
		// 	User.findOne({_id: req.body._id})
		// 		.populate('posts', null, 'post')
		// 		.exec(function(err, doc){
		// 			console.log('user find doc: ', doc);

		// 			// doc.populate({
		// 			// 	path: 'user',
		// 			// 	select: 'name profilePic _id',
		// 			// 	model: 'user'
		// 			// })
		// 			// .populate({
		// 			// 	path: 'postedTo',
		// 			// 	select: 'name profilePic _id',
		// 			// 	model: 'user'
		// 			// })
		// 			// .populate({
		// 			// 	path: 'cocreationSong',
		// 			// 	select: 'name _id backgroundImage',
		// 			// 	model: 'cocreationsong'
		// 			// }, function(err, pop){
		// 			// 	console.log('populating complete, pop: ', pop);
		// 			// 	// assert.equal(doc._id, pop._id);
		// 			// });

		// 			doc
		// 				.populate('user', 'name profilePic _id', 'user')
		// 				.populate('postedTo', 'name profilePic _id', 'user')
		// 				.populate('cocreationSong', 'name _id backgroundImage', 'cocreationsong')
		// 				;
		// 			console.log('posts updated: ', doc);
		// 			res.send({
		// 				user: doc
		// 			});
		// 		});
		// }
};




















module.exports = apiController;