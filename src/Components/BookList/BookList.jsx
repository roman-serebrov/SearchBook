import React from 'react'
import classes from "../../styles/App.module.scss";
import Loader from "../Loader/loader";
import BookInfo from "../BookInfo/BookInfo";
import {connect} from "react-redux";
import {coverBook, descriptionBook} from "../../redux/actionType";

function BookList(props) {
    return (
        <div className={classes.books__list}>
            {props.isLoading !== true ? <Loader /> :
                props.books.map(({key, cover_i, author_name, title, author_key}, index) => {
                    return <BookInfo
                                    descriptionBook={props.descriptionBook}
                                    setModal={props.setModal}
                                     author_key={key}
                                     cover_i={cover_i}
                                     title={title}
                                     author_name={author_name}
                                     key={index}
                                    coverBook={props.coverBook}
                    />
                })}
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        descriptionBook: description => dispatch(descriptionBook(description)),
        coverBook: cover_i => dispatch(coverBook(cover_i))
    }
}

const mapStateToProps = state => {
    return {
        books: state.app.books,
        isLoading: state.app.isLoading,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList)