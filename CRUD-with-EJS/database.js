import mongoose from "mongoose";
 const connectDb = async () =>{
    return await mongoose.connect("mongodb://127.0.0.1:27017/mydatabaseEjs");
}

export default connectDb;
