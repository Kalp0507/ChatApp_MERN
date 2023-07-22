const express = require('express')
const mongoose = require('mongoose')
const url = "mongodb://0.0.0.0:27017/"
const app = express();
const cors = require('cors');

//Routes
const auth = require('../Server/routes/auth')
const userRoute = require('./routes/users')
const messageRoute = require('./routes/messages')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    // mongoose.set('strictQuery', true);
    if (err)
        console.log(`Unable to connect !! Error: ${err}`);
    else
        console.log('mongoDB is Connected');
})

//middleware
app.use(express.json());
app.use(cors());


//routes
app.use("/api/auth", auth)
app.use("/api/users", userRoute)
app.use("/api/message", messageRoute)

app.listen('8800', () => {
    console.log('Backend Server is connected to port 8800');
})

