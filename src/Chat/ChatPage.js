var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var { Link } = Router;
var Ratchet = require('react-ratchet');
var { NavBar, NavButton, Title, TableView } = Ratchet;
var RoomsList = require('./RoomsList');
var chatStore = require('./chatStore');

var ChatPage = React.createClass({
    mixins: [Reflux.connect(chatStore, "roomsList"), Reflux.listenTo(chatStore,"onRoomsChange")],
    onRoomsChange: function (files, state) {
        console.log('rooms list changed');
        this.setState(state);
    },
    render: function () {
        return <div className="chat">
            <NavBar>
                <NavButton right icon={false}><Link to="newRoom">New Room</Link></NavButton>
                <Title>Chat</Title>
            </NavBar>
            <TableView>
                <RoomsList roomsList={this.state.roomsList} />
            </TableView>
        </div>;
    }
});

module.exports = ChatPage;