/*
 * React tests.
 *
 * I might need a mode for react/jsx with all this weird syntax
 * https://github.com/felipeochoa/rjsx-mode
 *
 * Official react docs:
 * https://reactjs.org/docs/hello-world.html
 *
 * Official react tutorial:
 * https://reactjs.org/tutorial/tutorial.html
 * */

import React from "react";
import ReactDOM from "react-dom";

main();

function main(){
    test1();
}

function test1(){
    /*
     * One way to use react is to create divs on the html page
     * in this case dist/index.html, and then select them with
     * react and update the stuff inside
     *
     * You use ReactDOM.render(HTML stuff, element id)
     * */

    /*
     * this will select element with id "react-elem1" and will
     * add "<h1>Hello, world!</h1>" to its inner html
     * */
    ReactDOM.render(
	<h1>Hello, world!</h1>,
	document.getElementById("react-elem1")
    );

    /*
     * you can also use classes for the html part
     * ReactDOM.render(<ClassName/>, element)
     * */
    class Layout extends React.Component {
	render(){
	    return (
		<p>This is a paragraph</p>
	    );
	}
    }

    const elem1 = document.getElementById("react-elem2");
    ReactDOM.render(<Layout/>, elem1);
}
