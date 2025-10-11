import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

// middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// view engine

app.set('view engine' , 'ejs');


// route 

app.get('/' , (req , res)=>{
      res.send("home page");
});


app.listen(port , ()=>{
      console.log(`server is running on port http://localhost:${port}`);
})