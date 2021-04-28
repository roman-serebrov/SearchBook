import axios from "axios";



export const BooksAPI = {
    getBook(book) {
        book = book.replace(/\s/g, '+');
       return axios.get(`http://openlibrary.org/search.json?title=${book}`)
    }
}