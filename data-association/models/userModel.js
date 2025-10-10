import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
      name : String,
      email :String,
      post : [{
        type : mongoose.Schema.Types.ObjectId ,ref : 'Post'
      }]
})


const UserModel = mongoose.model('User', userSchema);

export default UserModel;