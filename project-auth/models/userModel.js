import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      email: String,
      password: String
});


const user = mongoose.model('user', userSchema);

export default user;