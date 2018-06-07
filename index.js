const path = require('path');
var fs = require('fs');
var request = require('request');


const GULPFILE_URL = "https://raw.githubusercontent.com/Kishanjay/DevEssentials/master/webdevelopment/BOILERPLATE/gulpfile.js";

function start() {
    if (process.argv.length < 3) {
        error("Usage: " + path.basename(__filename) + " <projectName>");
        return;
    }
    
    var projectName = process.argv[2];
    let projectPath = path.join(__dirname, projectName);
    if (fs.existsSync(projectPath)){
        error(projectName + " already exists, please delete folder or use a different name");
        return;
    }

    fs.mkdirSync(projectPath);
    
    let srcPath = path.join(projectPath, "src");
    fs.mkdirSync(srcPath);

    let scssPath = path.join(srcPath, "scss");
    fs.mkdirSync(scssPath);

    let tsPath = path.join(srcPath, "ts");
    fs.mkdirSync(tsPath);

    var gulpfile = fs.createWriteStream(path.join(projectPath, "gulpfile.js"));
    download(GULPFILE_URL, gulpfile);
    
    
};

start();

function error(message) {
    console.log("[ITL-website Error] - " + message)
}

function download(url, file) {
    function cb(message) {
        // console.log(message);
    }

    var sendReq = request.get(url);
    
    // verify response code
    sendReq.on('response', function(response) {
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }
    });
        
    // check for request errors
    sendReq.on('error', function (err) {
        fs.unlink(dest);
        return cb(err.message);
    });

    sendReq.pipe(file);
        
    file.on('finish', function() {
        file.close(cb);  // close() is async, call cb after close completes.
    });

    file.on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        return cb(err.message);
    });
}