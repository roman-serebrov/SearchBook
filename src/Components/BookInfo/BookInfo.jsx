import classes from './BookInfo.module.scss'
import default_cover from '../../images/default-cover.png'
import {connect} from "react-redux";
import {BooksAPI} from "../../API/api";


function BookInfo ({author_key, author_name, cover_i, title, setModal, descriptionBook, coverBook}, index) {
    let subTitle = title.length > 17 ? title.substr(0, 17) + '...' : title
    let author = author_name ? author_name[0] : 'нет автора'

  async function openModelWindow (e, author_key, setModal, cover_i) {
        e.preventDefault()
        const book = await BooksAPI.getBook(author_key)
        console.log(book);
        await coverBook(cover_i)
        await descriptionBook(book.data.description)
        await setModal(true)
    }

    return (
        <div key={index} className={classes.BookInfo}>
            <div>
                <img className={classes.img} src={cover_i ? `http://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : default_cover} alt="search_book"/>
            </div>
            <div className={classes.name__book}>
                <span>Название книги:</span><a onClick={e => openModelWindow(e, author_key, setModal, cover_i)} href=""> {subTitle}</a>
            </div>
            <div className={classes.author}>
                <span>Автор:</span><p>{author}</p>
            </div>
        </div>

    )
}
const mapStateToProps = state => {
    return {
        books: state.app.books,
        isLoading: state.app.isLoading,
    }
}
export default connect(mapStateToProps)(BookInfo)