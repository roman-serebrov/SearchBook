import {CURRENT__BOOK, GET__BOOKS, LOADING_BOOK, PAGINATION__COUNT} from "./types";
import {getBooksAction, loadingBooks, paginationPages} from "../redux/actionType";
import {BooksAPI} from "../API/api";

const {THEME__RENDER} = require("./types");
//состояние приложения
const initialState = {
    theme: 'theme__dark',
    title: '!Search',
    subtitle: 'Book',
    emoji: '../../images/baseline_search_white_24dp.png',
    currentPage: 1,
    pagesCount: 0,
    isLoading: true,
    books: [], // массив книг полученных из поиска
    currentBook: ''// книги по которой проходит поиск
}
function appReducer(state = initialState, action) {
    switch (action.type) {
        case THEME__RENDER:{
            return {
                ...state,
                theme: action.theme
            }
        }
        case PAGINATION__COUNT: {
            return {
                ...state,
                pagesCount: action.count
            }
        }
        case LOADING_BOOK: {
            return {
                ...state,
                isLoading: false
            }
        }
        case GET__BOOKS: {
            console.log(action.books);
            return {
                ...state,
                books: [...action.books],
                isLoading: true
            }
        }
        case CURRENT__BOOK: {
            return {
                ...state,
                currentBook: action.book
            }
        }
        default: return state
    }
}

export const thunkGetBook = book => async dispatch => { // делает запрос на сервер
    await dispatch(loadingBooks())
    const books = await BooksAPI.getBook(book)
    if (books.status === 200) {
        await dispatch(paginationPages(Math.ceil(books.data.num_found / books.data.docs.length)))
        await dispatch(getBooksAction(books.data.docs))
    }
}
export default appReducer
