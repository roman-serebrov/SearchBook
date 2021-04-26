import React, {useState}from 'react';
import classes from './styles/App.module.scss'
import {connect} from "react-redux";
import ButtonRenderTheme from "./Components/ButtonRenderTheme/Button";
import Title from "./Components/Title/Title";
import InputSearch from "./Components/InputSearch/InputSearch";
import {BooksAPI} from "./API/api";

// class AppState extends React.Component{
//     constructor(props) {
//         super(props);
//         this.props = props
//     }
//     render() {
//         document.body.className = this.props.theme
//         return (
//         <div className="App">
//             <div className={classes.RenderThemeBlock}>
//                 <ButtonRenderTheme />
//             </div>
//             <Title />
//             <InputSearch />
//         </div>
//       );
//     }
// }

function App(props) {
    document.body.className = props.theme
    return (
        <div className="App">
            <div className={classes.RenderThemeBlock}>
                <ButtonRenderTheme />
            </div>
            <Title />
            <InputSearch />
        </div>
      );
}
const mapStateToProps = state => {
    return {
        theme: state.app.theme,
    }
}

export default connect(mapStateToProps)(App)



