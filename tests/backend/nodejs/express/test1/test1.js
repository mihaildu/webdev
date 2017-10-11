const express = require("express");
const app = express();

/*
 * express adds this routing layer
 * a route definition looks like this
 *   app.METHOD(PATH, HANDLER);
 */

// a route for "GET /"
app.get("/", function(req, res){
    /*
     * res is still a http.ServerResponse
     * req is still a http.IncomingMessage
     *
     * content type seems to be set to text/html in res.send()
     * you can change it the same old fashioned way:
     * res.setHeader("Content-Type", "text/plain");
     *
     * you can still use the old methods but some new ones
     * have been added like res.send(), res.sendFile() etc
     *
     * however you can't mix the 2 since res.send() will
     * try to set the headers and they can't be set after
     * a call to res.write(); if you res.send() the call
     * to res.write() won't be reached
     */
    // this will .end() the response as well
    res.send("Hello World!");
});

app.get("/old", function(req, res){
    res.write("First line from Express\n");
    res.end();
});

// a route for "POST /"
app.post("/", function(req, res){
    res.send("Got a post request");
});

// you can also send HTML files
app.get("/html", function(req, res){
    /*
     * you need to specify the file by abs path
     * also ".." is considered malicious so
     * __dirname + "/test1.html" doesn't work
     */
    var proj_path = "/var/www/html/tests/backend/nodejs/express/test1";
    var file_path = proj_path + "/test1.html";
    res.sendFile(file_path);
});

// you can also send HTTP codes directly
app.get("/400", function(req, res){
    /*
     * apparently res.send(status_code) is deprecated
     * res.sendStatus(code) = new way
     *
     * 400 = Bad Request
     */
    res.sendStatus(400);
});

// you can do reg expr with the routes
// ? = optional (at most once); e.g. b is optional here
// so this will match /abcd and /acd
app.get("/ab?cd", function(req, res){
    res.send("/abcd or /acd");
});

// + = at least once
app.get("/ab+ce", function(req, res){
    res.send("/abce, /abbce, /abbbce ...");
});

// * = anything
app.get("/ab*cf", function(req, res){
    res.send("/abcf, /abANYTHINGcf, ...");
});

// () = grouping stuff together
app.get("/ab(cd)?cg", function(req, res){
    res.send("/abcdcg or /abcg");
});

// apparently everything before this is just a string match
// reg expr are with //
// this will match everything with x in it
app.get(/x/, function(req, res){
    res.send("This path has x in it");
});


// .* = any character 0-inf
// $ = end of string
// this matches anything that ends in "fly"
app.get(/.*fly$/, function(req, res){
    res.send("This path ends in fly");
});

// route params (capture values from URL)
app.get("/book/:id", function(req, res){
    res.send("This is book " + req.params["id"]);
});

// combining route params (this works for - and .)
app.get("/flight/:from-:to", function(req, res){
    res.send("This is flight " + req.params["from"] + " to " +
	    req.params["to"]);
});

// you can have multiple handlers for the same route
// you need to add next to function params
app.get("/multiple", function(req, res, next){
    // however you can't send messages multiple times
    // so this would crash
    //res.send("Hello from first handler");
    console.log("First handler for /multiple called");
    next();
});

app.get("/multiple", function(req, res){
    res.send("Hello from second handler");
    console.log("Second handler for /multiple called");
});

// you can also define multiple function in same app.get call
app.get("/multiple2", function(req, res, next){
    console.log("First handler for /multiple2");
    next();
}, function(req, res){
    console.log("Second handler for /multiple2");
    res.send("Hello from /multiple2");
});

// you can also use an array of functions
var fcn1 = function(req, res, next){
    console.log("Hello from fcn1");
    next();
}
var fcn2 = function(req, res, next){
    console.log("Hello from fcn2");
    next();
}
var fcn3 = function(req, res){
    console.log("Hello from fcn3");
    res.send("Hello from /multiple3");
}
app.get("/multiple3", [fcn1, fcn2, fcn3]);

// you can also use a combination of the above
// https://expressjs.com/en/guide/routing.html

// instead of writing app.method multiple time for the same url
// you can use app.route().
app.route("/route")
    .get(function(req, res){
	res.send("get request for /route");
    })
    .post(function(req, res){
	res.send("post request for /route");
    })
    .put(function(req, res){
	res.send("put request for /route");
    });

// something about these "middleware" functions
var middleware_fcn = function(req, res, next){
    console.log("Hello from /middleware middleware");
    next();
}

// this is similar to route
// if you use app.get() for example I think it's still called a middleware
app.use("/middleware", middleware_fcn);

// now add a real route for it
app.get("/middleware", function(req, res){
    console.log("Hello from /middleware");
    res.send("Hello from /middleware");
});

/*
 * middleware are these functions that always call "next()" at the end
 * (so you can call them in the middle, e.g. after a function but before
 * the last one)
 *
 * app.use() is intended for subapps; it doesn't work like app.get() since
 * it will match everything that begins with the specified path (e.g.
 * /middleware/something will be matched above, but not /middlewaresomething)
 * the way I imagine you use it for a subapp:
 *
 * subapp.js
 * subapp = express();
 * module.exports = subapp;
 *
 * app.js
 * subapp = require("subapp");
 * // the new root of subapp will be /subapp/
 * app.use("/subapp", subapp);
 */

// some example of why you might want to use app.use instead of app.get
var date_app = function(req, res, next){
    // some crazy app that logs the date + url
    // side note: so Date.now() is a Number and new Date() is a Date
    // that's why Date.now().toString() still displays ugly
    let d = new Date();
    console.log("Date of request: " + d.toString());
    console.log("Requested URL: " + req.url);
    next();
}

// I want to use this app inside my main app for all urls that start with
// /date; normally this needs to be placed at the top, otherwise res.send()
// won't let the request get here
app.use("/date", date_app);

// instead of adding a route for each image/file you want to serve
// you can use app.use(express.static()); this uses the express.static()
// middleware on all URLs that start with / and should be moved at the top
// e.g. all the files in "public" can be accessed by visitors
// test with /express-cat.png (and comment the x match above)
app.use(express.static("public"));

// you can also create a custom route for the public dir
// /random/express-cat.png
// I guess this is apply/use the express.static() middleware only for
// routes from /random
app.use("/random", express.static("public"));

// you can also specify options to express.static()
// https://expressjs.com/en/guide/using-middleware.html#middleware.built-in

// matching all requests
app.all("/all", function(req, res){
    res.send("You found the /all page!");
});

/*
 * next('route') skips all the functions in the same route
 * e.g. app.get(..., [fcn1, fcn2, fcn3])
 * next('route') in fcn1 will skip fcn2 & fcn3
 * */

/*
 * 5 main types of middleware
 *   app level: app.use()
 *   router level: express.Router().use()
 *   error level: app.use() with exactly 4 args
 *   built-in: express.static()
 *   third-party: cookie parser etc
 */

/*
 * error level middleware
 * should be placed at the end, after other routes/middleware
 * e.g. before app.listen()
 *
 * the example below will handle all errors on "/" for app
 */
app.use("/", function(err, req, res, next){
    console.error("Error: ", err);
    res.status(500).send("There has been an error");
});

/*
 * when running the web server behind a proxy I might want to
 * app.set("trust proxy", ...)
 * https://expressjs.com/en/guide/behind-proxies.html
 * */

/*
 * to perform db operations you need to install additional node packages
 * https://expressjs.com/en/guide/database-integration.html
 *
 */

// mysql db
var mysql = require("mysql");

// credentials (should be kept in a separate place)
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "notes"
});

app.get("/mysql", function(req, res){
    // use mysql & connect from previous scope
    connection.connect();

    let query = "select host, user from mysql.user";
    connection.query(query, function(err, rows, fields){
	if (err){
	    // TODO
	    // show something to the user or throw error?
	    // throw: error: site can't be reached in the browser
	    let msg = "Unable to connect to MySQL DB: " + err.toString();
	    res.send(msg);

	    // also log the message
	    console.log(err.toString());
	} else {
	    let escape = require("escape-html");
	    let body = "<table>";
	    body += "<tr><th>Host</th><th>User</th></tr>";
	    for (let key in rows){
		body += "<tr>";
		body += "<td>" + escape(rows[key]["host"]) + "</td>";
		body += "<td>" + escape(rows[key]["user"]) + "</td>";
		body += "</tr>";
	    }
	    body += "</table>";
	    res.send(body);
	}
    });
});

/*
 * MongoDB
 *
 * this uses mongodb package
 * https://www.npmjs.com/package/mongodb
 *
 * TODO try mongoose
 * https://github.com/Automattic/mongoose
 */
app.get("/mongodb", function(req, res){
    var mongo_client = require("mongodb").MongoClient;

    /*
     * connect to a db
     *
     * auth url
     * mongodb://username:password@host:port/db
     * or without auth
     * mongodb://host:port/db
     * */
    let db_type = "mongodb";
    let host = "localhost";
    let port = "27017";
    let db_name = "test";
    let connect_str = db_type + "://" + host + ":" + port + "/" + db_name;

    mongo_client.connect(connect_str, function(err, db){
	if (err){
	    console.error("Error connecting to db:", err.message);
	    res.send("Error connecting to db: " + err.message);
	    return;
	}

	// get everything from collection test
	db.collection("test").find().toArray(function (err, result){
	    if (err){
		console.error("Error querying the db:", err.message);
		res.send("Error querying the db: " + err.message);
		return;
	    }

	    /*
	     * the weird thing about mongodb is that it doesn't enforce
	     * a certain prototype; I guess it's safe to check for every
	     * object in the collection if it follows a certain prototype
	     */
	    result.forEach(function(doc){
		/* if object has name, age & email fields */
		props = ["name", "age", "email"];
		if (props.every(prop => prop in doc))
		    res.write("name: " + doc.name +
			      " age: " + doc.age +
			      " email: " + doc.email + "\n");
	    });
	    res.end();
	});

	// TODO insert, delete, update - with different URL
    });
});

/*
 * to use cookie-parser (on a barebone express server)
 * first: npm install cookie-parser --save
 * second: use it as a middleware
 *   var cookie_parser = require('cookie-parser');
 *   app.use(cookieParser());
 *
 * is this just for parsing the request and identifying cookies?
 * the only doc I found about cookie-parser:
 * req.cookies - now we have this js object with all the cookies set
 *
 * to set a cookie you just need to set a header in response (see below)
 */

var cp = require("cookie-parser");
app.use("/", cp());

// printing cookies
app.get("/cookies", function(req, res){
    console.log(req.cookies);
    res.send("Hello from cookies!");
});

// setting a cookie
app.get("/setcookies", function(req, res){
    /*
     * you can set a cookie with res.cookie
     * I assume this uses npm package cookie
     *   res.cookie(cookie, value, [options]);
     * or by appending/setting a header
     *   res.append("Set-Cookie", "cookie=val; [options]");
     *   res.setHeader("Set-Cookie", "cookie=val; [options]");
     *
     * all cookie properties:
     * https://expressjs.com/en/4x/api.html#res.cookie
     */
    res.setHeader("Set-Cookie", "foo=bar; Path=/; HttpOnly");
    res.append("Set-Cookie", "foo2=bar2");
    res.cookie("foo3", "bar3");

    opt = {expires: new Date(Date.now() + 900000), httpOnly: true};
    // 100 will be converted to string anyway
    res.cookie("foo4", 100, opt);
    res.send("cookies set");
});

// modifying a cookie
app.get("/incookie", function(req, res){
    // this will increment a cookie
    // TODO add parseInt to refs/js_only
    if (typeof(req.cookies["num_visits"]) == "undefined"){
	res.cookie("num_visits", 1);
	res.send("num_visits initialized to 1");
    } else {
	/*
	 * apparently you can't set headers after res.write()
	 * (headers must be the first thing set)
	 * so the cookie must be set before displaying anything
	 */
	let old_value = parseInt(req.cookies["num_visits"]) + 1;
	res.cookie("num_visits", old_value);

	// print old value + type
	res.write("num_visits = " + req.cookies["num_visits"] + "\n");
	res.write("typeof(num_visits) = " + typeof(req.cookies["num_visits"])
		  + "\n");

	// end response
	res.end();
    }
});

// removing a cookie
app.get("/remcookie", function(req, res){
    // this should remove the cookie set in /incookie
    if (typeof(req.cookies["num_visits"]) != "undefined"){
	// this also takes options as arg
	// https://expressjs.com/en/4x/api.html#res.clearCookie
	res.clearCookie("num_visits");
    }
    res.end("cookie removed successfully");
});

// prompting the user to download something
app.get("/download", function(req, res){
    res.download("file");
});

/*
 * sessions
 *
 * apparently sessions don't come by default in node/express
 * you can use a cookie and implement a session yourself
 * (e.g. store session id cookie and info locally about the user)
 *
 * there are some npm packages that implement sessions
 *   express-session
 *   node-session
 *   passport.js
 *
 * below is an example with express-session
 * session variables are stored in req.session
 *
 * app.use(session(...)) will start a new session every time on
 * the specified path, so no need to worry about that
 * (req.session will be defined in all requests)
 */

var session = require("express-session");
app.use(session({
    // secret is required, the rest is optional
    secret: "rainbow cat",
    resave: false,
    saveUninitialized: true
}));

app.get("/session", function(req, res){
    if (typeof(req.session) == "undefined"){
	res.end("there is no session");
	return;
    }
    if (typeof(req.session.svar) == "undefined"){
	req.session.svar = 0;
    } else {
	req.session.svar += 1;
    }
    res.end("this variable is stored in session and it " +
	    "gets incremented every time: " + req.session.svar);
});

app.get("/session-destroy", function(req, res){
    if (typeof(req.session) != "undefined"){
	// this will remove the req.session prop
	// however, it will be created again on a new request
	req.session.destroy();
    }
    res.end("session destroyed");
});

app.get("/session-start", function(req, res){
    if (typeof(req.session) == "undefined"){
	// nothing to do here, req.session is started automatically
	// on every request
    }
    res.end("session started");
});

/*
 * using a template engine - hogan
 *
 * first set the directory where the template files are
 * second set the template engine to use
 * this will be used every time on response.render()
 */
app.set("views", require("path").join(__dirname, "views"));
app.set("view engine", "hjs");

app.get("/hogan", function(req, res){
    /* render index.hjs */
    res.render("index", {prop1: "This is prop1"});
})

/*
 * normally this should perform a cleanup and exit
 * another program should monitor for failures and
 * restart the server if necessary
 *
 * it's not recommended to implement this
 * */
process.on("uncaughtException", (err) => {
    console.error(err);
});

// start the server
app.listen(3000, function(){
    console.log("Started app on port 3000!");
});
