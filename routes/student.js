var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get('/:id', function(req, res) {
    var db = req.db;
	var collection = db.get('userlist');
	var user_to_get = req.params.id;
	// console.log(user_to_get);
	var obj_id = new ObjectID(user_to_get);

	collection.findOne({_id: obj_id}, function(error, doc) {
		console.log("Printing docs from Array " + JSON.stringify(doc));
		res.render('student', doc);
    });
});

router.get('/addapplication/:id', function(req, res) {
    var db = req.db;
	var collection = db.get('userlist');
	var user_to_get = req.params.id;
	console.log(user_to_get);
	var obj_id = new ObjectID(user_to_get);

	collection.findOne({_id: obj_id}, function(error, doc) {
		console.log("Printing docs from Array " + JSON.stringify(doc));
		res.render('addapplication', doc);
    });
});

router.post('/fullname/:id', function(req, res) {
    // res.render('student', { title: "test" });
 
    var db = req.db;
	var collection = db.get('userlist');
	console.log("In posting fullname");
	console.log(req.params);
	var user_to_update = req.params.id;
	console.log(user_to_update);
	// console.log(req);
	collection.update({_id: ObjectID(user_to_update)}, {$set: {fullname: req.body.value}}, function(err, result) {
		res.send(
            (err === null) ? req.body.value : { msg: err }
        );
	});
});

router.post('/gender/:id', function(req, res) {
    // res.render('student', { title: "test" });
 
    var db = req.db;
	var collection = db.get('userlist');
	console.log("In posting gender");
	console.log(req.params);
	var user_to_update = req.params.id;
	console.log(user_to_update);
	// console.log(req);
	collection.update({_id: ObjectID(user_to_update)}, {$set: {gender: req.body.value}}, function(err, result) {
		res.send(
            (err === null) ? req.body.value : { msg: err }
        );
	});
});

router.post('/dob/:id', function(req, res) {
    // res.render('student', { title: "test" });
 
    var db = req.db;
	var collection = db.get('userlist');
	console.log("In posting dob");
	console.log(req.params);
	var user_to_update = req.params.id;
	console.log(user_to_update);
	// console.log(req);
	collection.update({_id: ObjectID(user_to_update)}, {$set: {dob: req.body.value}}, function(err, result) {
		res.send(
            (err === null) ? req.body.value : { msg: err }
        );
	});
});

router.post('/email/:id', function(req, res) {
    // res.render('student', { title: "test" });
 
    var db = req.db;
	var collection = db.get('userlist');
	console.log("In posting email");
	console.log(req.params);
	var user_to_update = req.params.id;
	console.log(user_to_update);
	// console.log(req);
	collection.update({_id: ObjectID(user_to_update)}, {$set: {email: req.body.value}}, function(err, result) {
		res.send(
            (err === null) ? req.body.value : { msg: err }
        );
	});
});

router.post('/phone/:id', function(req, res) {
    // res.render('student', { title: "test" });
 
    var db = req.db;
	var collection = db.get('userlist');
	console.log("In posting phone");
	console.log(req.params);
	var user_to_update = req.params.id;
	console.log(user_to_update);
	// console.log(req);
	collection.update({_id: ObjectID(user_to_update)}, {$set: {phone: req.body.value}}, function(err, result) {
		res.send(
            (err === null) ? req.body.value : { msg: err }
        );
	});
});

router.post('/address/:id', function(req, res) {
    // res.render('student', { title: "test" });
 
    var db = req.db;
	var collection = db.get('userlist');
	console.log("In posting phone");
	console.log(req.params);
	var user_to_update = req.params.id;
	console.log(user_to_update);
	// console.log(req);
	collection.update({_id: ObjectID(user_to_update)}, {$set: {address: req.body.value}}, function(err, result) {
		res.send(
            (err === null) ? req.body.value : { msg: err }
        );
	});
});
/*
router.get('/:id/info', function(req, res) {
    // console.log("id: " + req.params.id);
    // query db and get all info
    var db = req.db;
	var collection = db.get('userlist');
	var user_to_get = req.params.id;
	console.log(user_to_get);
	var obj_id = new ObjectID(user_to_get);

	collection.findOne({_id: obj_id}, function(error, doc) {
		console.log("Printing docs from Array " + JSON.stringify(doc));
		res.json(doc);
    });
}); */

module.exports = router;
