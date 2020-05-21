// const mongoose = require("mongoose")
// const schema=mongoose.Schema


// const UserSchema=new schema({
//     // name:{
//     //     type:String
//     // },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     dateodcreation:{
//         type:Date,
//         default:Date.now()
//     }
// })

// module.exports=User=mongoose.model('user',UserSchema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create a Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateofcreation: {
    type: Date,
    default: Date.now(),
  },
  tasks:{
    type:Array,
    default:[]
  }
});
module.exports = User = mongoose.model("user", UserSchema);