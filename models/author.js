const mongoose = require('mongoose');

const Author = new mongoose.model('authors',
    new mongoose.Schema({
        authorName: {type: String, required: true},
        authorAge: {type: Number},
        authorEmail: {type: String, required: true},
        authorAddress: {type: String, required: true}
    })
)
exports.Author = Author