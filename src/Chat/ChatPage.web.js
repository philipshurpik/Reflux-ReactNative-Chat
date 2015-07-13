var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var { Link } = Router;
var Ratchet = require('react-ratchet');
var { NavBar, NavButton, Title, TableView } = Ratchet;
var RoomItem = require('./RoomItem.web.js');
var chatStore = require('./chatStore');

var ChatPage = React.createClass({
    mixins: [Reflux.connect(chatStore, "roomsList"), Reflux.listenTo(chatStore,"onRoomsChange")],
    onRoomsChange: function (files, state) {
        console.log('rooms list changed');
        this.setState(state);
    },
    render: function () {
        var roomNodes = this.state.roomsList.map(function (room) {
            return <RoomItem room={room} key={room.id}></RoomItem>
        });
        return <div className="chat">
            <NavBar>
                <NavButton right icon={false}><Link to="newRoom">New Room</Link></NavButton>
                <Title>Chat</Title>
            </NavBar>
            <TableView>
                <div className="filesList">
                    {roomNodes}
                </div>
            </TableView>
        </div>;
    }
});

module.exports = ChatPage;