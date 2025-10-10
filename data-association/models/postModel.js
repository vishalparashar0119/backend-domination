import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
      postValue: String,
      user: { type: mongoose.Schema.Types.ObjectId , ref: 'User' },
      date: { type: Date, default: Date.now }
})


const PostModel = mongoose.model('Post', postSchema);

export default PostModel;