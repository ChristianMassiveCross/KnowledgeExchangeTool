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
        res.render('list-users', {
            "userlist" : docs
        });
    });
});
module.exports = router;
