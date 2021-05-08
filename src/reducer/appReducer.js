import {COVER__BOOK, CURRENT__BOOK, DESCRIPTION__BOOK, GET__BOOKS, LOADING_BOOK, PAGINATION__COUNT} from "./types";
import {currentBook, getBooksAction, loadingBooks, paginationPages} from "../redux/actionType";
import {BooksAPI} from "../API/api";

//состояние приложения
const initialState = {
    title: '!Search',
    subtitle: 'Book',
    emoji: '../../images/baseline_search_white_24dp.png',
    currentPage: 1,
    pagesCount: 0,
    isLoading: true,
    books: [], // массив книг полученных из поиска
    currentBook: '',// книги по которой проходит поиск
    description: {},
    cover: ''
}
function appReducer(state = initialState, action) {
    switch (action.type) {
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
        case DESCRIPTION__BOOK: {
            return {
                ...state,
                description: action.description,
            }
        }
        case COVER__BOOK: {
            return {
                ...state,
                cover: action.cover_i
            }
        }
        default: return state
    }
}

export const thunkGetBook = (book, page = 1) => async dispatch => { // делает запрос на сервер
    if (!book) {
        await dispatch(getBooksAction([]))
        return
    }
    await dispatch(currentBook(book));
    dispatch(loadingBooks())
    const books = await BooksAPI.getBooks(book, page)
    if (books.status === 200) {
        const page = Math.ceil(books.data.num_found / books.data.docs.length)
        if (isFinite(page)) {
            await dispatch(paginationPages(page))
            await dispatch(getBooksAction(books.data.docs))
        } else {
            await dispatch(paginationPages(0))
            await dispatch(getBooksAction([]))
        }
    }
}
export default appReducer
