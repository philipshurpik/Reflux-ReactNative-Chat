var React = require('react-native');
var { StyleSheet, View, Text } = React;


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

var NewRoomPage = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <Text>New room</Text>
            </View>
        );
    }
});

module.exports = NewRoomPage;