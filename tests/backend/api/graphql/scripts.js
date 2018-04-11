/**
 * Sending a POST to graphql api from client side
 */

graphql_mutation();
//graphql_obj();
//graphql_escaping();
//graphql_jquery();
//graphql_xhr();

function graphql_mutation() {
    /**
     * Doing a mutation with jquery
     */
    const newMessage = "Hello world";
    const mutation = `mutation {
        setMessage(message: "${newMessage}")
    }`;

    // a simple $.post won't work, we need to set the headers
    $.ajax({
        type: "POST",
        url: "/graphql",
        data: mutation,
        success: (res) => {console.log(res);},
        headers: {
            "Content-Type": "application/graphql"
        },
        dataType: "json"
    });

    // also, getMessage just to be sure
    const query = `{
        getMessage
    }`;
    $.post("/graphql", {query}, (res) => {
        console.log(res);
    });
}

function graphql_obj() {
    /**
     * Nested query in graphql
     */
    const query = `{
        returnMyType(arg: 2) {
            inc(someNumber: 10)
        }
    }`;
    $.post("/graphql", {query}, (res) => {
        /**
         * this will be
         * returnMyType {
         *   inc: 11
         * }
         */
        console.log(res);
    });
}

function graphql_escaping() {
    /**
     * Escaping strings on client side with template literals
     */
    const arg1 = 3;
    const arg2 = 6;
    const queryString = `query {
        returnList(arg1: ${arg1}, arg2: ${arg2})
    }`;
    $.post("/graphql", {query: queryString}, (res) => {
        console.log(res);
    });

    // to apply arg1 & arg2 use JSON.stringify()
    // TODO - this doesn't work
    // http://graphql.org/graphql-js/passing-arguments/
    let queryString2 = `query ReturnList($arg1: Int, $arg2: Int) {
        returnList(arg1: $arg1, arg2: $arg2)
    }`;
    let tmp = JSON.stringify({
        query: queryString2,
        variables: { arg1: arg1, arg2: arg2 }
    });
    $.post("/graphql", tmp, (res) => {
        console.log(res);
    });
}

function graphql_jquery() {
    /**
     * Sending the POST with jQuery
     */
    $.post("/graphql", {query: "{ number }"}, (res) => {
        console.log(res);
    });
}

function graphql_xhr() {
    /**
     * Sending the POST with XHR
     */
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        console.log("data returned:", xhr.response);
    };

    const mQuery1 = "{ hello }";
    const mQuery2 = "{ number }";

    xhr.send(JSON.stringify({query: mQuery2}));
}
