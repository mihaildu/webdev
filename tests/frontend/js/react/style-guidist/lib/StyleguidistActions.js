import StyleguidistDispatcher from "./StyleguidistDispatcher"

const ActionTypes = {
    UPDATE_THEME: "UPDATE_THEME"
}

const Actions = {
    updateTheme(theme) {
	StyleguidistDispatcher.dispatch({
	    type: ActionTypes.UPDATE_THEME,
	    theme
	});
    }
}

export {ActionTypes, Actions};
