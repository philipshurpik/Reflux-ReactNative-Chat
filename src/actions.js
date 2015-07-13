var Reflux = require('reflux');

var actions = Reflux.createActions([
    "getRooms",
    "roomLoad",
    "roomsListLoad"
]);

module.exports = actions;