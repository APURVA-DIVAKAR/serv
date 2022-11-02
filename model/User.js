

const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
    name:{type:String,required:true},
    hash:{type:String,required:true},
    email:{type:String,required:true}
})

module.exports = model("user",UserSchema);