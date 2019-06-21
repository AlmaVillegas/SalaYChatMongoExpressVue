var express = require('express');
var router = express();
var mongoose = require('mongoose');
var app =express();
var server = require('http').createServer(app);
var io= require('socket.io')(server);
var Chat= require('../models/Chat.js');

server.listen(4000);

io.on('connection', (socket)=>{
    console.log('User connected');
    socket.on('disconnect', ()=>{
        console.log('user desconnected');
    });
    socket.on('save-message', (data)=>{
        console.log(data);
        io.emit('new-message', {message:data });
    });
});

router.get('/:roomid', (req,res,next)=>{
    Chat.find({room: req.params.roomid }, (err, productos)=>{
        if (err) return next(err);
        res.json(productos);
    });
});

router.get('/:id', (req, res , next)=>{
    Chat.findById(req.params.id, (err,post)=>{
        if (err) return next(err);
        res.json(post);
    });
});

router.post('/', (req,res,next)=>{
    Chat.create(req.body, (err,post)=>{
        if (err) return next(err);
    });
});

router.put('/:id', (req, res, next)=>{
    Chat.findByIdAndUpdate(req.params.id, req.body, (err,post)=>{
        if(err) return next(err);
        res.json(post);
    });
});

router.delete('/:id', (req,res,next)=>{
    Chat.findByIdAndRemove(req.params.id, req.body, (err,post)=>{
        if(err) return next(err);
        res.json(post);
    });
});

module.exports = router;
