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

app.get('/allPost', isLoggedIn , (req, res) => {
      const posts = PostModel.find();
      console.log(" all posts are ::",posts);
      res.render("allPost");
});

app.post('/addPost' ,  async ( req , res)=>{
      const { content} = req.body;
      const postData = await PostModel.create({ content : content})
      return res.status(200).redirect('/allPost');
})


app.get('/profile' ,isLoggedIn , async ( req , res ) =>{
      const user = await UserModel.findOne({email : req.user.email});
      res.render("profile" , {user});
})

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
                  res.cookie('token', token);
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
            res.cookie('token', token);
            res.status(200).redirect('/allPost');
      });
});

app.get('/logout', ( req , res)=>{
      res.cookie('token', "");
      res.redirect('/login');
})
app.listen(port, () => {
      console.log(`server is running on port http://localhost:${port}`);
})


function isLoggedIn(req , res , next){
   if(req.cookies.token ===  "") return res.send("please login to access this page");
    
   const data =  jwt.verify(req.cookies.token , 'vishal@123#')
   req.user = data;
   next();
}