var React = require('react-native');
var ChatPage = require('./src/Chat/ChatPage.ios.js');

var { AppRegistry, NavigatorIOS } = React;

var styles = React.StyleSheet.create({
    container: {
        flex: 1
    }
});

var ReNativeChat = React.createClass({
    render() {
        var initialRoute = {
            title: 'Chat',
            component: ChatPage
        };
        return (
            <NavigatorIOS style={styles.container} initialRoute={initialRoute} />
        )
    }
});

AppRegistry.registerComponent('ReNativeChat', () => ReNativeChat);
