import {connect} from "react-redux";
import classes from './Title.module.scss'
function Title(props) {
    return (
        <div className={classes.Title}>
            <h1>{props.title}<span>{props.subtitle}</span></h1>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        theme: state.app.theme,
        title: state.app.title,
        subtitle: state.app.subtitle
    }
}

export default connect(mapStateToProps)(Title)