const { nanoid } = require('nanoid')
const books = require('./bookshelf')

const addBookHandler = (request, h) => {
    const { 
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload
    const bookId = nanoid(16) 
    const finished = pageCount === readPage
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    if (name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        })
        response.code(400)
        return response
    }
    
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        })
        response.code(400)
        return response
    }
    
    const newBook = {
        bookId,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    }

    books.push(newBook)

    const isSuccess = books.filter((book) => book.bookId === bookId).length > 0
    
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: bookId
            },
        })
        response.code(201)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku',
    })
    response.code(400)
    return response
}

module.exports = {
    addBookHandler
}