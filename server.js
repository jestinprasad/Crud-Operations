'use strict'
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Users = require("./schema.js");
const bodyParser = require("body-parser");
const port = 3231;

mongoose.connect('mongodb://localhost/prasad',(err)=>{
	if(err){
		console.log("Failed to connect DB");
	}
	console.log("DB connected");
})

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

app.post("/",(req, res)=>{
let user = new Users();
user.name = req.body.name;
user.age = req.body.age;

user.save((err)=>{
	if(err){
		console.log("Failed to save user's data");
	}
	res.json({msg :"User's data Saved"});
})
})

app.get('/all', (req,res)=>{
	Users.find((err,docs)=>{
		if (err) {
			console.log("Query failed to fetch records")
		}
		if(docs){
			res.json(docs);
		}
	})
})

app.put('/all/:id',(req,res)=>{
	let id = req.params.id;
	var data = {
		name : req.body.name,
		age : req.body.age
	}
	Users.findByIdAndUpdate(id,data,{new:true},(err,doc)=>{
		if(err){
			console.log("Failed to Update");
		}
		if(doc){
			res.json(doc);
		}
	})
})

app.delete('/all/:id',(req,res)=>{
	let id = req.params.id;
	Users.remove({_id : id}, (err,doc)=>{
        if(err){
        	console.log("User Failed to delete");
        }
        if(doc){
        	console.log("User deleted Successfully");
        }
	})
})

app.listen(port,(err)=>{
	if (err) {
		console.log("Server Failed to start");
	}

	console.log("Server Started at port "+port);
})