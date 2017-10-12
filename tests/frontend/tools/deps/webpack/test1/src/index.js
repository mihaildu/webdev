import _ from "lodash";

function component(){
    var element = document.createElement("div");

    // lodash is needed for this line to work
    // _ is in lodash
    element.innerHTML = _.join(["hello", "from", "webpack"], " ");
    return element;
}

document.body.appendChild(component());

// using jquery
var $ = require("jquery");
$("#my-div").html("hello from jquery");
