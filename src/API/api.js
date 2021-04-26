import axios from "axios";



export const BooksAPI = {
    getBook(book) {
        axios.get(`http://openlibrary.org/search.json?q=${book}`).then(result => console.log('RESULT DATA', result.data));
    }
}