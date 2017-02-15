var express = require('express');
const spawn = require('child_process').spawn;
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var csettings = req.app.get('csettings');
    console.log(csettings.execute);
    const ls = spawn('bash', [csettings.execute]);

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