var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var async = require('async');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy
var passportConfig = require('./config/passport');
var moment = require('moment');
var _ = require('underscore');


var authenticationController = require('./controllers/authentication.js');
var indexController = require('./controllers/index.js');
var apiController = require('./controllers/apiController.js');
var User = require('./models/user.js');
var CocreationSong = require('./models/cocreationSong.js');


// var CocreationSong = require('./models/cocreationSong.js')

mongoose.connect('mongodb://localhost/toneTribe');
/// if no users, add a few for testing
require('./models/seeds/userSeed.js');

////////////////////////////////////////////
//for aws
var http = require('http');
var path = require('path');
var aws = require('aws-sdk');
var fs = require('fs');

var KEY, SECRET;
if(process.env.AWS_KEY){
  // if the process has AWS_KEY set, we'll use those values
  KEY = process.env.AWS_KEY;
  SECRET = process.env.AWS_SECRET;
} else {
  // if the process doesn't have stuff set, we'll load in our config file
  var privateSettings = require('./private.js');
  KEY = privateSettings.aws.key;
  SECRET = privateSettings.aws.secret;
}

var BUCKET = 'tonetribe';


aws.config.update({
  accessKeyId: KEY,
  secretAccessKey: SECRET
});
var s3 = new aws.S3();
////////////////////////////////////////////

/// express app, environments
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser());
app.use(cookieParser());
app.use(flash());
app.use(session({secret: 'secret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('connect-multiparty')());
///// switch to new connector..... in new student sample code example
// var multer = require('multer');

////////////////////////////////////////////
////// passport

// Our get request for viewing the login page
app.get('/auth/login', authenticationController.login);

// Post received from submitting the login form
app.post('/auth/login', authenticationController.processLogin);

// Post received from submitting the signup form
app.post('/auth/signup', authenticationController.processSignup);

// Any requests to log out can be handled at this url
app.get('/auth/logout', authenticationController.logout);

/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
app.get('/', indexController.index);
app.get('/signup', indexController.signup);



// ***** IMPORTANT ***** //
// By including this middleware (defined in our config/passport.js module.exports),
// We can prevent unauthorized access to any route handler defined after this call
// to .use()

app.use(passportConfig.ensureAuthenticated);

////////////////////////////////////////////
// Because these routes occur after the ensureAuthenticated middleware, they will require
// authentication before access is allowed.

app.get('/signup2', indexController.signup2);
app.get('/signup3', indexController.signup3);
app.get('/signup4', indexController.signup4);
app.get('/profile', indexController.viewProfile);
app.get('/profile-user', indexController.profileUser);
app.get('/profile-band', indexController.profileBand);
app.get('/search', indexController.search);
app.get('/cocreation', indexController.cocreation);
app.get('/cocreation-user', indexController.cocreationUser);
app.get('/song', indexController.song);
app.get('/search-results', indexController.searchResults);
app.get('/live-stream', indexController.liveStream);
app.post('/addUser', apiController.addUser);
app.post('/updateUser', apiController.updateUser);
app.post('/updateUserFromClient', apiController.updateUserFromClient);
app.post('/updateUser2', apiController.updateUser2);
app.post('/updateUser3', apiController.updateUser3);
app.post('/api/findUsers', apiController.findUsers);
app.post('/submitSearch', indexController.submitSearch);
app.post('/api/getTrackUrls', apiController.getTrackUrls);
app.post('/api/createNewSong', apiController.createNewSong);
app.post('/api/postComment', apiController.postComment);
app.post('/api/getComments', apiController.getComments);
app.get('/api/getSongs', apiController.getSongs);
app.get('/api/getAllCocreations', apiController.getAllCocreations);
app.post('/uploadSongBackgroundPic', apiController.uploadSongBackgroundPic);
app.post('/api/addCommentLike', apiController.addCommentLike);
app.post('/api/updateUserProfile', apiController.updateUserProfile);
app.post('/api/addPost', apiController.addPost);
app.post('/api/isNewUserFalse', apiController.isNewUserFalse);
app.post('/api/addToTribe', apiController.addToTribe);
app.post('/api/getTribe', apiController.getTribe);
app.post('/api/addMedia', apiController.addMedia);
app.get('/api/getAllPosts', apiController.getAllPosts);


////////////////////////////////////////////
/// uploads

app.post('/uploadProfilePic', function (req, res){
  console.log('req.files on uploadProfilePic: ', req.files);
  console.log('req.body on uploadProfilePic: ', req.body);
  var fName = req.files.image.name;
      var fPath = req.files.image.path;
      var cType = req.files.image.type;
      var size = req.files.image.size;
      var image = req.body;

      var id = req.body._id;
      var profileUrl = 'https://s3.amazonaws.com/tonetribe/public/' + fName;

      console.log('profileUrl, id', profileUrl, id);

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
          User.findOne({_id: req.user._id},function(err, result){
              result.profilePic = profileUrl;
              result.save();
              res.redirect('profile-user');
          });  
        });

      });
});
app.post('/uploadBackgroundPic', function (req, res){
  console.log('req.files on uploadProfilePic: ', req.files);
  console.log('req.body on uploadProfilePic: ', req.body);
  var fName = req.files.image.name;
      var fPath = req.files.image.path;
      var cType = req.files.image.type;
      var size = req.files.image.size;
      var image = req.body;

      var id = req.body._id;
      var backgroundUrl = 'https://s3.amazonaws.com/tonetribe/public/' + fName;

      console.log('backgroundUrl, id', backgroundUrl, id);

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
          User.findOne({_id: req.user._id},function(err, result){
              result.backgroundPic = backgroundUrl;
              result.save();
              res.redirect('profile-user');
          });  
        });

      });
});


app.post('/submitTrack', function (req, res) {
      console.log('req.body on submitTrack', req.body);
      console.log('req.user on submitTrack: ', req.user._id, req.user);
      var fName = req.files.audio.name;
      var fPath = req.files.audio.path;
      var cType = req.files.audio.type;
      var size = req.files.audio.size;
      var audio = req.body;

      var key = 'public/' + fName;
      var trackTitle = req.body.trackTitle;
      var id = req.body.id;
      var trackNumber = req.body.trackNum;
      var trackUrl = 'https://s3.amazonaws.com/tonetribe/public/' + fName;

      console.log('id on appjs', id);
              var track = {
                  Key: key,
                  trackTitle: trackTitle,
                  userId: req.user._id,
                  userPic: req.user.profilePic,
                  userName: req.user.name,
                  songId: id,
                  trackNumber: trackNumber,
                  url: trackUrl
              };
        var trackId = apiController.addTrack(track);
        console.log('trackId: ', trackId);
        var userSongs = _.union(req.user.cocreationSongs, req.user.cocreationCollaborations);
        console.log('userSongs: ', userSongs);
        var isNewTrack = true;
        for (var i = 0; i < userSongs.length; i++){
          var testId = userSongs[i].toString();
          testId = testId.trim();
          if (id === testId){
            isNewTrack = false;
            console.log('not isNewTrack');
          }
        }
        if(isNewTrack){
          console.log('isNewTrack');
          req.user.cocreationCollaborations.push(id);
          req.user.save();
        }

        CocreationSong.findOne({_id: id}, function(err, song){
            song.users.push(req.user._id);
            song.save();
        });
     
      fs.readFile(fPath, function (err, data) {
        console.log(err);
        s3.putObject({
            Bucket: BUCKET,
            Key: 'public/' + fName,
            ACL: 'public-read',
            Body: data
          }, function (err, result) {
              console.log(err, result);
              console.log('finishing with upload.......', id);
        console.log('about to render.........id: ', id);
        res.redirect('song?id=' + id);
      });
        });
    }
  );
app.post('/submitPrivate', function (req, res) {
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
});
app.use(passportConfig.ensureAuthenticated);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});








// app.post('/submitFoundation', function (req, res) {

//   var fName = req.files.audio.name;
//   var fPath = req.files.audio.path;
//   var cType = req.files.audio.type;
//   var size = req.files.audio.size;
//   var audio = req.body;

//   var key = 'public/' + fName;
//   var trackTitle = req.body.trackTitle;
//   var songId = req.body.id;
//   var trackNumber = req.body.trackNumber;
//   var trackUrl = 'https://s3.amazonaws.com/tonetribe/' + key;

//   console.log('trackNumber, trackUrl', trackNumber, trackUrl);
 
//   fs.readFile(fPath, function (err, data) {
//     console.log(err);
//     s3.putObject({
//         Bucket: BUCKET,
//         Key: 'public/' + fName,
//         ACL: 'public-read',
//         Body: data
//       }, function (err, result) {
//           console.log(err, result);
//           var track = {
          
//                 Key: key,
//                 trackTitle: trackTitle,
//                 ETag: trackETag,
//                 songId: songId,
//                 trackNumber: trackNumber,
//                 url: trackUrl
//           };

//           apiController.addTrack(track);

//         });
   
//     res.redirect('/song/' + songId);
//   });
// });
////////////////////////////////////////////
/*
  Files uploaded here will be
  publicly accessible
 */
// app.post('/submitTrack',function (req, res) {

//   var fName = req.files.audio.name;
//   var fPath = req.files.audio.path;
//   var cType = req.files.audio.type;
//   var size = req.files.audio.size;
//   var audio = req.body;

//   var key = 'public/' + fName;
//   var trackTitle = req.body.trackTitle;
//   var songId = req.body.id;
//   var trackNumber = req.body.trackNumber;
 
//   fs.readFile(fPath, function (err, data) {
//     console.log(err);
//     s3.putObject({
//         Bucket: BUCKET,
//         Key: 'public/' + fName,
//         ACL: 'public-read',
//         Body: data
//       }, function (err, result) {
//           console.log(err, result);

//           var track = {
//               Key: key,
//               trackTitle: trackTitle,
//               ETag: trackETag,
//               songId: songId,
//               trackNumber: trackNumber,
//               url: trackUrl
//           };

//               apiController.addTrack(track);
        
//         });
   
//     res.redirect('/song/' + songId);
//   });
// });

/*
  Files uploaded here will only be
  accessible to the owner of the amazon
  account. The 'view' route will act as
  a gate to the content; a proxy.
 */


//// get urls of all bucket items...
// var params = {Bucket: BUCKET};
// s3.listObjects(params, function(err, data){
//     var bucketContents = data.Contents;
//     for (var i = 0; i < bucketContents.length; i++){
//         var urlParams = {Bucket: BUCKET, Key: bucketContents[i].Key};
//         s3.getSignedUrl('getObject',urlParams, function(err, url){
//           // console.log('the url of the image is', url);
//           // console.log('urlParams: ', urlParams);

//         });
//     }
// });


/*
  View the privately saved files by accessing
  them through s3 directly.
 */
// app.get('/view', function (req, res) {
//   s3.getObject({
//     Bucket: BUCKET,
//     Key: req.query.key
//   }, function (err, data) {
//     res.writeHead(200, {'Content-Type': data.ContentType });
//     // console.log(data);
//     res.end(data.Body);
//   });
// });
