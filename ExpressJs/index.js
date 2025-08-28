import express from "express";

const app =  express();
const port = 3000;

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