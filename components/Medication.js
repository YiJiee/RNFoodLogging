import React from 'react';
import {StyleSheet, View, Text} from "react-native";

export default class Medication extends React.Component {
    render() {
        return (<View style={styles.root}>
                <Text style={styles.text}>Medication View</Text>
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

