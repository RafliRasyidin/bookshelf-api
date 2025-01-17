const {
    addBookHandler,
    getBooksHandler,
    getDetailBookHandler,
    updateBookHandler,
    deleteBookHandler,
} = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBooksHandler
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getDetailBookHandler
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookHandler
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookHandler
    },
]

module.exports = routes