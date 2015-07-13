var React = require('react-native');
var Reflux = require('reflux');
var chatStore = require('./chatStore');
var { StyleSheet, ListView, Text, TouchableHighlight, View } = React;
var RoomPage = require('./../Room/RoomPage.ios.js');
var NewRoomPage = require('./../NewRoom/NewRoomPage.ios.js');


var styles = StyleSheet.create({
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    }
});

var ChatPage = React.createClass({
    mixins: [Reflux.connect(chatStore, "roomsList"), Reflux.listenTo(chatStore, "onRoomsChange")],
    onRoomsChange: function (files, state) {
        console.log('rooms list changed');
        this.setState(state);
    },
    render: function () {
        var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        dataSource = dataSource.cloneWithRows(this.state.roomsList);

        return (
            <ListView
                dataSource={dataSource}
                renderRow={this.renderRow}
                />
        );
    },
    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData.id)} underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title} numberOfLines={1}>{rowData.name}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    },
    rowPressed(rowId) {
        var room = this.state.roomsList.filter(row => row.id === rowId)[0];
        this.props.navigator.push({
            title: 'Room',
            component: RoomPage,
            passProps: { room: room }
        });
    }
});

module.exports = ChatPage;