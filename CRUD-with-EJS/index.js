import express from 'express'
import connectDb from './database.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import userModel from './model/userModel.js';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// middle ware 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

connectDb().then(() => {
      console.log("database is connected successfully");
}).catch((error) => {
      console.log("error while connecting to database", error);
});

app.get('/', (req, res) => {
      res.render("home");
});
app.post('/register', async (req, res) => {
      
      if(!req.body.firstName || !req.body.lastName || !req.body.email){
            return res.status(400).send("First Name, Last Name and Email are required fields.");
      }
      
      const data = await userModel.create(req.body);
      console.log("data created successfully::", data);      
      res.redirect('/');
});

app.get('/read',async (req, res) => {
      const data = await userModel.find();
      console.log("data fetched successfully::", data);

      res.render("readUsers",{data:data});
});

app.listen(port, () => {
      console.log(`server is running at port http://localhost:${port}`);
});