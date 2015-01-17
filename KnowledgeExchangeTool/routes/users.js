var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* GET Userlist page. */
router.get('/list', function(req, res) {
    var db = req.db;
    var collection = db.get('userCollection');
    collection.find({},{},function(e,docs){
        res.render('users-list', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/new', function(req, res) {
    res.render('users-new', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/add', function(req, res) {
    var db = req.db;
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    userName = 'test';
    var collection = db.get('userCollection');

    console.log('add user:'+userName);
    collection.insert({
        "username" : userName,
        "email" : userEmail,
    }, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say adduser
            res.location("list");
            // And forward to success page
            res.redirect("list");
        }
    });
});
module.exports = router;
