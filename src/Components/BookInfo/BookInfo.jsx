import classes from './BookInfo.module.scss'
import default_cover from '../../images/default-cover.png'
function BookInfo ({author_name, cover_i, title}, index) {
    let author = author_name ? author_name[0] : '[eq'
    return (
        <div key={index} className={classes.BookInfo}>
            <div>
                <img className={classes.img} src={ cover_i ? `http://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : default_cover} alt="search_book"/>
            </div>
            <div className={classes.name__book}>
                <span>Название книги:</span><p> {title}</p>
            </div>
            <div className={classes.author}>
                <span>Автор:</span><p>{author}</p>
            </div>

        </div>

    )
}

export default BookInfo