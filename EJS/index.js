import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';



const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log();
// parser for form data 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

// setting up view engine 
app.set('view engine' , 'ejs');

// setting up  route 
app.get('/' , (req , res) =>{
      res.render("index");
});
// dynamic route 
app.get('/user/:name' , (req , res)=>{
      const {name} = req.params;
      res.send('hello '+name);
})

// listen server 
app.listen(port ,()=>{
      console.log(`server is running on http://localhost:${port}`);
});