import React, {useCallback, useEffect, useState} from 'react';
import classes from './styles/App.module.scss'
import {connect} from "react-redux";
import Title from "./Components/Title/Title";
import InputSearch from "./Components/InputSearch/InputSearch";
import {thunkGetBook} from "./reducer/appReducer";
import BookList from "./Components/BookList/BookList";
import Pagination from "./Components/Paginatino/Pagination";
import ModalWindow from "./UI/modal_window";





function App(props) {
    const [initialInput, setInitialInput] = useState('');
    const [initialPage, setInitialPage] = useState(1)
    const [modalActive, setModal] = useState(false)

    useEffect(() => {
        let { book, page } = window.location.search.slice(1).split('&').map(v => v.split('=')).reduce((a, b) => ({...a, [b[0]]: b[1]}), {});
        if (book) {
            book = decodeURI(book);
        }
        setInitialInput(book || '');
        setInitialPage(page ? parseInt(page) : 1);
        props.thunkGetBook(book, page);
    }, []);

     const updateResultsByPage = useCallback((page) => props.thunkGetBook(props.currentBook, page), [props.currentBook])

    return (
        <div className={"App"}>
            <Title />
            <InputSearch onSearch={props.thunkGetBook} initialValue={initialInput} />
           <BookList setModal={setModal}/>
            <Pagination  initialPage={initialPage} onPageChanged={updateResultsByPage}/>
            <ModalWindow  cover={props.cover} active={modalActive} setActive={setModal} description={props.description}/>
        </div>
      );
}
const mapStateToProps = state => {
    return {
        currentBook: state.app.currentBook,
        isLoading: state.app.isLoading,
        pagesCount: state.app.pagesCount,
        description: state.app.description,
        cover: state.app.cover
    }
}

const mapDispatchToProps = dispatch => {
    return {
        thunkGetBook: (book, page)=> dispatch(thunkGetBook(book, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)



