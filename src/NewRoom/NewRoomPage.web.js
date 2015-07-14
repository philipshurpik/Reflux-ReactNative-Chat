var React = require('react');
var Ratchet = require('react-ratchet');
var { NavBar, NavButton, Title, TableView, Button } = Ratchet;
var actions = require('../actions');

class NewRoomPage extends React.Component{

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
        this.context.router.goBack();
    }

    handleCreateClick() {
        actions.createRoom(this.state.name);
        this.context.router.goBack();
    }
}
NewRoomPage.contextTypes = { router: React.PropTypes.func };

module.exports = NewRoomPage;