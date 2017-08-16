var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: ' the landing page!!' });
});

router.get('/users/login', function (req,res,next) {
  res.render('login')
})

module.exports = router;
