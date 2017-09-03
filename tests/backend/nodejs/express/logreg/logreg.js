/*
 * simple login & register page
 *
 * [/, /index, /index.html]
 *   * shows the login & register form
 *   * redirects to /user if someone is already logged in
 * /user
 *   * shows info on user (after log in)
 * /logout
 *   * logs the user out
 * /register
 *   * registers a new user
 *
 * TODO
 *   make a version of this with mongodb
 *   use hogan to fix value=
 *   make a generic function that allows you to chain function that gets
 *     executed one after another only on success, and on fail they should
 *     emit a specified event
 */
const express = require("express");
const app = express();
const port = 3000;

/* other third party modules */
const escape = require("escape-html");
const fs = require("fs");
const qs = require("querystring");

/*
 * login & register modules
 * there are 2 version: v1 and v2
 * */
const login = require("include/v2/login.js");
const signup = require("include/v2/signup.js");

/* start session */
const session = require("express-session");
app.use(session({
    secret: "logreg secret",
    resave: false,
    saveUninitialized: true,
}));

app.get(["/", "/index", "/index.html"], function(req, res){
    /*
     * main page
     * has 2 forms, one with login and another one with signup
     * */

    /* session didn't start, something went wrong */
    if (typeof(req.session) == "undefined"){
	throw new Error("session didn't start");
    }

    /*
     * if user already logged in, redirect to "/user"
     *
     * apparently id is taken when the session is created
     * also, after a redirect() the code is still executed
     * a "return;" will do
     * */
    if (typeof(req.session["uid"]) != "undefined"){
	res.redirect("/user");
	return;
    }

    /* check for flash messages */
    if (typeof(req.session["messages"]) != "undefined"){
	let messages = req.session["messages"];
	let body = "<div style='color:red;'>";
	for (let key in messages){
	    body += messages[key] + "<br>";
	}
	body += "</div><br>";
	res.write(body);
	delete req.session["messages"];
    }

    /*
     * for now I'm going to use a file stream to show html
     * this should be replaced with a template engine
     * this would also make it easier to add the value= attr
     */
    let rstream = fs.createReadStream("views/index.html");
    rstream.pipe(res);
});

app.post(["/", "/index", "/index.html"], function(req, res){
    /*
     * the post URL is the one from which the submit was clicked
     * for cases like this app.route() can be used
     * */

    /* if user already logged in - ignore */
    if (typeof(req.session["uid"]) != "undefined"){
	res.redirect("/user");
	return;
    }

    /* get post data in async/flowing mode */
    let body = "";
    req.on("data", (chunk) => {
	let chunk_str = chunk.toString();
	body += chunk_str;
    });

    let post_data;
    req.on("end", () => {
	post_data = qs.parse(body);

	/* login post */
	if (typeof(post_data["submit_login"]) != "undefined"){
	    /* check if post was done correctly */
	    if (typeof(post_data["username_login"]) == "undefined" ||
		typeof(post_data["password_login"]) == "undefined"){
		console.error("incorrect post");
		res.redirect(req.url);
		return;
	    }
	    let login_data = {
		username: post_data["username_login"],
		password: post_data["password_login"]
	    };
	    login.attempt_login(login_data, req);
	    return;
	}

	/* signup post */
	if (typeof(post_data["submit_signup"]) != "undefined"){
	    /* check if post was done correctly */
	    if (typeof(post_data["username_signup"]) == "undefined" ||
		typeof(post_data["password_signup"]) == "undefined"){
		console.error("incorrect post");
		res.redirect(req.url);
		return;
	    }
	    let signup_data = {
		username: post_data["username_signup"],
		email: post_data["email_signup"],
		password: post_data["password_signup"]
	    };
	    signup.attempt_signup(signup_data, req);
	    return;
	}

	/* other type of post */
	console.error("invalid post: ", post_data);
	res.redirect(req.url);
	return;
    });

    /* wait for completion - check readme for how this works */
    req.once("login", (ret, args) => {
	if (ret["success"] === true){
	    /* move values from ret.session to req.session */
	    Object.assign(req.session, ret.session);
	    res.redirect("/user");
	    return;
	}

	/* save messages in req.session - flash messages */
	req.session["messages"] = ret["messages"];

	/* save post data for autofill */
	req.session["submit_login"] = true;
	if (post_data["username_login"]){
	    req.session["username_login"] = post_data["username_login"];
	}
	if (post_data["password_login"]){
	    req.session["password_login"] = post_data["password_login"];
	}

	/* switch from post to get */
	res.redirect(req.url);
	return;
    });
    req.once("signup", (ret, args) => {
	if (ret["success"] === true){
	    /* log the user in and redirect */
	    Object.assign(req.session, ret.session);
	    res.redirect("/user");
	    return;
	}

	/* save messages in req.session - flash messages */
	req.session["messages"] = ret["messages"];

	/* save post data for autofill */
	req.session["submit_signup"] = true;
	if (post_data["username_signup"]){
	    req.session["username_signup"] = post_data["username_signup"];
	}
	if (post_data["password_signup"]){
	    req.session["password_signup"] = post_data["password_signup"];
	}

	/* switch from post to get */
	res.redirect(req.url);
	return;
    });
});

app.get("/user", function(req, res){
    /*
     * user home page
     * info about the user from the db will be displayed here
     * */

    /* check if user is logged in */
    if (typeof(req.session["uid"]) == "undefined"){
	res.redirect("/");
	return;
    }

    /* main text */
    let body = "<p>Hello <b>" + escape(req.session["username"]) + "</b> " +
	"this is the information we have about you:<br><br>" +
	"Your id: " + req.session["uid"] + "<br>" +
	"Your email: " + escape(req.session["email"]) + "<br>" +
	"Your password: " + req.session["password"] + "<br></p>";
    res.write(body);

    /* logout button */
    let rstream = fs.createReadStream("views/logout_btn.html");
    rstream.pipe(res);
});

app.post("/user", function(req, res){
    /*
     * post request on user home page
     * this is used for logging out at the moment
     * */

    /* sanity checks */
    if (typeof(req.session["uid"]) == "undefined"){
	console.error("bad post for /user");
	res.redirect("/user");
	return;
    }

    /* get post data */
    let body = "";
    req.on("data", (chunk) => {
	let chunk_str = chunk.toString();
	body += chunk_str;
    });
    req.on("end", () => {
	let post_data = qs.parse(body);
	if (typeof(post_data["submit_logout"]) != "undefined"){
	    req.session.destroy();
	}
	res.redirect("/");
    });
});

app.use(function(err, req, res, next){
    /* generic error handler */
    console.error(err);
    res.status(500).send("Oops, something went wrong: " + err.message);
});

app.listen(port, function(){
    /* start the app */
    console.log("Started app on port 3000!");
});
