var React = require('react-native');
var { StyleSheet, View, Text, TextInput, TouchableHighlight } = React;
var actions = require('../actions');

class DemoPage extends React.Component {

    render() {
        var rows = [];
        for (var i = 0; i< 10; i++) {
            rows.push(<Text style={styles.element}> {i+1} Text </Text>);
        }

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    {rows}
                </View>
            </View>
        );
    }
}

var elHeight = 50;
var styles = StyleSheet.create({
    container: {
        marginTop: 70,
        flex: 1
    },
    content: {
        flexDirection: 'row'
    },
    element: {
        padding: 20,
        color: 'green'
    }
});

module.exports = DemoPage;