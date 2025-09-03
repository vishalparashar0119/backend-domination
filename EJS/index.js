import express, { response } from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import * as fs from 'node:fs';


const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// parser for form data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// setting up view engine 
app.set('view engine', 'ejs');

// setting up  route 

app.get('/', (req, res) => {
      fs.readdir(path.join(__dirname, 'files'), (err, files) => {
            // this is how you send props in ejs 
            res.render("index", { files: files });
      })
});

// post route which creates a new file
app.post('/create', (req, res) => {
      const { title, notes } = req.body;
      const fileName = title.trim().split(" ").join("_") + ".txt";
      const notess = notes.trim();

      if (!title || !notes || !title.trim() || !notes.trim()) {
            return res.redirect('/');
      }
      
      fs.writeFile(`./files/${fileName}`, notess, (error) => {
            if (error) {
                  console.log(error);
            } else {
                  res.status(200).redirect('/');
            }
      })
});

// dynamic route to get the file data
app.get('/:fileName', (req, res) => {
      const { fileName } = req.params;

      const title = fileName.split('.')[0].split('_').join(" ");
      console.log(title);
      fs.readFile(`./files/${fileName}`, 'utf-8', (err, data) => {
            if (err) {
                  console.log(err);
            } else {
                  console.log(data);
                  res.render('specificNote', { title: title, data: data });
            }
      })
});
// listen server 
app.listen(port, () => {
      console.log(`server is running on http://localhost:${port}`);
});