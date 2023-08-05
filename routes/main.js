var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', { title: 'Church of God in SF Bay Area' });
});

/*
 * Send email.
 */
router.post('/sendemail', function(req, res) {
  console.log("Sending email...");

  //var userToEmail = req.params.id;
  console.log(req.body.fullname);
  //console.log(req);

  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'lcchen008@gmail.com', // Your email id
      pass: 'heenzszyqiqmxrgu' // Your password
    }
  });

  console.log('transporter done.');

  var mailOptions = {
    from: req.body.email, // sender address
    to: 'lcchen008@gmail.com', // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.message + ' --from ' + req.body.fullname + ' email: ' + req.body.email//, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };

  console.log('options set.')

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error);
      res.send(
            { msg: 'error' }
      );
      console.log(res.body)
    } else {
      console.log('Message sent: ' + info.response);
      res.send(
            { msg: '' }
      );
      console.log(res)
    };
  });

  console.log('email sent..');
});


module.exports = router;
