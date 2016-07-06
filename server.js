var express = require("express");
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

// connect to mongoose

mongoose.connect('mongodb://localhost:27027/contactlist');
var db = mongoose.connection;

var contactlistSchema = mongoose.Schema({
   name: String,
   gender: String,
   city: String
});

var Persons = mongoose.model('Persons', contactlistSchema);

// set configuration

// use middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use(bodyParser.json());

//////// define routes //////////

// Viewing contact list in json format
app.get('/contactlist', function(req, res){
   Persons.find(function(err, result){
      if(err){
         res.send(err);
      }
      else{
         res.json(result);
      }
   });
});

// Adding contact list
app.post('/contactlist', function(req, res){
   console.log(req.body); // getting object from app.js to server.js

   Persons.create(req.body, function(err, result){
      if(err){
         res.send(err);
      }
      else{
         res.redirect('/contactlist');
      }
   });
});

// Deleting contact list
app.delete('/contactlist/:id', function(req, res){
   var id = req.params.id;
   console.log(id);
   Persons.remove({_id: req.params.id}, function(err, count){
      res.json(count);
   });
});

// Editing contact list
app.get('/contactlist/:id', function(req, res){
   Persons.findOne({_id: req.params.id}, function(err, doc){
      res.json(doc);
   });
});

// Updating the contact list
app.put('/contactlist/:id', function(req, res){
   console.log(req.body.name); // displays only the name that was edited

   var contact = {
      name: req.body.name,
      gender: req.body.gender,
      city: req.body.city
   };
   Persons.findOneAndUpdate({_id: req.params.id}, {$set : contact}, function(err, contact){
      if(err){
         res.send(err);
      }
      else{
         res.json(contact);
      }
   });
});

// server running
app.listen(3000, function(){
   console.log("Running at port 3000"); 
});