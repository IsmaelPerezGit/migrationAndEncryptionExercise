var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: ' the landing page!!' });
});

router.get('/users/', function (req,res,next) {
  res.render('login')
})

module.exports = router;
