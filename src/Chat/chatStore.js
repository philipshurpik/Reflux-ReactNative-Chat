var Reflux = require('reflux');

var chatStore = Reflux.createStore({
    list: [],
    getInitialState: function () {
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
        return this.list;
    }
});

module.exports = chatStore;