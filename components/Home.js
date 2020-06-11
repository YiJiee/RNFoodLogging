import React from 'react';
import {StyleSheet, View, Text} from "react-native";

export default class Home extends React.Component {
    render() {
        return (<View style={styles.root}>
            <Text style={styles.text}>Home View</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center'
    }
})

