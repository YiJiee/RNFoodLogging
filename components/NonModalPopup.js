import React from 'react';
import {TouchableOpacity, View} from "react-native";

export default class NonModalPopup extends React.Component {
    constructor(props) {
        super(props);
        this.handlePressOut = this.handlePressOut.bind(this);
    }

    handlePressOut = () => {
        this.props.handlePressOut();
    }

    render() {
        return (<View style={{position: 'absolute', flex:1, width: '100%', height: '100%'}}>
            <TouchableOpacity style={{flex: 1, height: '100%', width: '100%', position: 'absolute',
                backgroundColor: "rgba(0,0,0,0.5)", justifyContent: 'center', alignItems: 'center'}}
                              onPress={this.handlePressOut} activeOpacity={1}>
                <View></View>
            </TouchableOpacity>
            <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                {this.props.component}
            </View>
        </View>)
    }
}
