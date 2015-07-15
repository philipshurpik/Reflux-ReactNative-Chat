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
        <View style={styles.mainContainer}>
            <ListView style={styles.listView}
                dataSource={dataSource}
                renderRow={this.renderRow}
                />
            <View style={styles.newMessage}>
                <TextInput style={styles.newInput} value={this.state.message}
                           onChange={(evt) => this.setState({message: evt.nativeEvent.text})}
                    />
                <TouchableHighlight style={styles.newButton} underlayColor='#99d9f4' onPress={this.handleSendClick.bind(this)}>
                    <Text style={styles.newButtonText}>Send</Text>
                </TouchableHighlight>
            </View>
        </View>

        );
        /*<View style={styles.newMessage}>
         <TextInput style={styles.newInput} value={this.state.message}
         onChange={(evt) => this.setState({message: evt.nativeEvent.text})}
         />

         </View>*/
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.messageDate}>{rowData.formattedDate}</Text>
                        <Text style={styles.message}>{rowData.text}</Text>
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
    mainContainer: {
        flex: 1
    },

    listView: {
        flex: 10
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    rowContainer: {
        flexDirection: 'column',
        padding: 10
    },
    message: {
        fontSize: 20,
        color: '#656565'
    },
    messageDate: {
        fontSize: 12,
        color: '#656565'
    },

    newMessage: {
        flex: 1,
        padding: 10,
        paddingTop: 20,
        flexDirection: "row"
    },
    newInput: {
        flex: 4,
        borderColor: 'lightgrey',
        fontSize: 18,
        borderWidth: 1
    },
    newButton: {
        flex: 1,
        backgroundColor: '#48BBEC',
        justifyContent: 'center'
    },
    newButtonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    }
});

module.exports = RoomPage;