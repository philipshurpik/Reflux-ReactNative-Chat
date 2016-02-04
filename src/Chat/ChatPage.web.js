import React from 'react';
import { Link } from 'react-router'
import { NavBar, NavButton, Title, TableView, TableViewCell } from 'react-ratchet';

import chatStore from './chatStore';
import actions from '../actions';

export default class ChatPage extends React.Component {
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
                <NavButton right icon={false}>
                    <Link to="/newRoom">New Room</Link>
                </NavButton>
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
                <Link to={`/room/${room.id}/${room.name}`} props={{name: room.name}} >
                    {room.name}
                </Link>
            </TableViewCell>
        )
    }
}