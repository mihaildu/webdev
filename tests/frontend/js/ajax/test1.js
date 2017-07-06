function test1(){
    var xhttp = new XMLHttpRequest();

    // set the handler for response
    xhttp.onreadystatechange = function() {
	// this is just copied from w3schools
	// what 4 means etc
	if (this.readyState == 4 && this.status == 200) {
	    document.getElementById("my-div").innerHTML = this.responseText;
	}
    };

    // create a new GET request
    xhttp.open("GET", "txt_file", true);
    // actually send it
    // this doesn't block, it's just async
    xhttp.send();
}

function test2(){
    document.getElementById("my-div").innerHTML = "New content of the div";
}
