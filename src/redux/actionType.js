import {
    COVER__BOOK,
    CURRENT__BOOK,
    DESCRIPTION__BOOK,
    GET__BOOKS,
    LOADING_BOOK,
    PAGINATION__COUNT,
    THEME__RENDER
}
    from "../reducer/types";

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

export function descriptionBook (description) {
    return {
        type: DESCRIPTION__BOOK,
        description,
    }
}

export function coverBook(cover_i) {
    return {
        type: COVER__BOOK,
        cover_i
    }
}