import rootReducer from "../reducer/rootReducer";

const {createStore} = require("redux");
export const store = createStore(rootReducer)