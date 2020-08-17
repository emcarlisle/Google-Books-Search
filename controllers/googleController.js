const db = require("../models");
const axios = require("axios");

// Defining methods for the booksController
module.exports = {
    findAll: function (req, res) {
        axios.get("https://www.googleapis.com/books/v1/volumes", req.params)
            .then(results => results.data.items
                .filter(data => {
                    data.volumeInfo.title &&
                        data.volumeInfo.authors &&
                        data.volumeInfo.description &&
                        data.volumeInfo.imageLinks &&
                        data.volumeInfo.imageLinks.thumbnail &&
                        data.volumeInfo.infoLink
                })
                .then(books => {
                    db.Book.find()
                        .then(bookIds => {
                            books.filter(book => {
                        bookIds.every(bookId => {bookId.googleId.toString() !== book.id})
                    })})
                })
                .then(books => res.json(books))
                .catch(err => res.json(err))
            )


    }
}