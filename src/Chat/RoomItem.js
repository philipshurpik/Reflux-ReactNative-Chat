var React = require('react');
var Router = require('react-router');
var { Link } = Router;
var Ratchet = require('react-ratchet');
var { TableViewCell } = Ratchet;

var RoomItem = React.createClass({
    render: function () {
        return (
            <Link to="room" params={{id: this.props.room.id}}>
                <TableViewCell navigateRight className="roomItem">
                    {this.props.room.name}
                </TableViewCell>
            </Link>
        );
    },
    handleItemClick: function (evt) {
        evt.preventDefault();
    }
});

module.exports = RoomItem;
