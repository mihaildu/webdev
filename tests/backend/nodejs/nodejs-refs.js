/*
 * using node.js to display a webpage
 * apparently chrome automatically sends 2 requests
 * one for / and one for /favicon.ico
 *
 * node.js uses libuv for async stuff (written in C)
 * https://github.com/libuv/libuv
 *
 * running the web server with "--inspect" starts a debugger as a websocket
 * metadata on the debugger at /json/list, e.g.
 * http://127.0.0.1:9229/json/list
 *
 * running with "--prof" will run the profiler
 * node --prof test1.js
 * this should generate a file like isolate-0x...log
 * node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt
 * then check processed.txt (e.g. start at summary, then language etc)
 *
 * you can use domains to catch errors (before they reach process)
 * TODO document more on this
 * also, this will be removed/replaced with something else
 * https://nodejs.org/api/domain.html
 *
 * apparently there's this thing called the event loop (how the async/worker
 * thing works, node.js will continuously check for event termination etc)
 * phases in the event loop (simplified):
 *   timers (setInterval, setTimeout)
 *   I/O callbacks: callbacks for events except "close", timers and
 *     setImmediate()
 *   idle, prepare: used internally?
 *   poll: new I/O events (e.g. incoming connections/data)
 *   check: setImmediate() callbacks
 *   close: "close" callbacks
 * the event loop is in libuv
 * apparently it runs only when the stack is empty?
 *
 * node.js is single threaded (even though tasks can be done by
 * other processes in parallel?)
 *
 * N-API = native API for building addons to node.js in C/C++
 *
 * Cookies are not supported by default; apparently there is some
 * support in express.js and there is also the package "cookies"
 * npm install cookies
 * https://www.npmjs.com/package/cookies
 *
 * Sessions are not supported as well
 * Express.js or Connect
 * npm install connect
 *
 * more at https://nodejs.org/api/http.html
 * */

function main(){
    test8_crypto();
    //test7_next_tick();
    //test6();
    //test5_html();
    //test4();
    //test3();
    //test2();
    //test1();
}

function test8_crypto(){
    /*
     * why is this so weird?
     * first, create a new crypto.Hash object with crypto.createHash("alg")
     * second, add some string to be hashed using .update("str")
     * third, hash everything you passed with update() by using digest()
     * */
    var hash = require("crypto").createHash("sha256");
    hash.update("test string");
    console.log(hash.digest("hex"));
}

function test7_next_tick(){
    /*
     * so nextTick() allows us to run a function after stack code
     * but before event loop
     */
    let bar;
    function fcn(){
	console.log("bar = " + bar);
    }
    /*
     * if we run fcn() now "bar" will be "undefined"
     * instead, we can wait for the functions currently on the stack
     * to finish running (e.g. test7, main) and just before the
     * event loop starts, nextTick() functions will be run
     * */
    // fcn();
    process.nextTick(fcn);
    bar = 1;
}

function test6(){
    const http = require("http");
    const hostname = "localhost";
    const port = 3000;
    /*
     * this is http.Server
     * the server is an event emitter that has a listener for
     * "request" event
     * */
    const server = http.createServer(server_handler);
    server.listen(port, hostname, listen_handler);

    function server_handler(request, response){
	/*
	 * request = http.IncomingMessage (Readable stream)
	 * response = http.ServerResponse (Writable stream)
	 * */
	console.log("New request ----------------------------");

	// looking at request
	// you can check the headers
	// TODO why can't I do string + object printing?
	// JSON.stringify might do the job
	console.log("Request headers:");
	console.log(request.headers);
	console.log("");

	// in request.headers all names are lowercase
	// to get the original unmodified ones use rawHeaders
	console.log("Request user-agent: " + request.headers["user-agent"]);
	console.log("");

	// http proto
	console.log("HTTP version: " + request.httpVersion);
	console.log("");

	// method/request (GET/POST etc)
	console.log("Type of request: " + request.method);
	console.log("");

	// look at the path
	console.log("Request path/url: " + request.url);
	console.log("");

	// the url might have get params
	// you can parse it with "url" module like so
	// true will generate a js object with params (instead of string)
	const parsed_url = require("url").parse(request.url, true);
	console.log("Parsed URL:");
	console.log(parsed_url);
	console.log("GET params:");
	console.log(parsed_url["query"]);
	console.log("");

	/*
	 * more about http module
	 * */

	// all the methods supported
	console.log("All supported methods:");
	console.log(http.METHODS);
	console.log("");

	// all http status codes along with their messages
	console.log("All status codes:");
	console.log(http.STATUS_CODES);
	console.log("");

	// http.request() performs a request to some hostname + port
	// http.get() does the same, I guess it's request() + GET
	// they return http.ClientRequest

	// apparently this works in js (e.g. to get method and url from request)
	const {method, url} = request;
	console.log("Request url (again): " + url);
	console.log("");

	// POST requests have body (on "data" event)
	// test with wget: wget localhost:3000 --post-data "this is data"
	// you can also chain event listeners (calling .on after another .on)
	let body = "";
	request.on("data", (chunk) => {
	    // chunk is a Buffer
	    // to turn it to string: chunk.toString()
	    let chunk_str = chunk.toString();
	    console.log(chunk_str);
	    body += chunk_str;
	});

	/*
	 * one way to get POST params:
	 *   first wait to get entire message ("end" event)
	 *   parse the message with querystring
	 *
	 * to test:
	 *   wget localhost:3000/ --post-data
	 *     "email=john@mail.com&password=1234" -O tmp.html
	 * */
	request.on("end", () => {
	    try {
		console.log(require("querystring").parse(body));
	    } catch (err) {
		// do nothing
	    }
	});

	// dealing with errors
	// if we don't listen for errors server might crash
	request.on("error", (err) => {
	    console.error(err.stack);
	});

	// you can also list info about the connection
	// e.g. client ip address
	console.log("Client IP address:", request.connection.remoteAddress);

	// request.connection is a net.Socket
	// https://nodejs.org/api/net.html#net_class_net_socket

	// looking at response

	// set the status code
	response.statusCode = 200;

	// setting response headers
	// the headers you don't set will have default value
	response.setHeader("Content-Type", "text/plain");

	// you can also overwrite all headers
	// fun fact: headers that start with X are non-standard
	// X-Powered-By is a typical header filled by different frameworks
	// e.g. "X-Powered-By": "Express"
	response.writeHead(200, {
	    "Content-Type": "text/html",
	    "X-Powered-By": "pizza",
	});

	// writing something in the stream
	response.write("<html>");
	response.write("<body>");
	response.write("<h1>Hello from test 6!</h1>");
	response.write("</body>");
	response.write("</html>");

	// you should add a listener for response errors as well
	// these should prob be before anything else
	response.on("error", (err) => {
	    console.error(err);
	});

	// ending the stream
	response.end();
	//response.end("Hello from test6!");

	// newlines between requests
	//console.log("\n");

	/*
	 * TODO decide where to put this
	 *
	 * http.Agent is responsible for dealing with requests (too abstract)
	 * I just think of it as a worker in a workpool env
	 *
	 * for example, when a new request is made (like http.get()), that
	 * request is added to a queue and it will be handled by some http.Agent
	 * at some point
	 * */
    }

    function listen_handler(){
	console.log("Server running at http://" +
		    hostname + ":" + port + "/");
    }
}

function test5_html(){
    const fs = require("fs");
    const http = require("http");
    const hostname = "localhost";
    const port = 3000;
    const server = http.createServer(server_handler);
    server.listen(port, hostname, listen_handler);

    function server_handler(request, response){
	response.statusCode = 200;
	response.setHeader("Content-Type", "text/html");

	// create a read stream and pipe it to response
	var rstream = fs.createReadStream("test1.html");
	rstream.pipe(response);
    }

    function listen_handler(){
	console.log("Server running at http://" +
		    hostname + ":" + port + "/");
    }
}

function test4(){
    // https://nodejs.org/api/stream.html#stream_api_for_stream_consumers
    // test with
    // curl localhost:3000 -d "\"{}\""
    const http = require("http");
    const hostname = "localhost";
    const port = 3000;

    const server = http.createServer(server_handler);
    server.listen(port, hostname, listen_handler);

    function server_handler(request, response){
	var body = "";

	// isn't this default
	request.setEncoding("utf8");

	// turn flowing mode on and listen for data
	// TODO why is request null
	request.on("data", (chunk) => {
	    // append the request to body
	    console.log("Received data: " + chunk);
	    body += chunk;
	});

	// this happens when all the chunks have been received
	// is this the same as pushing null?
	request.on("end", () => {
	    // try was needed only for json.parse
	    try {
		const data = JSON.parse(body);
		//response.write("Hello visitor!");
		response.write(data);
		response.end();
	    } catch (err) {
		response.statusCode = 400;
		response.end("Error: " + err.message);
	    }
	});
    }

    function listen_handler(){
	console.log("Server running at http://" +
		    hostname + ":" + port + "/");
    }
}

function test3(){
    // just playing around with random stuff
    const http = require("http");
    const hostname = "localhost";
    const port = 3000;
    const server = http.createServer(server_handler);
    server.listen(port, hostname, listen_handler);

    function server_handler(request, response){
	//response.statusCode = 400;
	//response.setHeader("Content-Type", "text/plain");

	// you can write stuff with write()
	response.write("This is just a string\n\n");
	response.write("This is another line\n");
	// for html to work (e.g. <br>) use "text/html" instead

	// I guess you need to end the response with end()
	// you can use an optional string to write
	response.end();

	// how do you cookies/session stuff?
    }

    function listen_handler(){
	console.log("Server running at http://" +
		    hostname + ":" + port + "/");
    }
}

function test2(){
    // taken from official website
    // const is a read-only var
    const http = require("http");
    const hostname = "127.0.0.1";
    const port = 3000;
    const server = http.createServer(server_handler);
    server.listen(port, hostname, listen_handler);

    function server_handler(request, response){
	response.statusCode = 200;
	response.setHeader("Content-Type", "text/plain");
	response.end("Hello World\n");
    }

    function listen_handler(){
	console.log("Server running at http://" +
		    hostname + ":" + port + "/");
    }
}

function test1(){
    // taken from learncode.academy
    // we need the http package (built-in, no need to 'npm install')
    var http = require("http");

    // register callback for server
    var server = http.createServer(server_func);

    // listen on port 3000
    var port_num = 3000;
    server.listen(port_num);

    // new connection handler
    function server_func(request, response){
	console.log("Got a request");

	// to show html files use fs or express
	//var proj_path = "/var/www/html/tests/backend/nodejs";
	//response.sendFile(proj_path + "/index.html");
	response.write("Hi");
	response.end();
    }
}

main();
