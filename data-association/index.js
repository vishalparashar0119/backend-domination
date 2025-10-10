// data assocition is a two way relation ship  both have the reference of each other

import express from 'express';
import connectDb from './connectDb.js';
import { UserModel, PostModel } from './models/models.js';

const app = express();
const port = 3000;

connectDb();
app.get('/', (req, res) => {
      res.send(' home page ')
});

app.get('/createUser', async (req, res) => {

      const user = await UserModel.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
      });

      res.send(user);
});

app.get('/createPost', async (req, res) => {

      const post = await PostModel.create({
            postValue: 'this is my first post',
            user: "68e8890d69bc136f434bf4af"
      });

      const user = await UserModel.findOne({ _id: "68e8890d69bc136f434bf4af" });
      user.post.push(post._id);
      await user.save();

      res.send({ post, user });
});
app.listen(port, () => {
      console.log(`server is running on port http://localhost:${port}`);
})