const express = require('express');
const router = express.Router();
const {Author} = require('../models/author');

router.post('/', async (req, res)=>{
    try {
        let author = await Author.findOne({authorName: req.body.aName}) // first check the database then create the 
        if(author){
           return res.send({error: 'Author name already exsist'})
        }
        let authors = new Author({
            authorName: req.body.aName,
            authorAge: req.body.aAge,
            authorEmail: req.body.aEmail,
            authorAddress: req.body.aAddress
        })
        let result = await authors.save()
        res.status(200).send(result)
    } catch (ex) {
        res.status(400).send({errors: ex.message})
    }
})

module.exports = router;