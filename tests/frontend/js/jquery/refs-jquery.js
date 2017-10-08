// you don't have to include other js files to use them
// just make sure they are all added in the main html file

main();

function main(){
    test16_jquery_ui();
    //test15_regex();
    //test13_ajax();
    //test12_util();
    //test9_elements();
    //test2();
    //test1_installed();
}

$(document).ready(test16_jquery_ui);

function test16_jquery_ui(){
    $("#test16-div").draggable();
    $("#test16-div2").resizable();
    $("#test16-list").accordion();
}

function test15_regex(){
    var my_regex = /word/;
    // this doesn't seem to work
    // maybe try RegEx
    var my_regex2 = /word/g;
    var str = "This is a word";

    // searching for substring
    match = str.match(my_regex);
    console.log(match);
    //console.log(match.index);
    //console.log(match[0]);

    match2 = str.match(my_regex2);
    console.log(match2);
}

function test14_animate(){
    var box = $("#test14-div");
    // new css + animation time
    box.animate({width:"200px"}, 1500);
}

function test13_ajax(){
    // this just sends a get request with some params
    // this uses ajax and it's the same as
    // $.ajax({url: url, data: data, success: success, dataType: dataType});
    var res = $.get("jq.html", {name: "my-name"});

    // this is ugly
    $.get("jq.html", function(data) {
	//alert("Data Loaded: " + data);
	//$("body").html(data);
	//document.write(data);
    });

    // doing this with ajax
    // done is a handler
    $.ajax({method: "GET", url: "jq.html", data: {name: "my-name"}})
	.done(function(data){
	    //$("body").html(data);
	});
}

function test12_util(){
    // utility methods in $ (trim, each etc)
    console.log($.trim("  this removes whitespaces  "));

    // this looks so ugly
    $.each(["foo", "bar", "baz"], function(idx, val) {
	console.log("element " + idx + " is " + val);
    });

    var div = $("#test11-div");
    console.log(typeof div);
    console.log($.type(div));
}

function test11_data(){
    var div = $("#test11-div");
    alert(div.attr("mydata"));

    // you can also store stuff
    var secret_number = 10;
    div.data("my_key", secret_number);
    alert(div.data("my_key"));
}

function test10_traversing(){
    // this should be the paragraph
    var spn = $("#test10-span");
    spn_parent = spn.parent();

    //spn_parent.css("color", "pink");
    //spn_parent.html("New text");
    spn_parent.prepend("New text. ");

    // other methods: parents(), closest(), children(), find()
    // next(), prev() tags
}

function test9_elements(){
    // selecting all elements of one type
    var pars = $("p");

    /* you can iterate like this
    for (var i in pars) {
	console.log(pars[i]);
    }
    */

    // this is better
    for (var i in pars) {
	// showing only the html
	// since this runs before test9_p
	// that one will have undefined content
	console.log(pars.eq(i).html());
    }

    // this also works - it's the same as pars[i]
    console.log(pars.get(0));
}

// counting number of elements on the page
$(document).ready(function(){
    var test9_p = $("#test9-count");
    var str = "This page has " + $("p").length + " paragraphs";
    test9_p.html(str);
});

function test8_create(){
    // this will create new element
    var newp = $("<p>Some new paragraph</p>");
    newp.appendTo("#test8-div");
}

function test7_remove(){
    $("#test7-p").remove();

    // other ways of doing this
    //$("#test7-p").empty();
    //$("#test7-p").hide();
    //$("#test7-p").css("display", "none");
    //$("#test7-p").fadeOut();

    // attributes = one property of the DOM object
    //$("#test7-p").prop("hidden", "hidden");
}

function test6_append(){
    $("#test6-p").append(". Appended text.");
}

function test5_add_attr(){
    $("#test5-p").attr("align", "center");
    // you can set multiple attributes
    // attr({attr1: val1, attr2: val2, ...});
}

function test4_change_class(){
    $("#test4-p").addClass("green-text");
    // to remove it
    //$("#test3-p").removeClass("green-text");
}

// instead of doing this, you can just run a
// named function when the document is ready
function test3_ready(){
    console.log("function 3 ready");
}

// or document.ready(...)
$(test3_ready);

// this is a shorter way to write $().ready(...)
$(function(){
    console.log("ready");
});

// this is an anonymous function that will
// run once the document finishes loading
// this is the equivalent of window.onload()
$(document).ready(function(){
    // this will replace everything
    // I guess this is pushed at the end in a normal function
    //document.write("This text is last");
});

// this will change the entire document
function test2_change_document(){
    // this can be done old way
    document.write("New document");

    // I guess the only jquery document functions are
    //$(document).load();
    //$(document).ready();
    //$(document).unload();
}

function test2_change_background(){
    // why is the initial color in rgba
    var bg_color = $("body").css("background-color");
    if (bg_color == "rgba(0, 0, 0, 0)") {
	$("body").css("background-color", "rgba(255, 0, 0, 1)");
    } else {
	$("body").css("background-color", "rgba(0, 0, 0, 0)");
    }
}

function test2_change_text(){
    $("#test2-div").html("Changed text");
    // for input elements $().val() works
    // TODO add some test for this
}

// interacting with the document
function test2(){
    /*
     * Some stuff about jquery:
     *   It tries to make it easier to interact with the document
     *   Now you have a function jQuery. You can use this function
     *     like this (jQuery) or use the alias: $.
     *   This function takes a string (or an object) as argument
     *     e.g. jQuery("body"), $(document)
     *   You can then call new functions (can you have subfunctions?)
     *     on what this returns.
     *     e.g. $("div").html("new inner html"), $("#my-id").css(...)
     *   You also have global (sub)functions
     *     e.g. $.trim(), $.each, $.get() etc
     */

    // the jQuery function
    console.log(jQuery);
    console.log($);

    // selecting something with jQuery
    var body = $("body");
    console.log(body);
    body.html("Look at me, I am the body now!");

    // selecting the whole document
    console.log($(document));

    // selecting some id
    console.log($("#my-id"));

    // selecting some class
    console.log($(".my-class"));

    // global functions $.get(), $.post(), $.ajax() etc
    // look above
}

function test1_installed(){
    if (typeof jQuery == "undefined") {
	alert("jQuery is not installed");
    } else {
	alert("jQuery is installed");
    }
}
