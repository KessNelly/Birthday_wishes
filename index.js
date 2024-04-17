const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


app.listen(port, ()=>{
    console.log(`App running successfully on port ${port} `)
})