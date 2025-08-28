import express from "express";

const app =  express();
const port = 3000;


// middle ware in express this is how we write a middle ware

app.use((req , res , next)=>{
      // this will always run when a request is made 
      console.log("middle ware chla");
      // without next the requelst will not pass to request handler or to next middle ware
      next();
});

app.get("/" , (req , res) =>{
      // this is also a middle ware
      res.send("this is vishal");
});
app.get("/profile" , (req , res) =>{
      // this is also a middle ware
      res.send("this is vishal profile page");
});
app.get("/about" , (req , res) =>{
      // this is also a middle ware
      res.send("this is vishal about page");
});

app.listen(port, () =>{
      // this will tell us weather a server is listning or not 
      console.log(`server is running on http://localhost:${port}`);
});