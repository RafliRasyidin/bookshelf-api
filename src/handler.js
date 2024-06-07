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
    const id = nanoid(16) 
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
        id,
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

    const isSuccess = books.filter((book) => book.id === id).length > 0
    
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
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

const getBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query
    var filteredItems = books

    const queryItems = (needle, heystack) => {
        let query = needle.toLowerCase()
        return heystack.filter(item => item.name.toLowerCase().indexOf(query) >= 0)
    }

    if (name !== undefined) {
        filteredItems = queryItems(name, books) 
    }

    if (reading !== undefined) {
        const isReading = parseInt(reading) === 1
        filteredItems = books.filter(book => book.reading === isReading)
    }

    if (finished !== undefined) {
        const isFinished = parseInt(finished) === 1
        filteredItems = books.filter(book => book.finished === isFinished)
    }

    if (books.length === 0) {
        const response = h.response({
            status: 'success',
            data: {
                books
            }
        })
        response.code(200)
        return response
    }

    const booksInfo = filteredItems.map(book => {
        const { id, name, publisher } = book
        return { id, name, publisher }
    })
    const response = h.response({
        status: 'success',
        data: {
           books: booksInfo 
        }
    })
    response.code(200)
    return response
}

module.exports = {
    addBookHandler,
    getBooksHandler
}