const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


const books = [];

// serve index.html to get index file
app.get('/',(req,res)=>{
    console.log('ges');
    res.sendFile(__dirname + '/public/index.html');
});

// return a json of books
app.get('/books',(req,res)=>{
    res.json(books);
});

// add a book to the collection 
app.post('/books',(req,res)=>{
    const book = req.body;
    const id = Date.now().toString();
    book.id = id;
    book.publishDate = (new Date).toLocaleDateString("en-US");
    books.push(book);

    res.json(book);
});

// delete a book
app.delete('/books/:id',(req,res)=>{
    const id = req.params.id;
    const index = books.findIndex((book)=>book.id===id);

    if(index !== -1){
        books.splice(index, 1);
        res.json({
            message: `Book deleted successfully`
        });
    }else{
        res.json({
            message: `Book not found to delete`
        });
    }
});

// start the server
app.listen(3000,()=>{
    console.log('Server started on port 3000');
});