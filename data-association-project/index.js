import express from 'express';
import cookieParser from 'cookie-parser';
import connectToDatabase from './dataBase.js';
import UserModel from './models/userModel.js';
import bcrypt from 'bcrypt'

const app = express();
const port = 3000;

// middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// view engine

app.set('view engine' , 'ejs');

// data base connetion

connectToDatabase();


// route 

app.get('/' , (req , res)=>{
      res.render("home");
});
app.post('/register' , async (req , res)=>{
      const {name , userName , email , password , age} = req.body;
      const user = await UserModel.findOne({email});

      console.log(user)

      if(user) return res.status(500).send('user already exists');


      bcrypt.genSalt(11 , (erro , salt)=>{
            bcrypt.hash(password , salt , async (err , hash)=>{
                  await UserModel.create({
                        name, 
                        userName, 
                        email,
                        age,
                        password: hash
                  });

                  res.status(200).send('user registered successfully');
            })
      })
      
      
});



app.listen(port , ()=>{
      console.log(`server is running on port http://localhost:${port}`);
})