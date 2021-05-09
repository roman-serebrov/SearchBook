import { useCallback } from "react";
import classes from './BookInfo.module.scss'
import {connect} from "react-redux";
import Cover from "../Cover/Cover";
import {getBookCall} from "../../reducer/appReducer";



const InfoBlock = ({title, subTitle}) => {
    return (
        <div className={classes.InfoBlock}>
            <span>{title}:</span><p>{subTitle}</p>
        </div>
    )
}

function BookInfo ({author_key, author_name, cover_i, title, openModal}, index) {
    let subTitle = title.length > 17 ? title.substr(0, 17) + '...' : title
    let author = author_name ? author_name[0] : 'нет автора'

  const  openModelWindow = useCallback(e => {
      e.preventDefault()
      openModal(author_key, cover_i, title)
  }, [author_key, cover_i])

    return (
        <div key={index} className={classes.BookInfo} onClick={openModelWindow}>
                <Cover className={classes.img} id={cover_i} alt={subTitle} width={180} height={200}/>
            <InfoBlock title="Название книги" subTitle={subTitle}/>
            <InfoBlock title="автор" subTitle={author}/>
        </div>

    )
}
const mapStateToProps = state => {
    return {
        books: state.app.books,
        isLoading: state.app.isLoading,
        titleBook: state.app.titleBook
    }
}
const mapDispatchToProps = dispatch => ({
    openModal: (authorKey, cover, title) => dispatch(getBookCall(authorKey, cover, title)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BookInfo)