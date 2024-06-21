import express from 'express';
import mongoose from 'mongoose'
import mongodbURL from './db.js';
import Signup from './Routes/Signup.js';
import Menuitem from './Routes/Menuitem.js';
import Item from './Routes/Item.js';
import Expense from './Routes/Expense.js'
import Login from './Routes/Login.js'
import Upload from './Routes/Upload.js'


const app = express()
app.use(express.json());

app.use((req,res,next) =>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/', Signup);
app.use('/', Menuitem);
app.use('/', Item);
app.use('/', Expense);
app.use('/', Login);
app.use('/', Upload);



const port = 4000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to database successfully');
      
    })
    .catch((error) => {
      console.error('Error connecting to database:', error);
    });
});
