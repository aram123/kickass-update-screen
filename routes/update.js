var express = require('express');
const spawn = require('child_process').spawn;
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    const ls = spawn('bash', ['scripts/script.sh']);

    ls.stdout.on('data', function (data) {
        console.log("stdout: ${data}");
    });

    ls.stderr.on('data', function (data) {
        console.log(data.toString());
        console.log("stderr: ${data}");
    });

    ls.on('close', function (code) {
        console.log("child process exited with code ${code}");
        res.send('respond with a resource');
    });
});

module.exports = router;


// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//     const ls = spawn('bash', ['scripts/script.sh']);
//
//     ls.stdout.on('data', function (data) {
//         console.log("stdout: ${data}");
//     });
//
//     ls.stderr.on('data', function (data) {
//         console.log(data.toString());
//         console.log("stderr: ${data}");
//     });
//
//     ls.on('close', function (code) {
//         console.log("child process exited with code ${code}");
//         res.send('respond with a resource');
//     });
// });
// //
// // module.exports = router;
// //
// //
// //
// // "use strict";
// //
// // module.exports = function(app){
// //     var express = require('express');
// //     const spawn = require('child_process').spawn;
// //
// //     var router = express.Router();
// //     console.log(app);
// //
// //
// //     /* GET users listing. */
// //     router.get('/', function (req, res, next) {
// //         const ls = spawn('bash', ['scripts/script.sh']);
// //
// //         ls.stdout.on('data', function (data) {
// //             console.log("stdout: ${data}");
// //         });
// //
// //         ls.stderr.on('data', function (data) {
// //             console.log(data.toString());
// //             console.log("stderr: ${data}");
// //         });
// //
// //         ls.on('close', function (code) {
// //             console.log("child process exited with code ${code}");
// //             res.send('respond with a resource');
// //         });
// //
// //
// //     });
// // };