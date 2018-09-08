const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user.js');
var {Todo} = require('./models/todo.js');

var app = express();
const port = process.env.PORT || 3000;

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

app.delete('/todos/:id',(req,res)=>{
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    else{
        Todo.findByIdAndDelete(id).then((todo)=>{
            if(!todo){
                return res.status(404).send();
            }
            res.status(200).send({todo});
        },(e)=>{
            res.status(400).send();
        })
    }
})

app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        return req.status(404).send();
    }

    if(_.isBoolean(body.completed)&&body.completed){
        body.completedOn = new Date().getTime();
    }else{
        body.completed = false;
        body.completedOn = null;
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.listen(port,()=>{
    console.log('Started on port '+port);
})
module.exports = {app}; 

