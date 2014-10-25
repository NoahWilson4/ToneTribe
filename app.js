var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var apiController = require('./controllers/apiController.js')
var mongoose = require('mongoose');

var CocreationSong = require('./models/cocreationSong.js')


//for aws
var http = require('http');
var path = require('path');
var aws = require('aws-sdk');
var fs = require('fs');

mongoose.connect('mongodb://localhost/toneTribe');

var KEY = 'AKIAIHVWV3IPDGBN5OFA';
var SECRET = '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';
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




//// get urls of all bucket items...
var params = {Bucket: BUCKET};
s3.listObjects(params, function(err, data){
    var bucketContents = data.Contents;
    for (var i = 0; i < bucketContents.length; i++){
        var urlParams = {Bucket: BUCKET, Key: bucketContents[i].Key};
        s3.getSignedUrl('getObject',urlParams, function(err, url){
          console.log('the url of the image is', url);
          console.log('urlParams: ', urlParams);

        });
    }
});


/*
  Files uploaded here will be
  publicly accessible
 */
app.post('/submitPublic', function (req, res) {
  if (req) {
      console.log('yes!!!!!', req.body);
    }
  var fName = req.files.audio.name;
  var fPath = req.files.audio.path;
  var cType = req.files.audio.type;
  var size = req.files.audio.size;
  var audio = req.body;
  console.log(audio);

  var key = 'public/' + fName;
  var track = {
    Key: key
  };


  fs.readFile(fPath, function (err, data) {
    console.log(err);
    s3.putObject({
      Bucket: BUCKET,
      Key: 'public/' + fName,
      ACL: 'public-read',
      Body: data
    }, function (err, result) {
      console.log(err, result);
      res.redirect('song:id');
      console.log('uploaded?');
    });
  });
});

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

/*
  View the privately saved files by accessing
  them through s3 directly.
 */
app.get('/view', function (req, res) {
  s3.getObject({
    Bucket: BUCKET,
    Key: req.query.key
  }, function (err, data) {
    res.writeHead(200, {'Content-Type': data.ContentType });
    // console.log(data);
    res.end(data.Body);
  });
});

app.get('/cocreation', function(req, res) {
  console.log('bucket: ', BUCKET)
  s3.listObjects({
    Bucket: BUCKET,
  }, function (err, data) {
  	console.log('data: ', data);
    res.render('cocreation', {s3: data});
  });
});


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

app.post('/search', indexController.submitSearch);
app.post('/api/createNewSong', apiController.createNewSong);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
