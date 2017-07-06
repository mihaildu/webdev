// run all these functions after document is loaded
$(document).ready(code_area_height);
$(document).ready(init);

function run(){
    // get content from html area
    html_val = "<html>" + $("#html-input").val() + "</html>";
    css_val = "<style>" + $("#css-input").val() + "</style>";
    js_val = "<script>" + $("#js-input").val() + "</script>";
    $("#result").attr("srcdoc", css_val + html_val + js_val);

    // reloading an iframe - we don't need it since we replace the src
    // keeping this here for ref in the future
    //document.getElementById("result").contentDocument.location.reload(true);
}

function change_layout(btn_id, area_id){
    // TODO sanity checks for id_str, area_id

    // change button style & show/hide area
    var is_active = true;
    if ($(btn_id).hasClass("active")) {
	$(btn_id).removeClass("active");
	$(area_id).hide();
	is_active = false;
    } else {
	$(btn_id).addClass("active");
	$(area_id).show();
    }

    // remove old col classes
    $(".code-area").removeClass(function(index, className) {
	return (className.match(/col-md-./g) || []).join(" ");
    });
    $(".result-area").removeClass(function(index, className) {
	return (className.match(/col-md-./g) || []).join(" ");
    });

    // add new classes
    var new_class;
    var sizes = {
	0: "col-md-12",
	1: "col-md-6",
	2: "col-md-4",
	3: "col-md-3"
    };

    num_active = $(".btn.active").length;
    // TODO sanity check for num_active
    new_class = sizes[num_active];
    // prob some useless operations here but heh
    $(".code-area").addClass(new_class);
    $(".result-area").addClass(new_class);
}

function change_js(){
    change_layout("#js-btn", "#js-area");
}

function change_css(){
    change_layout("#css-btn", "#css-area");
}

function change_html(){
    change_layout("#html-btn", "#html-area");
}

function code_area_height(){
    // set code area height to window height
    var new_height = $(window).height();
    // this can be avoided using padding instead of margin
    var navbar_height = $(".navbar-default").height() + 1;
    $(".code-area").css("height", new_height - navbar_height);
    $(".result-area").css("height", new_height - navbar_height);
}

function init(){
    // various init stuff
    window.onresize = code_area_height;
    // set iframe font style
    result_style = "<style>*{color:#c8c8c8;}</style>";
    result_text = "Result will be displayed here";
    $("#result").attr("srcdoc", result_style + result_text);

    // same thing can be achieved with .contents()
    //$("#result").contents().find("html").html("<h1>Hi</h1>");
}
