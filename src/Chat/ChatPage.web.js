var React = require('react');
var Router = require('react-router');
var { Link } = Router;
var Ratchet = require('react-ratchet');
var { NavBar, NavButton, Title, TableView, TableViewCell } = Ratchet;
var chatStore = require('./chatStore');
var actions = require('../actions');

class ChatPage extends React.Component {

    constructor() {
        super();
        this.state = {roomsList: []}
    }

    componentDidMount() {
        this.unsubscribe = chatStore.listen((state) => {
            this.setState(state);
        });
        actions.getRooms();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        var roomNodes = this.state.roomsList.map(this.renderRow);

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

    renderRow(room) {
        return (
            <TableViewCell navigateRight className="roomItem" key={room.id}>
                <Link to="room" props={{name: room.name}} params={{id: room.id, name: room.name }}>{room.name}</Link>
            </TableViewCell>
        )

    }
}

module.exports = ChatPage;