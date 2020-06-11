import React from 'react';
import {SearchBar, Text, withBadge, Badge, Icon, Avatar, Card, Button} from "react-native-elements";
import {View, FlatList, StyleSheet, Image, TouchableOpacity} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import sample from "./SampleDB";
import ListItemIconDisplay from "./ListItemIconDisplay";
import NonModalPopup from "./NonModalPopup";
import {TapGestureHandler, State} from "react-native-gesture-handler";

export default class FoodDatabase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foodDisplayData: sample.data,
            modalOpen: false,
            modalContent: null,
            query: ''
        };
        this.setModalOpen = this.setModalOpen.bind(this);
        this.handleChangeInSearchQueryText = this.handleChangeInSearchQueryText.bind(this);
        this.timeout = null;
        this.query = '';
    }

    componentDidMount() {
        /*
        const url = 'http://192.168.1.7:5000/loadimg/cat=ALL';
        fetch(url).then((res) => res.json()).then((json) => {
            console.log(json.data)
        });
         */
    }

    setModalOpen = (openModal, content) => {
        this.setState({
            modalOpen: openModal,
            modalContent: content
        })
    }

    handleChangeInSearchQueryText = (newText) => {
        this.query = newText;
        this.setState({
            query: newText
        });
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            const url = `http://192.168.1.7:5000/loadimg/cat=ALL&q=${this.query}`
            this.makeFetchRequest(url, this.query);
        }, 2000);
    }

    makeFetchRequest = (url) => {
        fetch(url).then((response) => response.json())
            .then((jsonData) => {
                this.setState({
                    foodDisplayData: jsonData.data
                })
            }).catch(err => console.log(err));
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        return (<View style={styles.root}>
            <SearchBar
                containerStyle={styles.searchBarStyle}
                inputContainerStyle={styles.inputContainerStyle}
                lightTheme={true}
                placeholder="Search"
                onChangeText={this.handleChangeInSearchQueryText}
                value={this.state.query}
            />
            <View style={{flex: 8}}>
                <FlatList data={this.state.foodDisplayData}
                          renderItem={({item}) => <Item setParentModalState={this.setModalOpen} foodObj={item}/>}
                          keyExtractor={((item, index) => item["_id"])}
                />
            </View>
            {this.state.modalOpen && this.state.modalContent}
        </View>)
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleLog = this.handleLog.bind(this);
        this.doubleTapRef = React.createRef();
    }

    handleOpen = (e) => {
        if (e.nativeEvent.state === State.ACTIVE) {
            const closeFunction = () => this.props.setParentModalState(false, null);
            this.props.setParentModalState(true, <NonModalPopup handlePressOut={closeFunction}
                                                                component={<ItemModal foodObj={this.props.foodObj}/>}
            />)
        }
    }

    handleLog = foodName => (e) => {
        if (e.nativeEvent.state === State.ACTIVE) {
            alert(`${foodName} has been logged!`);
        }
    }

    render() {
        const {foodObj} = this.props;
        const serving = foodObj["per-serving"];
        return (
                <View style={styles.itemRoot}>
                    <Image source={{
                        uri: foodObj["urls"][0]
                    }} style={styles.itemImage}/>
                    <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0,0,0,0.70)' ,'rgba(0, 0, 0, 1)']}
                                    style={{...styles.imageOverlay}}>
                        <TapGestureHandler onHandlerStateChange={this.handleOpen}
                                           waitFor={this.doubleTapRef}>
                            <TapGestureHandler ref={this.doubleTapRef}
                                               numberOfTaps={2}
                                               onHandlerStateChange={this.handleLog(foodObj["food-name"])}
                                               maxDelayMs={200}>
                                <View style={styles.foodText}>
                                    <Text style={{color: '#ffffff'}}>{foodObj["household-measure"]}</Text>
                                    <Text style={{color: '#ffffff'}}>{foodObj["food-name"]}</Text>
                                </View>
                            </TapGestureHandler>
                        </TapGestureHandler>
                        <View style={styles.iconsDisplay}>
                            <ListItemIconDisplay foodObj={foodObj} serving={serving}/>
                        </View>
                    </LinearGradient>
                </View>
        );
    }
}

class ItemModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {nutrients, description, urls} = this.props.foodObj;
        const foodName = this.props.foodObj["food-name"];
        const imageUrl = urls[0];
        const {energy, protein, carbohydrate, sodium} = nutrients;
        const saturatedFat = nutrients["saturated-fat"];
        const totalFat = nutrients["total-fat"];
        const measure = this.props.foodObj["household-measure"];
        const serving = this.props.foodObj["per-serving"];
        return (
            <View style={{height: '75%', width: '80%', backgroundColor: 'white', borderRadius: 15}}>
                <View style={{height: '40%', width: '100%',
                    borderTopLeftRadius: 15, borderTopRightRadius: 15,
                    borderBottomWidth: 3, borderColor: '#c2c2c2'}}>
                    <Image source={{uri: imageUrl}} style={{flex: 1,borderTopLeftRadius: 15,
                        borderTopRightRadius: 15}}/>
                </View>
                <View style={{padding: 15, height: '60%'}}>
                    <Text>{foodName} ({measure})</Text>
                    <Text>{description}</Text>
                    <Text>Nutritional information per {serving}:</Text>
                    <Text>Energy: {energy['amount']} {energy['unit']}</Text>
                    <Text>Carbs: {carbohydrate['amount']} {carbohydrate['unit']}</Text>
                    <Text>Protein: {protein['amount']} {protein['unit']}</Text>
                    <Text>Total Fat: {totalFat['amount']} {totalFat['unit']}</Text>
                    <Text>Saturated Fat: {saturatedFat['amount']} {saturatedFat['unit']}</Text>
                    <Text>Sodium: {sodium['amount']} {sodium['unit']}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    inputContainerStyle: {
        backgroundColor: "#ffffff"
    },
    searchBarStyle: {
        paddingTop: 15,
        backgroundColor: "#ffffff"
    },
    itemRoot: {
        height: 200,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#e2e2e2'
    },
    itemImage: {
        flex: 1,
        borderRadius: 15
    },
    imageOverlay: {
        position: 'absolute',
        margin: 10,
        width: '100%',
        height: '100%',
        flex: 1,
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row'
    },
    foodText: {
        flex: 7,
        justifyContent: 'flex-end',
    },
    iconsDisplay: {
        flex: 4,
    }
})
