var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });
  res.sendfile('views/index.html');
});

router.get('/views/user-template.html', function( req, res) {
	res.sendfile('views/user-template.html')
});

router.get('/views/contact-template.html', function( req, res) {
	res.sendfile('views/contact-template.html')
})

module.exports = router;
