var React = require('react-native');
var { StyleSheet, View, Text, TextInput, TouchableHighlight } = React;
var actions = require('../actions');

class NewRoomPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Name:</Text>
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

var elHeight = 50;
var styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 100
    },
    buttonText: {
        fontSize: 18,
        color: 'green',
        alignSelf: 'center'
    },
    button: {
        height: elHeight,
        borderColor: 'lightgreen',
        borderWidth: 1,
        borderRadius: 4,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 3
    },
    input: {
        height: elHeight,
        borderColor: 'grey',
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 20
    }
});

module.exports = NewRoomPage;