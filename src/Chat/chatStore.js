var Reflux = require('reflux');
var actions = require('../actions');

var chatStore = Reflux.createStore({
    list: [],

    getInitialState() {
        this.list = [{
            name: "Javascript",
            id: 1
        }, {
            name: "Java",
            id: 2
        }, {
            name: "IOS",
            id: 3
        }, {
            name: "Android",
            id: 4
        }];
        return { roomsList: this.list};
    },

    init() {
        this.listenTo(actions.getRooms, this.getRooms);
    },

    getRooms() {
        this.trigger({roomsList: this.list});
    }
});

module.exports = chatStore;