var Users = require('../models/user.js');
var CocreationSong = require('../models/cocreationSong.js');
var apiController = require('./apiController.js')
var async = require('async');
var _ = require('underscore');


///// added for url grabbing...  ////////////////////////////////////////////////////
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var async = require('async');
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

//////////////////////////////////////////////////////////////////////////////////

//////// for async grabbing of urls
// var trackKeysAndUrls = [];
// var getTrackUrl = function(key){
// 		console.log('req.body test: ', key);
// 		var params = {Bucket: BUCKET};
// 		var trackUrl;
//           s3.listObjects(params, function(err, data){
//               var bucketContents = data.Contents;
//               for (var i = 0; i < bucketContents.length; i++){
//                 if (key === bucketContents[i].Key){
//                   console.log('key: ', key, "bucketContents[i].Key)", bucketContents[i].Key);
//                   console.log('match!!!!')
//                   var urlParams = {Bucket: BUCKET, Key: bucketContents[i].Key};
//                   s3.getSignedUrl('getObject',urlParams, function(err, url){
//                     trackUrl = url;

//                     var asyncCount = 0;

// 			          async.whilst(
// 			              function () { return trackUrl === undefined; },
// 			              function (callback) {
// 			                  asyncCount++;
// 			                  console.log('Waiting for response.....');
// 			                  setTimeout(callback, 200);
// 			              },
// 			              function (err) {
// 			              	console.log('in err function...'); 	
// 			              }
// 			          );
//                     		var results = {
//                     			url: trackUrl,
//                     			Key: key
//                     		};
//                     		trackKeysAndUrls.push(results);
//                     		console.log('trackKeysAndUrls at bottom of function: ', trackKeysAndUrls); 

//                   });
//                 }
                 
//               }
//           });
					
// 	}

var indexController = {
	index: function(req, res) {
			res.render('cover');
		},
	signup: function(req, res) {
			res.render('signup');
		},
	signup2: function(req, res) {
			res.render('signup2');
		},
	signup3: function(req, res) {
			res.render('signup3');
		},
	signup4: function(req, res) {
			res.render('signup4');
		},
	profileUser: function(req, res) {
			// User.find({}, function(err, response){

				res.render('profile-user')
			// });
		},
	profileBand: function(req, res) {
			res.render('profile-band');
		},
	search: function(req, res) {
			res.render('search');
		},
	searchResults: function(req, res) {
			res.render('search-results');
		},
	cocreation: function(req, res) {
				var ids = [];
				var names = [];
				var songCollection;

					CocreationSong.find({}, function(err, result){
						// console.log('result', result);
						songCollection = result;
					
						result.map(function(song){
							ids.push(song._id);
							names.push(song.name);
						});
					});

				async.whilst(
					function(){ songCollection !== undefined && names.length === songCollection.length},
					function(callback){
						// console.log('testing');
						setTimeout(callback, 5000);
					},
					function (err) {
						// console.log('ids, names, songs: ', ids, names, songCollection);	
						var songs = {
							ids: ids,
							names: names
						}
						// console.log('songs: ', songs);
						res.render('cocreation', {
							songs: songs
						});
				       
				    }
				);
		},
		song: function(req, res){
		var trackNumAndUrls = [];
		var results;
		var name;
		////// holder for all tracks to be loaded-
		var trackKeys = [[],[],[],[],[],[]];
		
			// console.log('req.params: ', req.params);
			var songId = req.params.id;
			CocreationSong.findOne({_id: songId}, function(err, result){
				// console.log('result: ', result);
				name = result.name;

				
				for (var i = 0; i < result.tracks.length; i++){
					for (var z = 0; z < result.tracks[i].userTracks.length; z++){
							var trackNum = result.tracks[i].track;
							var key = result.tracks[i].userTracks[z].Key;
							var keyAndNum = {
								Key: key,
								track: trackNum
							}

							// console.log('trackNum, keyAndNum: ', trackNum, keyAndNum);
							trackKeys[trackNum].push(keyAndNum);
							
					}
				}
				// console.log('trackKeys: ', trackKeys);
				
				for (var i = 0; i < trackKeys.length; i++){

			/////////////////////////  async parrallel
					async.parallel(
							    // pass an array of built functions
							    trackKeys[i].map(function(key){
														// console.log('key test in map: ', key);
														var params = {Bucket: BUCKET};

														var trackNum = key.track;
														key = key.Key;
														var trackUrl;

												          s3.listObjects(params, function(err, data){
												              var bucketContents = data.Contents;
												              for (var i = 0; i < bucketContents.length; i++){
												                if (key === bucketContents[i].Key){
												                  // console.log('key: ', key, "bucketContents[i].Key)", bucketContents[i].Key);
												                  // console.log('match!!!!')
												                  var urlParams = {Bucket: BUCKET, Key: bucketContents[i].Key};
												                  s3.getSignedUrl('getObject',urlParams, function(err, url){
												                    trackUrl = url;
												               ////////////////////////////////////
															          async.whilst(
															              function () { return trackUrl === undefined; },
															              function (callback) {

															                  // console.log('Waiting for response.....');
															                  setTimeout(callback, 200);
															              },
															              function (err) {
															              	// console.log('in err function...'); 	
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
												                   				url: results
												                   			}
												                   			// console.log('tAndN', tAndN);

												                    		trackNumAndUrls.push(tAndN);
												                    		// console.log('trackNumAndUrls at bottom of function: ', trackNumAndUrls);

												                  });
												                }
												                 
												              }
												          });			
													}),
								
							    // this last function will be executed when
							    // all the async functions are done
							    function(err, results){
							        // console.log('err async err:', err);
							        console.log('results in async function:', results);
							    }
					);
				var loaded = 0;
				async.whilst(
			              function () { 

			              	var numberOfKeys = _.flatten(trackKeys);
			              	var num = numberOfKeys.length;
			              	// console.log('num: ', num);
			              	var testNum = trackNumAndUrls.length;
			              	// console.log('testNum: ', testNum);

			              	return testNum !== num; 
			              },
			              function (callback) {
			                  
			                  // console.log('Waiting for all urls to be found.....');
			                  setTimeout(callback, 700);
			              },
			              function (err) {
			              	// console.log('Render the page with the right info!!!!!!!!    results:', results, 'trackNumAndUrls: ', trackNumAndUrls);
				              if (loaded === 0) {
				              	loaded++;
								res.render('song', {
									// song: results,
									name: name,
									NumUrls: trackNumAndUrls
								}); 
							  }	
			              }
			          );
				}
				// console.log('trackKeys after async: ', trackKeys);
				// console.log('trackNumAndUrls at end of indexController.song: ', trackNumAndUrls);

			});
		},
	liveStream: function(req, res) {
			res.render('live-stream');
		},
	submitSearch: function(req, res) {
			res.render('search-results');
	}
};

module.exports = indexController;