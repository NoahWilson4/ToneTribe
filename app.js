var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var apiController = require('./controllers/apiController.js')
var mongoose = require('mongoose');
var async = require('async');

var CocreationSong = require('./models/cocreationSong.js')

mongoose.connect('mongodb://localhost/toneTribe');

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

require('./models/seeds/userSeed.js');

/// environments
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

///// switch to new connector..... in new student sample code example
app.use(require('connect-multiparty')());
// var multer = require('multer');

app.post('/submitFoundation', function (req, res) {

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
});
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


app.get('/cocreation', indexController.cocreation);
// app.get('/api/getTrackUrls/:id', apiController.getTrackUrls);

app.get('/', indexController.index);
app.get('/signup', indexController.signup);
app.get('/signup2', indexController.signup2);
app.get('/signup3', indexController.signup3);
app.get('/signup4', indexController.signup4);
app.get('/profile-user', indexController.profileUser);
app.get('/profile-band', indexController.profileBand);
app.get('/search', indexController.search);
app.get('/search-results', indexController.searchResults);
// app.get('/cocreation', indexController.cocreation);
app.get('/live-stream', indexController.liveStream);
app.get('/song/:id', indexController.song);
app.post('/api/findUsers', apiController.findUsers);



app.post('/submitSearch', indexController.submitSearch);

app.post('/api/createNewSong', apiController.createNewSong);
app.post('/api/getTrackUrls', apiController.getTrackUrls);
app.post('/submitFoundation', apiController.submitFoundation);
// app.post('/submitTrack', apiController.submitTrack);
app.post('/submitPrivate', apiController.submitPrivate);


app.post('/submitTrack', function (req, res) {
      console.log('req.body on submitTrack', req.body);



      var fName = req.files.audio.name;
      var fPath = req.files.audio.path;
      var cType = req.files.audio.type;
      var size = req.files.audio.size;
      var audio = req.body;

      var key = 'public/' + fName;
      var trackTitle = req.body.trackTitle;
      var id = req.body.id;
      var trackNumber = req.body.trackNumber;

      console.log('id on appjs', id);
              var track = {
                  Key: key,
                  trackTitle: trackTitle,
                  // ETag: trackETag,
                  songId: id,
                  trackNumber: trackNumber,
                  // url: trackUrl
              };
        apiController.addTrack(track);
     
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
            
            });
       console.log('about to render.........id: ', id);
        res.render('song', {
          id: id
        });
        
      });
    }
  )

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
