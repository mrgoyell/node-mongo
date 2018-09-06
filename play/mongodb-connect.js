const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    let db = client.db('TodoApp');

    // insert 1
    db.collection('Users').insertOne({
        name: 'Rishabh Goel',
        age: 33,
        location: 'Delhi 110024'
    },(err,res)=>{
        if(err){
            return console.log("Unable to insert");
        }
        console.log(JSON.stringify(res.ops[0]._id.getTimestamp(),undefined,2));
    });

    //insert 2
    // db.collection('Todos').insertOne({
    //     text:'Something to say',
    //     completed: false
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert todo',err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // }); 
    client.close();
});