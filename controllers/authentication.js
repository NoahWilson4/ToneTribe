// We'll need access to passport in order to call authentication methods
var passport = require('passport');

// We also will be using our User model
var User = require('../models/user');
var apiController = require('./apiController.js');



var ageConvert = function(birthdate) {
    var birthday = birthdate;
    birthday = birthday.split('-');
    var now = new Date();
    var year = now.getYear() + 1900;
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var today =[];
    today.push(year, month, date);
    for (var i = 0; i < birthday.length; i++) {
      birthday[i] = Number(birthday[i]);
    };
    var age = today[0] - birthday[0];
    if (birthday[1] >= today[1] && birthday[2] > today[2]) {
      age--;
    }
    return age;
  };

  // capricorn 12-22 1-19
  // aquarius 1-20 2-19
  // pisces 2-20 3-20
  // aries 3-21 4-19
  // taurus 4-20 5-20
  // gemini 5-21 6-20
  // cancer 6-21 7-22
  // leo 7-23 8-22
  // virgo 8-23 9-22
  // libra 9-23 10-23
  // scorpio 10-24 11-22 
  // sagittarius 11-23 12-21

  var astroConvert = function(birthdate) {
    var birthday = birthdate;
    birthday = birthday.split('-');
    birthday.shift();
    for (var i = 0; i < birthday.length; i++) {
      birthday[i] = Number(birthday[i]);
    };
    console.log('birthday: ', birthday);
    if ((birthday[0] === 12 && birthday[1] >= 22) || (birthday[0] === 1 && birthday[1] <= 19)) {
      var sign = 'Capricorn';
    } else if ((birthday[0] === 1 && birthday[1] >= 20) || (birthday[0] === 2 && birthday[1] <= 19)) {
      var sign = 'Aquarius';
    } else if ((birthday[0] === 2 && birthday[1] >= 20) || (birthday[0] === 3 && birthday[1] <= 20)) {
      var sign = 'Pisces';
    } else if ((birthday[0] === 3 && birthday[1] >= 21) || (birthday[0] === 4 && birthday[1] <= 19)) {
      var sign = 'Aries';
    } else if ((birthday[0] === 4 && birthday[1] >= 20) || (birthday[0] === 5 && birthday[1] <= 20)) {
      var sign = 'Taurus';
    } else if ((birthday[0] === 5 && birthday[1] >= 21) || (birthday[0] === 6 && birthday[1] <= 20)) {
      var sign = 'Gemini';
    } else if ((birthday[0] === 6 && birthday[1] >= 21) || (birthday[0] === 7 && birthday[1] <= 22)) {
      var sign = 'Cancer';
    } else if ((birthday[0] === 7 && birthday[1] >= 23) || (birthday[0] === 8 && birthday[1] <= 22)) {
      var sign = 'Leo';
    } else if ((birthday[0] === 8 && birthday[1] >= 23) || (birthday[0] === 9 && birthday[1] <= 22)) {
      var sign = 'Virgo';
    } else if ((birthday[0] === 9 && birthday[1] >= 23) || (birthday[0] === 10 && birthday[1] <= 24)) {
      var sign = 'Libra';
    } else if ((birthday[0] === 10 && birthday[1] >= 24) || (birthday[0] === 11 && birthday[1] <= 22)) {
      var sign = 'Scorpio';
    } else if ((birthday[0] === 11 && birthday[1] >= 23) || (birthday[0] === 12 && birthday[1] <= 21)) {
      var sign = 'Scorpio';
    } 
    console.log('sign: ', sign);
    return sign;  
  };







/**
 * A utility function (since we'll use it a couple times)
 * to abstract out the actual login procedure, which can
 * be used during authentication or signup. Because it
 * mirrors the middleware that calls it, the parameter
 * structure matches. We also need to know the user model
 * we want to log in.
 */
var performLogin = function(req, res, next, user){
   console.log('performLogin');
  // Passport injects functionality into the express ecosystem,
  // so we are able to call req.login and pass the user we want
  // logged in.
  req.login(user, function(err){
     console.log('performLogin inside first function');
    // If there was an error, allow execution to move to the next middleware
    if(err) return next(err);
 console.log('performLogin after if');
    // Otherwise, send the user to the homepage.
    return res.redirect('/profile-user'); ///*************
  });
};

/**
 * Our base authentication controller object
 */
var authenticationController = {

  // The route-handler for the /auth/login route. Meant to be
  // a page view that only shows login forms
  login: function(req, res){
    // Render the login jade template.
    // We are using the "flash" system, which are variables
    // that can be sent from view to view and are removed
    // after use. Useful for quick messages like "failed to login."
    // In this case, we pull any existing flash message id'd as "error"
    // and pass it to the view.
    res.render('cover', {
      error: req.flash('error')
    });
  },

  // This is the post handler for any incoming login attempts.
  // Passing "next" allows us to easily handle any errors that may occur.
  processLogin: function(req, res, next){
    console.log('processLogin');
    // Passport's "authenticate" method returns a method, so we store it
    // in a variable and call it with the proper arguments afterwards.
    // We are using the "local" strategy defined (and used) in the
    // config/passport.js file
    var authFunction = passport.authenticate('local', function(err, user, info){

      // If there was an error, allow execution to move to the next middleware
      if(err) return next(err);
       console.log('processLogin after first if');
      // If the user was not successfully logged in due to not being in the
      // database or a password mismatch, set a flash variable to show the error
      // which will be read and used in the "login" handler above and then redirect
      // to that handler.
      if(!user) {
        req.flash('error', 'Error logging in. Please try again.');
         console.log('processLogin inside 2nd if');
        return res.redirect('/auth/login');
      }
       console.log('processLogin after 2nd if');
      // If we make it this far, the user has correctly authenticated with passport
      // so now, we'll just log the user in to the system.
      performLogin(req, res, next, user);
    });
 console.log('processLogin after performLogin');
    // Now that we have the authentication method created, we'll call it here.
    authFunction(req, res, next);
  },

  // Slightly different from our login procedure, the signup process
  // will allow new users to create an account. It will immediately try to
  // create the new user and rely on mongoose to throw any duplication errors.
  // If none are found, the user is successfully added to the DB, it is safe to
  // assume that they are ready to log in, so we do that as well.
  processSignup: function(req, res, next){
    console.log('processSignup.body: ', req.body);
    console.log('req.files processSignup: ', req.files);
    console.log('req.param processSignup: ', req.params);
    console.log('req.param processSignup: ', req.params);


    var birthdate = req.param('birthdate');
    var age = ageConvert(birthdate);
    var astro = astroConvert(birthdate);

    console.log('req.files.profilePic: ', req.files.profilePic);
    apiController.uploadProfilePic(req.files.profilePic);
    apiController.uploadProfilePic(req.files.backgroundPic);

    var profilePic = 'https://tonetribe.s3.amazonaws.com/public/' + req.files.profilePic.name;
    var backgroundPic = 'https://tonetribe.s3.amazonaws.com/public/' + req.files.backgroundPic.name;
    console.log('profilePic, backgroundPic: ', profilePic, backgroundPic);
    // Create a new instance of the User model with the data passed to this
    // handler. By using "param," we can safely assume that this route will
    // work regardless of how the data is sent (post, get).
    // It is safer to send as post, however, because the actual data won't
    // show up in browser history.
    var user = new User({
      name: req.param('name'),
      password: req.param('password'),
      email: req.param('email'),
      location: req.param('location'),
      bands: req.param('bands').toString().split(','),
      profilePic: profilePic,
      backgroundPic: backgroundPic,
      instruments: req.param('instruments').toString().split(','),
      styles: req.param('styles').toString().split(','),
      skills: req.param('skills').toString().split(','),
      inspirations: req.param('inspirations').toString().split(','),
      improvComp: req.param('improvComp'),
      birthdate: req.param('birthdate'),
      age: age,
      astro: astro,
      about: req.param('about'),
      philosophy: req.param('philosophy')
    });

    console.log('user test: ', user);

    // Now that the user is created, we'll attempt to save them to the
    // database.
    user.save(function(err, user){

      // If there is an error, it will come with some special codes and
      // information. We can customize the printed message based on
      // the error mongoose encounters
      if(err) {

        // By default, we'll show a generic message...
        var errorMessage = 'An error occured, please try again';

        // If we encounter this error, the duplicate key error,
        // this means that one of our fields marked as "unique"
        // failed to validate on this object.
        if(err.code === 11000){
          errorMessage = 'This user already exists.';
        }

        // Flash the message and redirect to the login view to
        // show it.
        req.flash('error', errorMessage);
        return res.redirect('/auth/login');
      }

      // If we make it this far, we are ready to log the user in.
      performLogin(req, res, next, user);
    });
  },

  // Handle logout requests
  logout: function(req, res){

    // Passport injects the logout method for us to call
    req.logout();

    // Redirect back to the login page
    res.redirect('/auth/login');
  }
};

// Export our controller methods
module.exports = authenticationController;