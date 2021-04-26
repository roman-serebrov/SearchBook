import classes from './InputSearch.module.scss'
import {connect} from "react-redux";
import searchIcon from '../../images/baseline_search_white_24dp.png'
import searchIconBlack from '../../images/baseline_search_black_24dp.png'

function InputSearch(props) {
   const getBook = (e) => {
      const timeSeconds = new Date(e.timeStamp)
       console.log(timeSeconds.getSeconds());


   }

    return(
        <div className={classes.InputSearch}>
            <form action="">
                <input onInput={getBook} autoFocus={true} type="text" />
                <button className={classes.button__search}>
                    <img src={props.theme.endsWith('__dark') ? searchIcon : searchIconBlack}/>
                </button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.app.theme,
        timer: state.app.timer
    }
}

export default connect(mapStateToProps)(InputSearch)