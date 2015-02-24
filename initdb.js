var mongoose = require('mongoose');
var User = require('./models/user');
var bCrypt = require('bcrypt-nodejs');
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/test');
function createHash(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function createAdmin(){
  // find a user in Mongo with provided username
  User.findOne({'username':'admin'},function(err, user) {
    // In case of any error return
    if (err){
      console.log('Error in login: '+err);
      return err;
    }
    // already exists
    if (user) {
      console.log('User already exists');
      return 'User Already Exists';
    } 
    else {
      // if there is no user with that email
      // create the user
      var newUser = new User();
      // set the user's local credentials
      newUser.username = "admin";
      newUser.password = createHash("admin");
      newUser.email = "lauri.halinen@aalto.fi";
      // save the user
      newUser.save(function(err) {
        if (err){
          console.log('Error in Saving user: '+err); 
          throw err; 
        }
        console.log('User Registration succesful');   
        return newUser;
      });
    }
  });
};

createAdmin();
