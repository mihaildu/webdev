// this will be a loaded module in test2
var x = 100;

my_export();

function my_export(){
    //export1();
    //export2();
    export3();
}

function export3(){
    var y = 100;
    module.exports = {x, y};
}

function export2(){
    module.exports = function(){
	console.log("Hello from test2");
    }
}

function export1(){
    // export syntax
    // module.exports = json that will be imported in other files
    module.exports.x = x;
    // now module.exports is { x: 100 }
}
