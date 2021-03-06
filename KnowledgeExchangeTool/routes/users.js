var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
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
            res.location("/users");
            res.redirect("/users");
        }
    });
});

router.post('/',function(request, response){
    var dbHandle = request.db;
    var deleteIdentifyer = request.body.ident;
    console.log('delete User by id:'+deleteIdentifyer);
    var collection = dbHandle.get('userCollection');
    collection.remove({"_id" : deleteIdentifyer },function (err, doc) {
        if (err) {
            response.send("There was a problem with delete.");
        }
        else {
            response.location("/users");
            response.redirect("/users");
        }
    });
});

module.exports = router;
