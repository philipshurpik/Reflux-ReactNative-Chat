var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler } = Router;
var Chat = require('./src/chat/ChatPage.web.js');
var Room = require('./src/room/RoomPage.web.js');
var NewRoom = require('./src/newRoom/NewRoomPage.web.js');

var App = React.createClass({
    render () {
        return (<RouteHandler/>)
    }
});

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={Chat}/>
        <Route name="chat" path="chat" handler={Chat}/>
        <Route name="room" path="rooms/:id" handler={Room}/>
        <Route name="newRoom" path="newRoom" handler={NewRoom}/>
    </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root/>, document.body);
});


