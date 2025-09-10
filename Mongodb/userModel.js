import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase").then(()=>{
      console.log("database is connected")
}).catch((err)=>{
      console.log("database error::", err)
});

const userSchema  = new mongoose.Schema({
      name:String ,
      userName:String,
      email:String,
});

const userModel  = mongoose.model("User", userSchema);
export default userModel;