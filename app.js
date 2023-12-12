const express = require('express');
const bodyParser = require('body-parser');
const Book = require('./book');
const app = express();
const PORT = 3000;

// app.use(bodyParser.json());
app.use(express.json());

app.get('/books', (req, res) =>{
    res.send(Book.findAll());
});

app.get('/books/:bookId', (req, res) => {
    const bookId = parseInt(req.params.bookId, 10);
    const book = Book.findOne(bookId);

    if (!book){
        res.status(404).send({
            message: 'Could Nor Find the book'
        });
        return;
    }
    res.send(book);
});

app.post('/books', (req, res) =>{
    //middleware
    //body-parser
    res.send(Book.create(req.body));
})

app.put('/books/bookId', (req, res) =>{
    const bookId = parseInt(req.params.bookId, 10);
    const updateBook = Book.update(bookId,req.body);

    if(!updateBook){
        return res.status(404).send({
            message: 'The book you want to Update does not exist'
        });
    }
    res.send();
});


app.delete('/books/:bookId', (req, res) =>{
    const bookId = parseInt(req.params.bookId, 10);
    const book = Book.findOne(bookId);

    if (!book){
        return res.status(404).send({
            message: 'The book you want to delete does not exist'
        });
    }

    const destroyBookId = Book.destroy(bookId);
    if (destroyBookId !== null){
        return res.sendStatus(204);
    }

    res.status(500).send({
        message: 'Could not delete the book'
    });
});

app.listen(PORT, () =>{
    console.log(`Express SeRver Is Running.........${PORT}.`)
});