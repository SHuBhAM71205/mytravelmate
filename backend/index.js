//fr use env var
require('dotenv').config();

const express = require('express')
const app = express()
const cors = require('cors');
const GeneralUserSchema=require('./models/User/GeneralUser.js')
const conn =require('./db.js');
conn();


const port = process.env.PORT;

// cross origin resource scheme
app.use(cors({
  origin:process.env.FRONTEND, 
  exposedHeaders: ['Auth-Token']   
}));


app.get('/api/auth',require('./routes/auth.js'));
app.get('/api/admin',require('./routes/admin.js'));
app.get('/api/driver',require('./routes/driver.js'));
app.get('/api/user',require('./routes/user.js'));

// -----------------------------------------------------------

//start listen
app.listen(port, () => {
  console.log(`TRAVELMATE app listening on port ${port}`)
})