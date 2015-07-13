var React = require('react');
var RoomItem = require('./RoomItem');

var RoomsList = React.createClass({
    render() {
        var roomNodes = this.props.roomsList.map(function (room) {
            return <RoomItem room={room} key={room.id}></RoomItem>
        });
        return <div className="fileList">
            {roomNodes}
        </div>
    }
});

module.exports = RoomsList;