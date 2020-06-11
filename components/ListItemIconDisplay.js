import React from "react";
import {Avatar, withBadge, Tooltip, Text} from "react-native-elements";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import carbImage from "../resources/icons/carbohydrate.png";
import fatImage from "../resources/icons/fat.png";
import saltImage from "../resources/icons/salt.png";
import energyImage from "../resources/icons/energy.png";

export default class ListItemIconDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.ratingFunction = this.ratingFunction.bind(this);
        this.determineFontSizeOfStars = this.determineFontSizeOfStars.bind(this);
    }

    // Consolidated data.
    // Low carbohydrate diet:
    // 70-130g per day. With 20-40g per meal and at most 10g for sweets.
    // Energy density (ED) per 1g: Low: <1.5 | Med: 1.5-4.0 | Hi: >4.0
    // Sodium content (SC) per 100g: Low: <120 | Med: 120-600 | Hi: >600
    // Rating function for each nutrient.
    ratingFunction = (nutrientName, {amount, unit}) => {
        const [servingStringValue, servingUnit]= this.props.serving.split(" ");
        const servingGrams = parseFloat(servingStringValue);
        const amt = parseFloat(amount);
        if (nutrientName === "carbohydrate") {
            return amt < 30 ? "*" : amt < 40 ? "**" : "***";
        } else if (nutrientName === "energy") {
            const ED = amt / servingGrams;
            return ED < 1.5 ? "*" : ED < 4.0 ? "**" : "***";
        } else if (nutrientName === "sodium") {
            const SC = amt * 100 / servingGrams;
            return SC < 120 ? "*" : SC < 600 ? "**" : "***";
        }
    }

    determineFontSizeOfStars = (stars) => {
        if (stars.length === 1) {
            return 22;
        } else if (stars.length === 2) {
            return 20;
        } else {
            return 15;
        }
    }

    render() {
        const {nutrients} = this.props.foodObj;
        const {energy, carbohydrate, sodium} = nutrients;
        const saturatedFat = nutrients["saturated-fat"];
        const AvatarWithBadge = (nutrientName, nutrientQty) => {
            const stars = this.ratingFunction(nutrientName, nutrientQty);
            const starFontSize = this.determineFontSizeOfStars(stars);
            return withBadge(stars,
                {
                    containerStyle: styles.avatarContainerStyle,
                    left: 19, top: -6, badgeStyle: {height: 30, width: 30, borderRadius: 15}
                    , status: "primary", textStyle: {fontSize: starFontSize, fontWeight: "bold"}
                })(Avatar);
        }
        const CarbsBadge = AvatarWithBadge("carbohydrate", carbohydrate);
        const EnergyBadge = AvatarWithBadge("energy", energy);
        const SodiumBadge = AvatarWithBadge("sodium", sodium);
        return (
            <View style={styles.icons}>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Tooltip popover={<TooltipMessage nutrient="carbohydrates"/>}
                             overlayColor={"rgba(255,255,255,0)"}
                             containerStyle={styles.tooltipContainerStyle}
                             pointerColor={"#ffffff"}>
                        <CarbsBadge style={styles.column} rounded
                                         imageProps={{style:styles.imagePropsStyle,
                                             source:carbImage,
                                             resizeMode:"cover" }}/>
                    </Tooltip>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Tooltip popover={<TooltipMessage nutrient="salt" />}
                             overlayColor={"rgba(255,255,255,0)"}
                             containerStyle={styles.tooltipContainerStyle}
                             pointerColor={"#ffffff"}>
                        <SodiumBadge style={styles.column} rounded
                                         imageProps={{style: styles.imagePropsStyle,
                                             source:saltImage,
                                             resizeMode:"cover"}}/>
                    </Tooltip>
                    <Tooltip popover={<TooltipMessage nutrient="energy" />}
                             overlayColor={"rgba(255,255,255,0)"}
                             containerStyle={styles.tooltipContainerStyle}
                             pointerColor={"#ffffff"}>
                        <EnergyBadge style={styles.column} rounded
                                         imageProps={{style: styles.imagePropsStyle,
                                             source:energyImage,
                                             resizeMode: "cover"}}/>
                    </Tooltip>
                </View>
            </View>
        )
    }
}

const TooltipMessage = (props) => {
    return <Text>More stars means more {props.nutrient} in this food!</Text>
}

const styles = StyleSheet.create({
    avatarContainerStyle: {
        height: 50,
        width: 50,
        marginTop: 10
    },
    icons: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    rows: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    column: {
        height: 45,
        width: 45,
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 22.5
    },
    imagePropsStyle: {
        height: 40,
        width: 40
    },
    tooltipContainerStyle: {
        backgroundColor: 'white',
        height: 50,
        width: 200
    },
    tooltipPointerStyle: {
        backgroundColor: 'white'
    }
})
