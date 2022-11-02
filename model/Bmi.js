

const {Schema,model} = require('mongoose');

const BMISchema = new Schema({
    Bmi:{type:Number,required:true},
    Result:{type:String,required:true},
    user:{type:String,required:true}
})

module.exports = model("bmi",BMISchema);