var mongoose = require('mongoose');

let User = mongoose.model('user',{
    email:{
        type: String,
        require: true,
        minlength: 1,
        trim: true
    }
});

module.exports = {User};

//user model
    //email - required,trim,type=string,minlength = 1
//create new user 

// let rish = new User({
//     email:"rishabhgoyell@gmail.com"
// });

// rish.save().then((res)=>{
//     console.log('Saved successfully',res);
// },(e)=>{
//     console.log('Could not save',e);
// });