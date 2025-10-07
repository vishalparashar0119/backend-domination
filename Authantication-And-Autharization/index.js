import express from 'express';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get('/' , (req , res)=>{
      res.send("hello pandu rnaga")
});
// first task is how to set cookies in express js

app.get('/login', (req , res)=>{
      // this route will set cookies for you 
      res.cookie('isLoggedIn','loggedIn');
      res.send(' cookie has been set');
});
// how to un set a cookies


app.get('/logout', (req , res)=>{
      // this route will set cookies for you 
      res.cookie('isLoggedIn','');
      res.send(req.cookies);
      console.log('cookie has been unset');
});


app.get('/cookie' , (req , res)=>{
       console.log(req.cookies);
       res.send(req.cookies);
});


// :: how to use bcrypt to hash and salt a password 

app.get('/newUser' , (req , res)=>{
      // this is use for saving a new user using bcrypt

      bcrypt.genSalt(11 , (err , salt)=>{
              bcrypt.hash('pandu123' , salt  , (err , hash)=>{
                   res.send('your password ::'+hash)
              });
      });
});

app.get('/jwt', (req ,res)=>{
    
      const privateKery = 'vishal@123';
      const token = jwt.sign({email:'itsvishalparashar@gmail.com'} , privateKery );
      res.cookie('jwt', token);
      console.log(req.cookies)
      res.send("done");
});

app.listen(port , ( )=>{
      console.log(`server is running at port at http://localhost:${port}`);
});

