import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import pm from './routes/pm.js';
import projectType from './routes/projectType.js'
dotenv.config({
    path: '.env',
});
const app = express();

// Connect To DB
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log(`Successfully connected to DB!`)
})
// Middleware
app.use(bodyParser.json());

app.use('/api', [pm,projectType]) // handle operating on user

// start app
const server = app.listen(process.env.PORT, function () {
    console.log(`API is listening on port ${process.env.PORT}`);
});


