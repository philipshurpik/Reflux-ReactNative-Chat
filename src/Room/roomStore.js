var Reflux = require('reflux');
var actions = require('../actions');
var Firebase = require('firebase');
var firebase = new Firebase('https://blinding-heat-2625.firebaseio-demo.com/messages');

var roomStore = Reflux.createStore({
    messages: [],
    activeRoomId: undefined,

    init() {
        this.messages = [];
        this.listenTo(actions.openRoom, this.openRoom);
        this.listenTo(actions.sendMessage, this.sendMessage);

        firebase.on("value", this.initData.bind(this), function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        firebase.on("child_added", this.onNewMessage.bind(this));
    },

    initData(snapshot) {
        if (this.messages.length > 0) {
            return;
        }
        snapshot.forEach((item) => {
            this.messages.push(item.val());
        });
        this.triggerUpdate(this.activeRoomId);
    },

    onNewMessage(snapshot) {
        var newMessage = snapshot.val();
        this.messages.push(newMessage);
        this.triggerUpdate(this.activeRoomId);
    },

    openRoom(roomId) {
        this.activeRoomId = roomId;
        this.triggerUpdate(this.activeRoomId);
    },

    triggerUpdate(roomId) {
        var list = this.messages.filter((item) => {
            return item.roomId === roomId;
        });
        this.trigger({messagesList: list});
    },

    sendMessage(text, roomId) {
        var formattedDate = (new Date()).toLocaleTimeString().replace(' PM','').replace(' AM','');
        var message = {
            text: text,
            id: this.messages.length + 1,
            roomId: roomId,
            date: Date.now(),
            formattedDate: formattedDate
        };
        firebase.push(message);
    }
});

module.exports = roomStore;