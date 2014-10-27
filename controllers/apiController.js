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


var KEY = 'AKIAIHVWV3IPDGBN5OFA';
var SECRET = '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';
var BUCKET = 'tonetribe';


aws.config.update({
  accessKeyId: KEY,
  secretAccessKey: SECRET
});
var s3 = new aws.S3();
/// environments
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
///// switch to new connector..... in new student sample code example
app.use(require('connect-multiparty')());

var apiController = {
	createNewSong: function(req, res){
		var songName = req.body;
		var newSong = new CocreationSong(songName);
		newSong.save(function(err, result){
			res.send(result);
		});
	},
	addTrack: function(req, res){
		// console.log('add track req test:', req);
		//// i need to add user id!!
		var userId;
		var trackNumber = req.trackNumber;
		var trackTitle = req.trackTitle;
		var ETag = req.ETag;
		var Key = req.Key;
		var songId = req.songId;
		var trackUrl = req.url;
		console.log('trackUrl test: ', trackUrl);

		CocreationSong.findById(songId, function(err, result){
			console.log('result: ', result);
			console.log('result.tracks: ', result.tracks);
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
								Key: Key,
								userId: '',
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
		console.log('req.body test: ', key);
		var params = {Bucket: BUCKET};
		var trackUrl;
          s3.listObjects(params, function(err, data){
              var bucketContents = data.Contents;
              for (var i = 0; i < bucketContents.length; i++){
                if (key === bucketContents[i].Key){
                  console.log('key: ', key, "bucketContents[i].Key)", bucketContents[i].Key);
                  console.log('match!!!!')
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
	getTrackUrls: function(req, res){
		var trackNumAndUrls = [];
		var results;
		////// holder for all tracks to be loaded-
		var trackKeys = [[],[],[],[],[],[]];
		
			console.log('req.params: ', req.body);
			var songId = req.body.id;
			CocreationSong.findOne({_id: songId}, function(err, result){
				console.log('result: ', result);
				

				
				for (var i = 0; i < result.tracks.length; i++){
					for (var z = 0; z < result.tracks[i].userTracks.length; z++){
							var trackNum = result.tracks[i].track;
							var key = result.tracks[i].userTracks[z].Key;
							var likes = result.tracks[i].userTracks[z].likes;
							var keyAndNum = {
								Key: key,
								track: trackNum,
								likes: likes
							}

							console.log('trackNum, keyAndNum: ', trackNum, keyAndNum);
							trackKeys[trackNum].push(keyAndNum);
							
					}
				}
				console.log('trackKeys: ', trackKeys);
				
				for (var i = 0; i < trackKeys.length; i++){

			/////////////////////////  async parrallel
					async.parallel(
							    // search bucket to find urls
							    trackKeys[i].map(function(key){
														console.log('key test in map: ', key);
														var params = {Bucket: BUCKET};
														var likes = key.likes;
														var trackNum = key.track;
														key = key.Key;
														var trackUrl;

												          s3.listObjects(params, function(err, data){
												              var bucketContents = data.Contents;
												              for (var i = 0; i < bucketContents.length; i++){
												                if (key === bucketContents[i].Key){
												                  console.log('key: ', key, "bucketContents[i].Key)", bucketContents[i].Key);
												                  console.log('match!!!!')
												                  var urlParams = {Bucket: BUCKET, Key: bucketContents[i].Key};
												                  s3.getSignedUrl('getObject',urlParams, function(err, url){
												                    trackUrl = url;
												               ////////////////////////////////////
															          async.whilst(
															              function () { return trackUrl === undefined; },
															              function (callback) {

															                  console.log('Waiting for response.....');
															                  setTimeout(callback, 200);
															              },
															              function (err) {
															              	console.log('in err function...'); 	
															              }
															          );

															          ///////////// use this if i decide i need the key....
												                    		// var results = {
												                    		// 	url: trackUrl,
												                    		// 	Key: key
												                    		// };
												                   /////////  else ...
												                   			results = trackUrl;
												                   			var tAndN ={
												                   				track: trackNum,
												                   				url: results,
												                   				likes: likes
												                   			}
												                   			console.log('tAndN', tAndN);

												                    		trackNumAndUrls.push(tAndN);
												                    		console.log('trackNumAndUrls at bottom of function: ', trackNumAndUrls);

												                  });
												                }
												                 
												              }
												          });			
													}),
								
							    // this last function will be executed when
							    // all the async functions are done
							    function(err, results){
							        console.log('err async err:', err);
							        // console.log('results in async function:', results);
							    }
					);
				var loaded = 0;
				async.whilst(
			              function () { 

			              	var numberOfKeys = _.flatten(trackKeys);
			              	var num = numberOfKeys.length;
			              	console.log('num: ', num);
			              	var testNum = trackNumAndUrls.length;
			              	console.log('testNum: ', testNum);

			              	return testNum !== num; 
			              },
			              function (callback) {
			                  
			                  console.log('Waiting for all urls to be found.....');
			                  setTimeout(callback, 700);
			              },
			              function (err) {
			              	console.log('Render the page with the right info!!!!!!!!    results:', results, 'trackNumAndUrls: ', trackNumAndUrls);
				              if (loaded === 0) {
				              	loaded++;
								res.send({NumUrls: trackNumAndUrls}); 
							  }	
			              }
			          );
				}
				// console.log('trackKeys after async: ', trackKeys);
				// console.log('trackNumAndUrls at end of indexController.song: ', trackNumAndUrls);

			});
		},
};

module.exports = apiController;