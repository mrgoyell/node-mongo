const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',{useNewUrlParser:true},(err,client)=>{
    if(err){
        return console.log('Could not connect to MongoDb server');
    }
    const db = client.db('TodoApp');
    //delete many
    db.collection('Todos').deleteMany({age: 23}).then((res)=>{
        console.log(res);
    });
    //delete One
    db.collection('Todos').deleteOne({age: 23}).then((res)=>{
        console.log(res);
    });
    //FindOneAndDelete
    db.collection('Todos').findOneAndDelete({age: 23}).then((res)=>{
        console.log(res);
    });
client.close();
})