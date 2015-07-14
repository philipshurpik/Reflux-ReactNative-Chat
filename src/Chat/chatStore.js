var Reflux = require('reflux');
var actions = require('../actions');
var Firebase = require('firebase');
var firebase = new Firebase('https://blinding-heat-2625.firebaseio-demo.com/rooms');

var chatStore = Reflux.createStore({
    list: [],

    init() {
        this.list = [];
        this.listenTo(actions.getRooms, this.getRooms);
        this.listenTo(actions.createRoom, this.createRoom);

        firebase.on("value", this.initData.bind(this), function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    },
    
    initData(snapshot) {
        if (this.list.length > 0) {
            return;
        }
        if (snapshot.numChildren() === 0) {
            firebase.push({name: "Javascript", id: 1});
            return;
        }
        snapshot.forEach((item) => {
            this.list.push(item.val());
        });
        this.trigger({roomsList: this.list});
    },

    getRooms() {
        this.trigger({roomsList: this.list});
    },

    createRoom(name) {
        var room = {
            name: name,
            id: this.list.length + 1
        };
        firebase.push(room);
        this.list.push(room);
        this.trigger({roomsList: this.list});
    }
});

module.exports = chatStore;