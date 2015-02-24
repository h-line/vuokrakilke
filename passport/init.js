var login = require('./login');
var User = require('../models/user');

module.exports = function(passport){
  // Serialize user
  passport.serializeUser(function(user, done) {
    console.log('serializing user: ');console.log(user);
    done(null, user._id);
  });

  // Deserialize user
  passport.deserializeUser(function(id, done) {
    /*User.findById(id, function(err, user) {
      console.log('deserializing user:',user);
      done(err, user);
    });*/
    User.findById(id).populate("accounts", "name").exec(function(err, user) {
      console.log('deserializing user:',user);
      done(err, user);
    });
  });

  // Setting up Passport Strategies for Login and SignUp/Registration
  login(passport);
};
