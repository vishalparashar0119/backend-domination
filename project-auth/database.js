import mongoose from "mongoose";

const connectToDatabase = async () =>{
      try {
            await mongoose.connect("mongodb://127.0.0.1:27017/authDb");
            console.log('data base is connected');
      } catch (error) {
            console.log('error while connecting to database', error);
      }
}

export default connectToDatabase;