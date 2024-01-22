const express = require('express');
const {Books} = require('../models/book');
const router = express.Router();

// Post Request
router.post('/', async (req, res) =>{
    try {
        let book = await Books.findOne({bookName: req.body.bName, bookAuthor: req.body.bAuthor})
        if(book) return res.status(400).send({result: 'Book Name already exist with the same Author'})

        book = new Books({
            bookName: req.body.bName,
            bookAuthor: req.body.bAuthor,
            publishDate: req.body.pDate,
            bookCategory: req.body.bCat,
            bookISBN: req.body.bISBN,
        })
        let result = await book.save();
        res.status(200).send(result)
    } catch (ex) {
        res.status(400).send({error: ex.message})
    }
})

// Get Request
router.get('/', async (req,res) =>{
    try {
        let books = await Books.find()
        res.status(200).send(books)
    } catch (ex) {
        res.status(400).send({result: ex.message})
    }
})

// Update Request
router.put('/:bName', async (req, res) =>{
    try {
        const book = await Books.findOne({bookName: req.params.bName})
        if(!book){
            res.send('Not found any book with this name')
        }
            book.bookName = req.body.bName,
            book.bookAuthor = req.body.bAuthor,
            book.publishDate = req.body.pDate,
            book.bookCategory = req.body.bCat,
            book.bookISBN = req.body.bISBN

            const result = await book.save();
            res.send({updatedRecord: result})
    } catch (ex) {
        res.status(400).send({error: ex.message})
    }
})

// Delete Request
router.delete('/:isbn', async (req,res)=>{
   try {
        console.log(req.params.isbn)
        // let book = await Books.deleteOne({bookISBN: req.params.isbn}) // it will only delete one document from the collection
        let book = await Books.deleteMany({bookISBN: req.params.isbn})  // delete Many Document if match the bookISBN
        res.send(book);
   } catch (ex) {
        res.status(400).send({error: ex.message})
   }
})

module.exports = router;