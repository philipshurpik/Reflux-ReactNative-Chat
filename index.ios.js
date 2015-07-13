var React = require('react-native');
var ChatPage = require('./src/Chat/ChatPage.ios.js');
var NewRoomPage = require('./src/NewRoom/NewRoomPage.ios.js');

var { AppRegistry, NavigatorIOS } = React;

var styles = React.StyleSheet.create({
    container: {
        flex: 1
    }
});

var ReNativeChat = React.createClass({
    render() {
        var initialRoute = {
            title: 'Chat Rooms',
            component: ChatPage,
            rightButtonTitle: "New",
            onRightButtonPress: () => {
                this.refs.nav.push({
                    title: 'New room',
                    component: NewRoomPage
                });
            }
        };
        return (
            <NavigatorIOS ref="nav" style={styles.container} initialRoute={initialRoute}/>
        )
    }
});

AppRegistry.registerComponent('ReNativeChat', () => ReNativeChat);
