var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/helloWorld', function(req, res) {
  res.render('helloWorld', { title: 'Hello World!!!' });
});

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        /*res.render('userlist', {
            "userlist" : docs
        });*/
		
		res.render('helloWorld', { title: "testing the db" });
		console.log(docs);
    });
});

module.exports = router;
