var express = require('express');
var router = express.Router();
var User = require('../models/user');

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
};

var isAuthenticatedJSON = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.status(403).json({error:"forbidden"});
};
	
module.exports = function(passport) {
  
  // GET Main page
  router.get('/', isAuthenticated, function(req, res){
    res.render('index', {user: req.user});
  });
  
  // GET Login page
  router.get('/login', function(req, res){
    res.render('login');
  });

  // POST Login page
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
  
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });  
  
  return router;
};
