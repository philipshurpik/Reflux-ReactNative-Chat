var React = require('react-native');
var { StyleSheet, View, Text, TextInput, TouchableHighlight } = React;
var actions = require('../actions');

var styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    input: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
        marginBottom: 10
    }
});

class NewRoomPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                           onChange={(evt) => this.setState({name: evt.nativeEvent.text})}
                    />
                <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this.handlePressed.bind(this)}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableHighlight>
            </View>
        );
    }

    handlePressed() {
        if (this.state.name.trim().length > 0) {
            actions.createRoom(this.state.name);
            this.props.navigator.pop();
        }
    }
}

module.exports = NewRoomPage;