const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", function(req, res){
    var file_path = __dirname + "/views/index.html";
    res.sendFile(file_path);
});

app.listen(3000, function(){
    console.log("Started app on port 3000!");
});
