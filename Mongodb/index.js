import express from 'express';
import userModel  from './userModel.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
      res.send("server is running");
});

app.get('/createUser', async (req, res) => {
      const user = await userModel.create({
            name: "vishal",
            userName: "vishal123",
            email: "boogyman3100@gmail.com",
      })

      console.log("user created::", user);
      res.send(user);
});

app.get('/getUser', async (req, res) => {
      const user = await userModel.find({name:"vishal"});
      res.send(user);
});

app.get('/updateUser', async (req, res) => {
      const user = await userModel.findOneAndUpdate({name:"vishal"} , {email:"vishalparashar@gmail.com"}, {new:true});

      console.log("user updated::", user);
      res.send(user);
});

app.listen(port, () => {
      console.log(`server is running at http://localhost:${port}`);
});