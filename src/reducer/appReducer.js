import {
    CHANGE__MODAL__ACTIVE,
    COVER__BOOK,
    CURRENT__BOOK,
    DESCRIPTION__BOOK,
    GET__BOOKS,
    LOADING_BOOK,
    PAGINATION__COUNT, SET__TITLE__BOOK
} from "./types";
import {
    coverBook,
    currentBook,
    descriptionBook,
    getBooksAction,
    loadingBooks,
    paginationPages, setModal, setTitleBook
} from "../redux/actionType";
import {BooksAPI} from "../API/api";

//состояние приложения

const initialState = {
    title: '!Search',
    subtitle: 'Book',
    emoji: '../../images/baseline_search_white_24dp.png',
    currentPage: 1,
    pagesCount: 0,
    isLoading: true,
    books: [],
    currentBook: '',
    description: {},
    cover: '',
    isModalActive: false,
    titleBook: ''
}
function appReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE__MODAL__ACTIVE: {
            return {
                ...state,
                isModalActive: action.isActive
            }
        }
        case SET__TITLE__BOOK: {
            return {
                ...state,
                titleBook: action.title
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

export const thunkGetBook = (book, page = 1) => async dispatch => {
    if (!book) {
        await dispatch(paginationPages(0))
        await dispatch(getBooksAction([]))
        window.history.pushState({}, '', `/`);
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

export const getBookCall = (authorKey, cover, title) => async dispatch => {
    const book  = await BooksAPI.getBook(authorKey);
    dispatch(coverBook(cover));
    dispatch(setTitleBook(title))
    dispatch(descriptionBook(book.data.description));
    dispatch(setModal(true));
};
export default appReducer
