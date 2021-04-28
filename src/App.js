import React from 'react';
import classes from './styles/App.module.scss'
import {connect} from "react-redux";
import ButtonRenderTheme from "./Components/ButtonRenderTheme/Button";
import Title from "./Components/Title/Title";
import InputSearch from "./Components/InputSearch/InputSearch";
import {thunkGetBook} from "./reducer/appReducer";
import Loader from "./Components/Loader/loader";


function App(props) {
    console.log(props.books);
    // если у нас есть назание книги вызываем функцию thunkGetBook
    if (props.currentBook !== '') {
       props.thunkGetBook(props.currentBook)
    }
    document.body.className = props.theme
    return (
        <div className="App">
            <div className={classes.RenderThemeBlock}>
                <ButtonRenderTheme />
            </div>
            <Title />
            <InputSearch />
            <div className={classes.books__list}>
                {props.isLoading !== true ? <Loader /> : ''}
                {/*{props.isLoading ? books.map(({cover_i, author_name, title}, index) => (*/}
                {/*    <BookInfo cover_i={cover_i} title={title} author_name={author_name} key={index}/>*/}
                {/*)) : ''}*/}
            </div>
        </div>

      );
}
const mapStateToProps = state => {
    return {
        theme: state.app.theme,
        currentBook: state.app.currentBook,
        books: state.app.books,
        isLoading: state.app.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        thunkGetBook: book => dispatch(thunkGetBook(book))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)



