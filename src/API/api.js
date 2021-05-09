import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://openlibrary.org',
});
const cacheableGet = async (endpoint) => {
    if(!(endpoint in sessionStorage)) {
        const result = await axiosInstance.get(`${endpoint}`)
        sessionStorage.setItem(endpoint, JSON.stringify(result))
    }
    return Promise.resolve(JSON.parse(sessionStorage.getItem(endpoint)))
}
export const BooksAPI = {
    getBooks(book, page = 1) {
        const searchBook = encodeURI(book);
        book = book.replace(/\s/g, '+');
        window.history.pushState({}, '', `/?book=${searchBook}&page=${page}`)
        return cacheableGet(`/search.json?title=${book}&page=${page}`)
    },
     getBook(key) {
      return cacheableGet(`${key}.json`)
    },
    getCover(cover_i, size) {
        console.log(cover_i);
        return  cacheableGet(`/b/id${cover_i}-${size}.jpg`)
    }
}