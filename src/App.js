import React, {useEffect, useState} from 'react';
import classes from './styles/App.module.scss'
import {connect} from "react-redux";
import Title from "./Components/Title/Title";
import InputSearch from "./Components/InputSearch/InputSearch";
import {thunkGetBook} from "./reducer/appReducer";
import Loader from "./Components/Loader/loader";
import BookInfo from "./Components/BookInfo/BookInfo";


function App(props) {
    const [paginationPages, setPagination] = useState([])
    useEffect(() => {
        if (props.pagesCount) {
            for (let i = 0; i < props.pagesCount; i++) {
                paginationPages[i] = i
            }
        }
     },[props.pagesCount])

    console.log(paginationPages.length);
    useEffect(() => {
        console.log('запрос на серевер mount')
            if (props.currentBook === '') {
                return
            }
            props.thunkGetBook(props.currentBook)
                return () => {
                    console.log('запрос на серевер unmount')
                    props.thunkGetBook(props.currentBook)
                }
            }, [props.currentBook])
    return (
        <div className="App">
            <Title />
            <InputSearch />
            <div className={classes.books__list}>
                {props.isLoading !== true ? <Loader /> :
                    props.books.map(({cover_i, author_name, title}, index) => {
                   return <BookInfo cover_i={cover_i} title={title} author_name={author_name} key={index}/>
                })}
            </div>
            <div className={classes.pagination}>
                {paginationPages.length ? paginationPages.slice(0, 10).map((value, index) =>  {
                    return (
                        <button key={index}>{value + 1}</button>
                    )
                })  : [] }
            </div>
        </div>

      );
}
const mapStateToProps = state => {
    return {
        currentBook: state.app.currentBook,
        books: state.app.books,
        isLoading: state.app.isLoading,
        pagesCount: state.app.pagesCount
    }
}

const mapDispatchToProps = dispatch => {
    return {
        thunkGetBook: book => dispatch(thunkGetBook(book))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)



