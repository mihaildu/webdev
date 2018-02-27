/*
 * Functional wrapper for the main view
 * */
import React from "react";

import MainView from "./MainView";

function MainViewWrapper(props) {
    return (
	<MainView {...props} />
    );
}

export default MainViewWrapper;
