var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    console.log("In user list...");
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        console.log(result);
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

/*
 * Send email.
 */
router.post('/sendemail/:id', function(req, res) {
	console.log("Sending email...");

	var db = req.db;
	var collection = db.get('userlist');
	var userToEmail = req.params.id;
	console.log(userToEmail);
	var obj_id = new ObjectID(userToEmail);
	collection.findOne({_id: obj_id}, function(error, doc) {
		console.log("Printing docs from Array " + JSON.stringify(doc));
		var transporter = nodemailer.createTransport({
        	service: 'Gmail',
        	auth: {
            	user: 'easy.and.tidy@gmail.com', // Your email id
            	pass: '!a1q2w3e' // Your password
        	}
    	});

    	var text = 'Hello world to \n\n' + doc.fullname;

    	var mailOptions = {
    		from: 'easy.and.tidy@gmail.com', // sender address
    		to: doc.email, // list of receivers
    		subject: 'Email Example', // Subject line
    		text: text //, // plaintext body
    		// html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
		};

		transporter.sendMail(mailOptions, function(error, info) {
    		if(error) {
        		console.log(error);
        		res.json({yo: 'error'});
    		} else {
        		console.log('Message sent: ' + info.response);
        		res.json({yo: info.response});
    		};
		});
	});


});


module.exports = router;
