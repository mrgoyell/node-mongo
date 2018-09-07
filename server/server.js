var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user.js');
var {Todo} = require('./models/todo.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e.errors.text.message);
    });
});

app.get('/todos',(req,res)=>{
   Todo.find().then((todos)=>{
       res.status(200).send({todos});
   },(e)=>{
       res.status(400).send({
           text:'Could not fetch the request'
       });
   }); 
});

app.get('/todos/:id',(req,res)=>{
    id = req.params.id;
    if(ObjectID.isValid(id)){
        User.findById(id).then((user)=>{
            if(user){
                res.status(200).send({user});
            }
            else{
                res.status(404);
            }
        }).catch((e)=>{
            res.status(400);
        });
    }
    else{
        res.status(404).send();
    }
});

app.listen(3000,()=>{
    console.log('Started on port 3000');
})
module.exports = {app}; 

