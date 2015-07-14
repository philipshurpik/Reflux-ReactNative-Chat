var React = require('react-native');
var roomStore = require('./roomStore');
var { StyleSheet, ListView, Text, TouchableHighlight, View, TextInput } = React;
var actions = require('../actions');

class RoomPage extends React.Component{

    constructor() {
        super();
        this.state = {messagesList: []}
    }

    componentDidMount() {
        this.unsubscribe = roomStore.listen((state) => {
            this.setState(state);
        });
        actions.openRoom(this.props.room.id.toString());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    render() {
        var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        dataSource = dataSource.cloneWithRows(this.state.messagesList);

        return (
        <View>
            <ListView
                dataSource={dataSource}
                renderRow={this.renderRow}
                />
            <TextInput style={styles.newInput} value={this.state.message}
                       onChange={(evt) => this.setState({message: evt.nativeEvent.text})}
                />
            <TouchableHighlight style={styles.newButton} underlayColor='#99d9f4' onPress={this.handleSendClick.bind(this)}>
                <Text style={styles.newButtonText}>Send</Text>
            </TouchableHighlight>
        </View>
        );
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title} numberOfLines={1}>{rowData.text}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }

    handleSendClick() {
        actions.sendMessage(this.state.message, this.props.room.id.toString());
        this.setState({message: ""});
    }
}

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
    },


    newButtonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    newButton: {
        height: 40,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#48BBEC',
        right: 0,
        bottom: 0
    },
    newInput: {
        height: 40,
        flex: 4,
        flexDirection: 'column',
        fontSize: 18,
        color: '#48BBEC',
        left: 0,
        bottom: 0
    }
});

module.exports = RoomPage;