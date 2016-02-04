import React from 'react';
import { NavBar, NavButton, Title, TableView, TableViewCell, Button } from 'react-ratchet';

import roomStore from './roomStore';
import actions from '../actions';

export default class RoomPage extends React.Component{

    static contextTypes = {
        history: React.PropTypes.object
    };

    constructor() {
        super();
        this.state = {messagesList: []}
    }

    componentDidMount() {
        this.unsubscribe = roomStore.listen((state) => {
            this.setState(state);
        });
        actions.openRoom(this.props.params.id);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        var messageNodes = this.state.messagesList.map(this.renderRow);

        return (<div className="room">
            <NavBar>
                <NavButton left onClick={this.handleBackClick.bind(this)}>Back</NavButton>
                <Title>{this.props.params.name}</Title>
            </NavBar>
            <TableView className="messages">
                {messageNodes}
            </TableView>
            <TableView className="create-message">
                <TableViewCell divider></TableViewCell>
                <input id="message" type="text" autoFocus autoComplete="off" value={this.state.message}
                       onChange={(evt) => this.setState({message: evt.target.value})}/>
                <Button block outlined rStyle="positive" onClick={this.handleSendClick.bind(this)}>Send</Button>
            </TableView>
        </div>);
    }

    renderRow(message) {
        return (
            <TableViewCell className="messageItem" key={message.id}>
                {message.formattedDate}: {message.text}
            </TableViewCell>
        );
    }

    handleBackClick() {
        this.context.history.goBack();
    }

    handleSendClick() {
        actions.sendMessage(this.state.message, this.props.params.id);
        this.setState({message: ""});
    }
}

module.exports = RoomPage;