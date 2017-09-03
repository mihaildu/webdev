Since node.js is async, the login system can't have the same behaviour
as the php one. The operations with the db are async: we cannot wait
for them to finish and return success/failure with messages. Instead,
they will be run in the event loop, after stack execution is done.


Version 2

TODO turn this into more coherent text.

What I want is a list of functions that should be executed in order.
When a function ends with success, it should call the next one from
the list etc (e.g. emit event/call it with setTimeout etc).

There must be an npm package/some already built-in way to achieve
this.

There's also a simpler fix: create new ee for connection.
Then, just modify the check_username -> singup -> connection.end.


Version 1

The way I implemented the login system is to register all the callbacks
for the db operations (connection, query) and then wait for an event
"login"/"signup" to end the response; when the db ops are done
executing, the "login"/"signup" event will be emitted with a ret obj
having success/failure value and optional messages.

In case of error, the mysql package has the following behaviour:
if some db operation fails (e.g. connect), the ones that come after
(e.g. query) will be called with the error param set. I didn't see
a way to cancel the callbacks. This leads to a potential problem:
the "login" event can be emitted multiple times with fail and this
might lead to multiple res.end()/send() calls. Since it's prob trickier
to try to emit it only once, I just listened for the first event emitted
using .once("login"). I guess there are multiple solutions to this
problem (e.g. use a boolean value etc).


The event emitter object I used is the request one (req). Maybe there's
a better one to use here.

If I really want the php behaviour back (this defeats the purpose of
async web server) I should check promise packages (todo file).
