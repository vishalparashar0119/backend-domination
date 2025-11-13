import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
      content : String,
      user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
      },
      date : {
            type : Date,
            default: Date.now
      },
      likes : [{
            type : mongoose.Schema.Types.ObjectId,
            ref :'user'
      }]
});


const PostModel = mongoose.model("post", postSchema);

export default PostModel;