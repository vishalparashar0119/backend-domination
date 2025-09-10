import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      firstName:String,
      lastName:String,
      email:String,
      address: String,
      pinCode : String
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
