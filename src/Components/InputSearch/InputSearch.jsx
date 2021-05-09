import classes from './InputSearch.module.scss'
import {connect} from "react-redux";
import searchIcon from '../../images/baseline_search_white_24dp.png'
import {useCallback} from "react";
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
    const searchPress = useCallback(e => {
        if(e.key === 'Enter' || e.target.dataset.search) {
            e.preventDefault()
            props.onSearch(e.target.value)
        }
    }, [])


    return(
        <div className={classes.InputSearch}>
            <form action="">
                <input onKeyPress={searchPress} onInput={getBook} autoFocus={true} type="text" defaultValue={props.initialValue}/>
                <button className={classes.button__search}>
                    <img onClick={searchPress} src={searchIcon} alt="search_input" data-search/>
                </button>
            </form>
        </div>
    )
}
export default connect()(InputSearch)