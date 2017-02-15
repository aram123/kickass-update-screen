/**
 * Created by aram on 2/14/17.
 */
var config = {};
config.messages = {};
config.web = {};
config.messages.initialMessage = "update";
config.messages.waitMessage = "updating...";
config.messages.finishMessage = "done!";

config.execute = "scripts/script.sh";
config.web.port = 8080;

module.exports = config;