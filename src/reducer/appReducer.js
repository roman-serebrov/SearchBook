const {THEME__RENDER} = require("./types");
const initialState = {
    theme: 'theme__dark',
    title: '!Search',
    subtitle: 'Book',
    emoji: '../../images/baseline_search_white_24dp.png',
    timer: false
}
function appReducer(state = initialState, action) {
    switch (action.type) {
        case THEME__RENDER:{
            console.log('action',action.theme);
            return {
                ...state,
                theme: action.theme
            }

        }
        default: return state
    }
}
export default appReducer