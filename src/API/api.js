import axios from "axios";



export const BooksAPI = {
    getBooks(book, page = 1) {
        const searchBook = encodeURI(book);
        book = book.replace(/\s/g, '+');
        window.history.pushState({}, '', `/?book=${searchBook}&page=${page}`)
        return axios.get(`http://openlibrary.org/search.json?title=${book}&page=${page}`)
    },
    async getBook(key) {
      return await axios.get(`https://openlibrary.org${key}.json`)
    },
   async getCover(cover_i) {
         return await axios.get(`http://covers.openlibrary.org/b/id/${cover_i}-M.jpg`)
    }


}