import React from 'react';
import { NavBar, NavButton, Title, TableView, Button } from 'react-ratchet';

import actions from '../actions';

export default class NewRoomPage extends React.Component {

    static contextTypes = {
        history: React.PropTypes.object
    };

    render() {
        return (<div className="new-room">
            <NavBar>
                <NavButton left onClick={this.handleBackClick.bind(this)}>Back</NavButton>
                <Title>New Chat Room</Title>
            </NavBar>
            <TableView>
                <label htmlFor="name">Room name:</label>
                <input id="name" type="text" autoFocus autoComplete="off"
                       onChange={(evt) => this.setState({name: evt.target.value})}/>
                <label>&nbsp;</label>
                <Button block outlined rStyle="positive" onClick={this.handleCreateClick.bind(this)}>Create</Button>
            </TableView>
        </div>)
    }

    handleBackClick() {
        this.context.history.goBack();
    }

    handleCreateClick() {
        if (this.state.name.trim().length > 0) {
            actions.createRoom(this.state.name);
            this.context.history.goBack();
        }
    }
}

module.exports = NewRoomPage;