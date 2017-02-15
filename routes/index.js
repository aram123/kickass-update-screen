var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var csettings = req.app.get('csettings');
  res.render('index', {
    title: 'Express',
      initialMessage : csettings.messages.initialMessage,
      waitMessage : csettings.messages.waitMessage,
      finishMessage : csettings.messages.finishMessage
  });
});

module.exports = router;
