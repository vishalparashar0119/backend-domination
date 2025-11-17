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

app.get('/allPost', isLoggedIn , async (req, res) => {

      const posts = await PostModel.find().populate('user');
      res.render("allPost" , { posts});
});

app.post('/addPost' ,isLoggedIn ,  async ( req , res)=>{
      const { content} = req.body;
      const user = await UserModel.findOne({email : req.user.email});
      const postData = await PostModel.create({ content : content , user: user._id})
      user.post.push(postData._id);
      await user.save();
      return res.status(200).redirect('/allPost');
})


app.get('/profile' ,isLoggedIn , async ( req , res ) =>{
      const user = await UserModel.findOne({email : req.user.email}).populate('post');
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
                  res.status(200).redirect('/allPost');
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
});

// route for liking post

app.get('/likePost/:postId' , isLoggedIn , async ( req , res)=>{

      const {postId} = req.params;
      const user = await UserModel.findOne({ email: req.user.email});
      const post = await PostModel.findById(postId);
      if(post.likes.includes(user._id)) return res.redirect('/allPost');
      post.likes.push(user._id);
      await post.save();
      return res.redirect('/allPost');
      
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