
var mongoose = require('mongoose');

let Todo = mongoose.model('Todo',{
    text:{
        type: String,
        require: true,
        minlength: 1,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    completedOn:{
        type: String,
        default: null
    }
});



module.exports = {Todo};


// let todoNew  = new Todo({
//     text: 'This is it',
//     completed: true,
//     completedOn: new Date().toTimeString()
// })
// todoNew.save().then((res)=>{
//     console.log(res);
// },(e)=>{
//     console.log('could not save',e);
// });