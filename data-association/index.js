import express from 'express';

const app = express();
const port = 3000;


app.get('/', (req ,res)=>{
      res.send(' home page ')
});

app.listen(port , ()=>{
      console.log(`server is running on port http://localhost:${port}` );
})