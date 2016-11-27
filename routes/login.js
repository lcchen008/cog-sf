var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/authenticate', function(req, res, next) {
  console.log("Authenticating...");
});

module.exports = router;
