var React = require('react-native');
var Reflux = require('reflux');
var roomStore = require('./roomStore');
var { StyleSheet, View, Text } = React;


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

var RoomPage = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.room.name}</Text>
            </View>
        );
    }
});

module.exports = RoomPage;