const mongoose = require('mongoose');

const Books = new mongoose.model('books',
    new mongoose.Schema({
        bookName: 
        {
            type: String,
            required: true
        },
        bookAuthor: 
        {
            type: Array,
            validate:{
                validator: function(v){
                    return v && v.length > 0;
                },
                message: 'A book has alteast one Author.'
            }
        },
        publishDate: 
        {
            type: Date, 
            default: Date.now,
            required: true
        },
        bookCategory: 
        {
            type: String

        },
        bookISBN: 
        {
            type: Number,
            required: function (){return this.bookAuthor}
        }
    })
)
exports.Books = Books