var express = require('express');
var nodemailer = require('nodemailer');
const multer = require('multer');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const upload = multer({ dest: 'uploads/' });
const path = require('path');
const fs = require('fs');

router.get('/:id', function(req, res) {
    var db = req.db;
	var collection = db.get('userlist');
	var user_to_get = req.params.id;
	// console.log(user_to_get);
	var obj_id = new ObjectID(user_to_get);
	const redis_client = req.redis_client;

	collection.findOne({_id: obj_id}, function(error, doc) {
		console.log("Printing docs from Array " + JSON.stringify(doc));
		var name = doc.fullname;
		// record the count of the times that the name is queried
		redis_client.incr(name, function(err, reply) {
  			console.log(reply);
		});
		res.render('student', doc);
    });
});

router.get('/profilepic/:id', function(req, res) {
	console.log("In get profilepic for " + req.params.id);
	var image_model = req.image_model;
	const redis_client = req.redis_client;
	image_model.findOne({ userid: req.params.id }, (error, result) => {
		if (error) {
			console.log(error);
			res.writeHead(500, { 'Content-Type': 'text/plain' });
        	res.end('An error occurred while retrieving the image.');
        	return;
		}

		imageData = null;

		if (!result) {
			// Send default profile pic to the client
			console.log('Image not found, using default.');
			imageData = fs.readFileSync('public/images/img_avatar2.png');
      	} else {
      		imageData = result.data;
      	}

      	const base64Image = imageData.toString('base64');

      	console.log('Image size: ' + imageData.length);

      	res.writeHead(200, {
        	'Content-Type': 'image/png',
        	'Content-Length': imageData.length
      	});
      	res.end(imageData);
	});

});

router.post('/profilepic/:id', upload.single('file'), function (req, res) {
	console.log("In profilepic upload for " + req.params.id);
	console.log('file path: ' + path.join(__dirname, '/uploads/', req.file.filename));
	console.log(req.file);

	var image_model = req.image_model;
	image_model.findOne({ userid: req.params.id }, (error, result) => {
		if (error) {
			console.log(error);
			res.writeHead(500, { 'Content-Type': 'text/plain' });
        	res.end('An error occurred while retrieving the image.');
        	return;
		}

		const fileData = fs.readFileSync(req.file.path);
		if (!result) {
			var imgModel = req.image_model;
			const file = new imgModel({
    			data: fileData,
    			userid: req.params.id,
    			contentType: req.file.mimetype
  			});

			file.save(function (error) {
				if (error) {
					console.log(error);
      				res.send('Error saving file to database');
    			} else {
      				res.send('File saved to database');
    			}
  			});
      	} else {
      		result.data = fileData;
      		result.save();
      	}
	});


	// var imgModel = req.image_model;
	// const fileData = fs.readFileSync(req.file.path);
	// const file = new imgModel({
    // 	data: fileData,
    // 	userid: req.params.id,
    // 	contentType: req.file.mimetype
  	// });

	// file.save(function (error) {
	// 	if (error) {
	// 		console.log(error);
    //   		res.send('Error saving file to database');
    // 	} else {
    //   		res.send('File saved to database');
    // 	}
  	// });
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
	console.log(req);
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
