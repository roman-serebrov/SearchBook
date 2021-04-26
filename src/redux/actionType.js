import {THEME__RENDER} from "../reducer/types";

export function renderTheme(theme) {
    return {
        type: THEME__RENDER,
        theme
    }
}