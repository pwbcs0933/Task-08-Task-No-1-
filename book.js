let books = [
    {
        "id": 1,
        "title": "The Gray Man"
    },
    {
        "id": 2,
        "title": "Maaz"
    },
    {
        "id": 3,
        "title": "book3"
    }
];
let lastId = 3;

module.exports = {
    findAll() {
        return books;
    },

    findOne(id) {
        return books.find(book => book.id === id);
    },

    create(book) {
        const id = ++lastId;
        const newBook = {
            id,
            title: book.title
        };

        books.push(newBook);

        return newBook;
    },

    update(id, book) {
        const existingBook = book.find(book => book.id === id);
        if(!existingBook){
            return null;
        }
        const updateBook = {
            ...existingBook,
            ...book
        };
        book.map(book =>{
            if (books.id === id){
                return updateBook;
            }
            return book;
        });

        return updateBook;
    },
    destroy(id) {
        books = books.filter(book => book.id !== id);
        return id;
    }
};