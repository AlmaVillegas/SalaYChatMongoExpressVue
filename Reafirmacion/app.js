var express = require('express');
var createError = require('http-errors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var room = require('./routes/room');
var char = require('./routes/chat');
var app= express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/mevn-chat', {useNewUrlParser: true, promiseLibrary: require('bluebird')})
    .then(()=> console.log('connection succesful'))
    .catch((err)=> console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname,'dist')));
app.use('/rooms', express.static(path.join(__dirname, 'dist')));
app.use('/api/room', room);
app.use('/api/chat', chat);

app.use((req,res,next)=>{
    next(createError(404));
});

app.use((err,req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env')=== 'davelopment' ? err : {};

    res.status(err.status || 500);
    res.send(err.status);
});

module.exports = app;
