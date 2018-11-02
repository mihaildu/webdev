/*
 * Random javascript tests in the browser.
 */

main();

function main(){

    //test7_write_something();

    // this is for test 6
    div_color = "teal";

    test4_set_onclick();
    //test3_change_text();
    //test2_alert();
    //test1_console();
}

function test8_current_url() {
  /**
   * getting current url
   * everything in window.location
   */
  console.log(location.host);
  console.log(window.location);

  /* this is the full path (protocol included) */
  console.log(window.origin);
}

function test7_write_something(){
    // this just prints something at the end of body
    document.write("Hello from test 7");
}

function test6_show_color(){
    // dv.style.backgroundColor won't work, since this is the inline attr
    var dv = document.getElementById("test6-div");
    computed_style = window.getComputedStyle(dv);
    bg_color = computed_style.getPropertyValue("background-color");
    alert(bg_color);
}

function test6_change_div(){
    // hide with css
    var dv = document.getElementById("test6-div");
    var btn = document.getElementById("test6-hide-btn");
    if (dv.style.display == "none") {
	dv.style.display = "";
	btn.innerHTML = "Hide it";
	// remove property also works
	//dv.style.removeProperty("display");
    } else {
	dv.style.display = "none";
	btn.innerHTML = "Show it";
    }
}

function test6_change_color(){
    var dv = document.getElementById("test6-div");

    // this just adds the style (inline) so css file still applies
    //dv.setAttribute("style", "background-color:lime;");

    // properties like background-color will turn to backgroundColor
    // this is not a proper way to store color state, always check css
    if (div_color == "teal") {
	dv.style.backgroundColor = "lime";
	div_color = "lime";
    } else {
	dv.style.backgroundColor = "teal";
	div_color = "teal";
    }

    // apparently this works too
    //dv.style.cssText = "background-color:lime;"
}

function test5_insert_html(){
    var dv = document.getElementById("test5-div");
    dv.innerHTML = "This is a list <ol><li>Item</li></ol>";
}

function test4_set_onclick(){
    var btn = document.getElementById("test4-button");
    btn.onclick = _test4;
}

function _test4(){
    alert("Hello from test4");
}

function test3_change_text(){
    // p is HTMLParagraphElement which inherits HTMLElement
    // HTMLElement inherits from Element
    // properties of HTMLElement & Element on mozilla website
    var p = document.getElementById("text-change");
    // inner html = between tags
    p.innerHTML = "Changed text";

    // most of p's attributes can be accessed like this p.attr
    // e.g. p.value, p.name, p.style etc

    // this will hide it
    //p.hidden = true;
}

function test2_alert(){
    alert("This is an alert from js file");
}

function test1_console(){
    // this is visiable in "dev tools > console"
    var a = 10;
    console.log(a);
}
