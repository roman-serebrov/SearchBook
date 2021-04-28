import rootReducer from "../reducer/rootReducer";
import {applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";

const {createStore} = require("redux");


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))