import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      userName : String,
      name : String,
      age : Number,
      email : String,
      password : String
});


const UserModel = mongoose.model("user", userSchema);

export default UserModel;