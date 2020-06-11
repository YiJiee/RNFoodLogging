import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import Example from "./Demo";

export default class Settings extends React.Component {
    render() {
        return (<View style={styles.root}>
                <Example />
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

