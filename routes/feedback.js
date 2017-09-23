var express = require('express');
var router = express.Router();

var str="zdxufgfkdfrwehde"
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('feedback', { title: 'Express' });
});

router.post('/', function(req, res, next) {
	// console.log(req.body)
    res.redirect('/choose');
});

module.exports = router;