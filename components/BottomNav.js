import React from 'react';
import {ButtonGroup} from "react-native-elements";
import {Text, View, StyleSheet} from "react-native";
import FoodDatabase from "./FoodDatabase";
import Home from './Home';
import Exercise from "./Exercise";
import Medication from "./Medication";
import Settings from "./Settings";

export default class BottomNav extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: 0
        };
        this.updateSelectedIndex = this.updateSelectedIndex.bind(this);
        this.generateContent = this.generateContent.bind(this);
    }

    updateSelectedIndex = i => {
        this.setState({
            selectedIndex: i
        });
    }

    generateContent = () => {
        if (this.state.selectedIndex === 0) {
            return <Exercise />;
        } else if (this.state.selectedIndex === 1) {
            return <FoodDatabase />;
        } else if (this.state.selectedIndex === 2) {
            return <Home />;
        } else if (this.state.selectedIndex === 3) {
            return <Medication />;
        } else if (this.state.selectedIndex === 4) {
            return <Settings />;
        } else {
            return null;
        }
    }

    render() {
        const buttons = ["EXE", "FOD", "HME", "MED", "SET"];
        return (
            <View style={styles.root}>
                {this.generateContent()}
                <ButtonGroup buttons={buttons} onPress={this.updateSelectedIndex} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
})
