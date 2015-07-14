var React = require('react');
var Ratchet = require('react-ratchet');
var { NavBar, NavButton, Title, TableView, TableViewCell, Button } = Ratchet;
var roomStore = require('./roomStore');
var actions = require('../actions');

class RoomPage extends React.Component{

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
                {message.text}
            </TableViewCell>
        );
    }

    handleBackClick() {
        this.context.router.goBack();
    }

    handleSendClick() {
        actions.sendMessage(this.state.message, this.props.params.id);
        this.setState({message: ""});
    }
}
RoomPage.contextTypes = { router: React.PropTypes.func };

module.exports = RoomPage;