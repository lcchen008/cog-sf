var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

/*
 * POST to addSchool.
 */
router.post('/addapplication', function(req, res) {
    var db = req.db;
    var application_collection = db.get('applications');
    var student_collection = db.get('userlist');
    var school_name = req.params.name;
    var mongoose = require('mongoose');

    console.log("Adding application ...");

    console.log(req.body);

    var student_id = req.body.student_id;
    var school_id = req.body.school_id;

	// Insert new application to application db
    application_collection.insert(req.body, function(err, docsInserted) {
        console.log(docsInserted);
        if (err === null) {
            // Update the student: add application id to the student's application
            // set        
            student_collection.update(
                {_id: ObjectID(student_id)}, 
                {$addToSet: {applications: docsInserted._id}}, 
                function(err, result) {
                res.send(
                    (err === null) ? req.body.value : { msg: err }
                );
            });
        }

        res.send(
            { msg: err }
        );
    });
});

router.get('/getapplications/:id', function(req, res) {
    console.log("In get applications");
    var db = req.db;
    var student_collection = db.get('userlist');
    var application_collection = db.get('applications');
    var school_collection = db.get('schoollist');
    // Get the full info of the student
    var user_to_get = req.params.id;
    console.log(user_to_get);
    var obj_id = new ObjectID(user_to_get);

    student_collection.findOne({_id: obj_id}, function(error, student_doc) {
        // console.log("Printing docs from Array " + JSON.stringify(doc));
        var applications = [];
        var count = 0;
        if (student_doc.applications) {
            count = student_doc.applications.length;
        }
        console.log(count);

        if (count == 0) {
            res.json(applications);
            return;    
        }

        for (var i = 0; i < count; i++) {
            var app_id = student_doc.applications[i];
            console.log(app_id);
            
            var app_obj_id = new ObjectID(app_id);
            application_collection.findOne({_id: app_obj_id}, function(error, application_doc) {
                var school_id = application_doc.school_id;
                var school_id_obj = new ObjectID(school_id);

                school_collection.findOne({_id: school_id_obj}, function(error, school_doc) {
                    applications.push({"application_id": application_doc._id, "school_name": school_doc.name, "status": application_doc.status});
                    if (applications.length == count) {
                        console.log(applications.length);
                        res.json(applications);
                    }  
                });
            });
        }
    });
});


router.post('/status/:id', function(req, res) {
    // res.render('student', { title: "test" });
 
    var db = req.db;
    var collection = db.get('applications');
    console.log("In updating application status");
    console.log(req.params);
    var applicaiton_to_update = req.params.id;
    console.log(applicaiton_to_update);
    collection.update({_id: ObjectID(applicaiton_to_update)}, {$set: {status: req.body.value}}, function(err, result) {
        res.send(
            (err === null) ? req.body.value : { msg: err }
        );
    });
});

/*
 * DELETE to deleteapp.
 */

router.delete('/deleteapp/:id', function(req, res) {
    var db = req.db;
    var app_collection = db.get('applications');
    var student_collection = db.get('userlist');
    var appToDelete = req.params.id;
    var studentId = req.body.student_id;

    student_collection.update({_id: ObjectID(studentId)}, {$pullAll: {applications: [ObjectID(appToDelete)]}}, function(err, result) {
        console.log(err);

        if (err === null) {
            console.log("Removing " + appToDelete + " from a student.");

            app_collection.remove({ '_id' : appToDelete }, function(err) {
                if (err === null) {
                    console.log("Deleted " + appToDelete);
                }

                res.send(
                    (err === null) ? { msg: '' } : { msg:'error: ' + err }
                );
            });
        }
    });

    /*
    app_collection.remove({ '_id' : appToDelete }, function(err) {
        console.log("removed " + appToDelete);
        if (err === null) {
            // Update the student: delete application id from the student's application
            // set        
            student_collection.update(
                {_id: ObjectID(studentId)}, 
                {$pullAll: {applications: [appToDelete]}}, 
                function(err, result) {
                res.send(
                    (err === null) ? { msg: '' } : { msg:'error: ' + err }
                );
            });
        }
    });
    */
});


module.exports = router;