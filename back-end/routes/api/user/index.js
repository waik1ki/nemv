var express = require('express');
var createError = require('http-errors');
const User = require('../../../models/users');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  User.find()
    .then(r => {
      res.send({success: true, users: r})
    })
    .catch(e => {
      res.send({success: false})
    })
});

router.post('/', (req, res, next) => {
  const {name, age} = req.body
  const u = new User({ name, age })
  u.save()
    .then(r => {
      res.send({success: true, msg: r})
    })
    .catch(e => {
      res.send({success: false, msg: e.message})
    })
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const {name, age} = req.body
  User.updateOne({ _id: id}, { $set: { name, age }})
    .then(r => {
      res.send({success: true, msg: r})
    })
    .catch(e => {
      res.send({success: false, msg: e.message})
    })
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  User.deleteOne({ _id: id})
    .then(r => {
      res.send({success: true, msg: r})
    })
    .catch(e => {
      res.send({success: false, msg: e.message})
    })
})

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어요'));

});

module.exports = router;
