var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var knex = require('../db/knex.js');

//get user page
router.get('/', function(req, res, next) {
  res.render('userpage');
});

//get user login page
router.get('/login', function(req, res, next) {
  res.render('login');
});

//get user create page form
router.get('/create', function(req, res, next) {
  res.render('createUser');
});

//submits create user info to database
router.post('/create', function(req, res, next) {
  console.log(req.body)
  if (req.body.password === req.body.confirm) {
    bcrypt.hash(req.body.password, 8, function(err, hash) {
      knex.raw(`INSERT INTO users (username,password, email, age) values ('${req.body.username}', '${hash}', '${req.body.email}', '${req.body.age}')`)
        .then(function() {
          res.send("SUCCESS")
        })
    });
  } else {
    res.redirect('/users/create');
  }
});

//checks username and password
router.post('/login', function(req, res, next) {
  console.log(req.body)
  knex.raw(`SELECT * FROM users WHERE username = '${req.body.username}'`)
    .then(function(users) {
      bcrypt.compare(req.body.password, users.rows[0].password, function(err, resp) {
        if (resp) {
          res.render('userhome')
        } else {
          res.send("INCORRECT PASSWORD!!!!")
        }
      });
    });
});

module.exports = router;
