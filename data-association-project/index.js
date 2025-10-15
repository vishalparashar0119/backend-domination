import express from 'express';
import cookieParser from 'cookie-parser';
import connectToDatabase from './dataBase.js';
import { UserModel, PostModel } from './models/models.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const app = express();
const port = 3000;

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// view engine

app.set('view engine', 'ejs');

// data base connetion

connectToDatabase();


// route 

app.get('/', (req, res) => {
      res.render("home");
});

app.get('/allPost', (req, res) => {
      res.send("this is all post page");
});
app.post('/register', async (req, res) => {
      const { name, userName, email, password, age } = req.body;
      const user = await UserModel.findOne({ email });


      if (user) return res.status(500).send('user already exists');


      bcrypt.genSalt(11, (erro, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                  const user = await UserModel.create({
                        name,
                        userName,
                        email,
                        age,
                        password: hash
                  });

                  const token = jwt.sign({ email: email, userId: user._id }, 'vishal@123#');
                  res.cookie('value', token);
                  res.status(200).send('user registered successfully');
            })
      })


});

app.get('/login', (req, res) => {
      res.render("login");
});


app.post('/login', async (req, res) => {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });


      if (!user) return res.status(500).send(' somthing went wrong');


      bcrypt.compare(password, user.password, (err, result) => {
            if (!result) return res.status(500).send('somthing went wrong');
            const token = jwt.sign({ email: email, userId: user._id }, 'vishal@123#');
            res.cookie('value', token);
            res.status(200).redirect('/allPost');
      })






});
app.listen(port, () => {
      console.log(`server is running on port http://localhost:${port}`);
})