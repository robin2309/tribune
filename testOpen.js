var makeSource = require("stream-json");
var source = makeSource();
 
var fs = require("fs");
 
var objectCounter = 0;
source.on("startObject", function(){ ++objectCounter; });
source.on("end", function(){
    console.log("Found ", objectCounter, " objects.");
});

fs.createReadStream("file1.json").pipe(source.input);