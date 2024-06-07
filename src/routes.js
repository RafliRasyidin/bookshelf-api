const {
    addBookHandler,
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
        handler: (_request, _h) => {
            return "Hello World"    
        }
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: (_request, _h) => {
            return "Hello World"    
        }
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: (_request, _h) => {
            return "Hello World"    
        }
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: (_request, _h) => {
            return "Hello World"    
        }
    },
]

module.exports = routes