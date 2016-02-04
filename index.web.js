import React from 'react'
var { Component } = React;
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute } from 'react-router'
import createHistory from 'history/lib/createHashHistory';

import Chat from './src/Chat/ChatPage.web.js'
import Room from './src/Room/RoomPage.web.js'
import NewRoom from './src/NewRoom/NewRoomPage.web.js'

class App extends Component {
    render() {
        return <div>{this.props.children}</div>;
    }
}

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Chat} />
        <Route path="chat" component={Chat}/>
        <Route path="room/:id/:name" component={Room}/>
        <Route path="newRoom" component={NewRoom}/>
    </Route>
);

let content = document.getElementById('content');
var history = createHistory({
    queryKey: false
});
render(<Router routes={routes} history={history}/>, content);