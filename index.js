const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
const verifyToken=require('./routes/verifyToken')
const userRouters=require('./routes/users'); //import routers
const authRouters=require('./routes/auth');
require('dotenv/config')
// Connect To DB
mongoose.connect(process.env.DB_CONNECTION, { 
    useNewUrlParser: true ,
    useUnifiedTopology: true }, () => {
    console.log(`Successfully connected to DB!`)
})
// Middleware

app.use(bodyParser.json());
// app.use(cookieParser)

// Token middleware
// app.all('/^((?!login|refresh).)*$/', verifyToken);
// Router middleware
app.use('/users',userRouters) // handle operating on user
app.use('/',authRouters)
// start app
const server = app.listen(3011, function(){
    console.log("API is listening on port xxx");
});
module.exports = server;


