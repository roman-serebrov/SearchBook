import { useState, useEffect } from 'react';
import classes from './InputSearch.module.scss'
import {connect} from "react-redux";
import searchIcon from '../../images/baseline_search_white_24dp.png'
import searchIconBlack from '../../images/baseline_search_black_24dp.png'
import {currentBook} from "../../redux/actionType";
let timer = null;
const debounce = (callback, time) => {
    if (!timer) {
        timer = setTimeout(() => {
            callback();
            clearTimeout(timer);
        }, time);
    } else {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback();
            clearTimeout(timer);
        }, time);
    }
};
const ITEMS_PER_PAGE = 1000;
function InputSearch(props) {
    const [book, setBooks] = useState('')
   const getBook = (e) => {
        // получаем название книги
       debounce( () => {
          // const books = await BooksAPI.getBook(e.target.value)
           // await setPagesCount(Math.ceil(books.data.num_found / books.data.docs.length))
           // await setBooks(books.data.docs)
           setBooks(e.target.value)
       }, ITEMS_PER_PAGE)
   }
    useEffect(() => {
        if (book === '') {
            return
        }
        props.getCurrentBook(book)
        return () => {
            console.log('unmounte')
            props.getCurrentBook(book)
        }
        // записываем в состояние название книги которое ищем
    },[book])


    return(
        <div className={classes.InputSearch}>
            <form action="">
                <input onInput={getBook} autoFocus={true} type="text" />
                <button className={classes.button__search}>
                    <img src={props.theme.endsWith('__dark') ? searchIcon : searchIconBlack} alt="search_input" />
                </button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.app.theme,
        pagesCount: state.app.pagesCount,
        books: state.app.books,
        currentBook: state.app.currentBook
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getCurrentBook: book => dispatch(currentBook(book))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputSearch)