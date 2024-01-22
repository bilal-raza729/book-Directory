const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const books = require('./routes/books');
const authors = require('./routes/authors');
const app = express();

console.log(`Environment : ${process.env.NODE_ENV}`);
console.log(`connection to DB: ${config.connectionstring}`);

mongoose.connect(config.connectionstring)
    .then(()=> {console.log('Successfuly Connected to DB')} )
    .catch((err) => {console.log('Cannot connect with DB: ', err)} )

app.get('/', (req, res)=>{
    res.send('Welcome to the Book Directory')
})
app.use(express.json())
app.use('/api/books/', books);
app.use('/api/authors/', authors)

const port = process.env.PORT || 4000;
app.listen(port, ()=> {console.log(`Listning on Port: ${port}`)})

