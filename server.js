require('dotenv').config({path : 'variables.env'});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const processMessage = require('./process-message');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'chatapp/build')));


app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname+'/chatapp/build/index.html'));
});

app.post('/chat',(req,res)=>{
    const { message }= req.body;
    processMessage(message);
})

app.set('port',process.env.PORT || 5000);
const server = app.listen(app.get('port'),()=>{
    console.log(`Express is running on PORT ${server.address().port}`);
});