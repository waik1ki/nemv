var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET users listing. */

router.get('/hello', function(req, res, next) {
  res.send({msg: 'hello', a: 1});
});

router.use('/user', require('./user'))

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어요'));

});

module.exports = router;
