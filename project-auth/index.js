import express from 'express';
import cookieParser from 'cookie-parser';
import connectToDatabase from './database.js';
import bcrypt from 'bcrypt';
import user from './models/userModel.js';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;

// all the middlewares which we are using in our this mini project

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// set view engine for our project

app.set('view engine','ejs');

// connect to database

connectToDatabase();

// home page route 

app.get('/',(req , res)=>{
     res.render('home');
});

// /register route 

app.post('/register', (req , res)=>{
      const {firstName , lastName , email , password} = req.body;
      bcrypt.genSalt(11 , (err , salt)=>{
            bcrypt.hash(password , salt , async (err , hash)=>{
                  await user.create({ firstName , lastName ,email , password:hash});
            });

            const token =  jwt.sign({email: email} , 'vishal@123');
            res.cookie('token' , token);
            res.redirect('/');
      })
      
})

app.get('/logout' , (req , res)=>{
      res.cookie('token' , '');
      res.redirect('/');
})


app.listen(port , ()=>{
      console.log(`server is running on http://localhost:${port}`);
});
