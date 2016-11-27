var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('schools', { title: 'Student Management System' });
});


/*
 * GET schoollist.
 */
router.get('/schoollist', function(req, res) {
    var db = req.db;
    var collection = db.get('schoollist');
    console.log("In schoollist ...");
    collection.find({},{},function(e,docs){
        // console.log(docs);
        res.json(docs);
    });
});

/*
 * GET schoollistpairs.
 */
router.get('/schoollistpairs', function(req, res) {
    var db = req.db;
    var collection = db.get('schoollist');
    console.log("In schoollist ...");
    
    collection.find({}, {name: 1, _id: 1}, function(e,docs) {
        res.json(docs);
    });
});

// Show add school page
router.get('/addnewschool', function(req, res, next) {
  res.render('addnewschool', { title: 'Add New School' });
});

/*
 * POST to addSchool.
 */
router.post('/addschool', function(req, res) {
    var db = req.db;
    var collection = db.get('schoollist');

    console.log("Adding school ...");

	collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteschool.
 */
router.delete('/deleteschool/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('schoollist');
    var schoolToDelete = req.params.id;
    console.log("Deleting school: " + schoolToDelete);
    collection.remove({ '_id' : schoolToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;