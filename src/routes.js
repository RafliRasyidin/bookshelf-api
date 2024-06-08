const {
    addBookHandler,
    getBooksHandler,
    getDetailBookHandler,
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
        handler: () => {}
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: () => {}
    },
]

module.exports = routes