const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',{useNewUrlParser:true},(err,client)=>{
    if(err){
        return console.log('Could not connect to MongoDb server');
    }
    const db = client.db('TodoApp');
    db.collection('Users').find({
        _id: new ObjectID('5b912e870072f0208c4174e6')
    }).toArray().then((docs)=>{
        console.log('Users');
        console.log(JSON.stringify(docs,undefined,2));
    },err=>{
        console.log('Unable to fetch collection todos', err);
    });
    // db.collection('Todos').find({
    //     _id: new ObjectID('5b912cca903fc64130efa936')
    // }).count().then((count)=>{
    //     console.log('Todos '+count);
    // },err=>{
    //     console.log('Unable to fetch collection todos', err);
    // });
client.close();
})