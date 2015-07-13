var Reflux = require('reflux');

var actions = Reflux.createActions({
    "createRoom": {},
    "roomLoad": {},
    "roomsListLoad": {}
});

module.exports = actions;