import {CURRENT__BOOK, GET__BOOKS, LOADING_BOOK, PAGINATION__COUNT, THEME__RENDER} from "../reducer/types";

export function renderTheme(theme) {
    return {
        type: THEME__RENDER,
        theme
    }
}

export function paginationPages(count) {
    return {
        type: PAGINATION__COUNT,
        count
    }
}

export function loadingBooks() {
    return {
        type: LOADING_BOOK,
    }
}

export function getBooksAction(books) {
    return {
        type: GET__BOOKS,
        books
    }
}

export function currentBook(book) {
    return {
        type: CURRENT__BOOK,
        book
    }
}