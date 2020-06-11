/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import BottomNav from "./components/BottomNav";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.mainView}>
                <BottomNav />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  mainView: {
    flex:1
  }
})
