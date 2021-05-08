import classes from './InputSearch.module.scss'
import {connect} from "react-redux";
import searchIcon from '../../images/baseline_search_white_24dp.png'
let timer = null;
const ITEMS_PER_PAGE = 1000;

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


function InputSearch(props) {

   const getBook = (e) => {
       debounce( () => {
            props.onSearch(e.target.value)
       }, ITEMS_PER_PAGE)
   }

    return(
        <div className={classes.InputSearch}>
            <form action="">
                <input onInput={getBook} autoFocus={true} type="text" defaultValue={props.initialValue}/>
                <button className={classes.button__search}>
                    <img src={searchIcon} alt="search_input" />
                </button>
            </form>
        </div>
    )
}
export default connect()(InputSearch)