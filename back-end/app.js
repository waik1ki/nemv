var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if (process.env.NODE_ENV !== 'production') app.use(cors());
app.use('/api', require('./routes/api'));

app.use(express.static(path.join(__dirname, '../', 'front-end', 'dist')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({msg: err.message});
});

module.exports = app;

const mongoose = require('mongoose');
const User = require('./models/users');


const cfg = require('../config/')
console.log(cfg)

mongoose.connect(cfg.dbUrl,{
  useNewUrlParser : true,
  useUnifiedTopology : true,
  useCreateIndex : true,
  useFindAndModify : false
}, (err) => {
  if (err) return console.error(err)
  console.log('MongoDB connected!')

  // User.find()
  //   .then(r=> console.log(r))
  //   .catch(r=> console.error(e))

  // User.updateOne({ _id: '606fdc3491913815740b9a01'}, { $set: {age: 34} })
  //   .then(r=> {
  //     console.log(r)
  //     console.log('updated')
  //     return User.find()
  //   })
  //   .then(r=> console.log(r))
  //   .catch(r=> console.error(e))

  // User.deleteMany()
  //   .then(r=> console.log(r))
  //   .catch(r=> console.error(e))

  // User.create({ name: '하하'})
  //   .then(r=> console.log(r))
  //   .catch(r=> console.error(e))
  // 데이터 생성
});