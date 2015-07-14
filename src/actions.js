var Reflux = require('reflux');

var actions = Reflux.createActions([
    "getRooms",
    "createRoom",
    "openRoom",
    "sendMessage"
]);

module.exports = actions;