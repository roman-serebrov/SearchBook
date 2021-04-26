import {theme} from '../../utils/utils'
import {connect} from "react-redux";
import classes from './Button.module.scss'
import {renderTheme} from "../../redux/actionType";
import {useState} from "react";


function ButtonRenderTheme (props) {
    const [themeState, setTheme] = useState(props.theme)
    function tState () {
        setTheme((prevTheme) => {
         prevTheme = prevTheme === 'theme__dark' ? 'theme__light' : 'theme__dark'
            props.renderTheme(prevTheme)
            return prevTheme
        })
    }
    return (
        <button className={classes.ButtonRender}  onClick={tState}/>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.app.theme
    }
}

const mapDispatchToProps = dispatch => {
    return {
        renderTheme: theme =>  dispatch(renderTheme(theme))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ButtonRenderTheme)