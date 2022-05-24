import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InfoTabNavigator from "./InfoTabNavigator";
import ArtPostScreen from "../screens/ArtPostScreen";
import InfoPostScreen from '../screens/InfoPostScreen'

const Stack = createStackNavigator();

const InfoStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="About Fine Arts" component={InfoTabNavigator} />
            <Stack.Screen name="InfoPostScreen" component={InfoPostScreen} />
        </Stack.Navigator>
    );
};

export default InfoStackNavigator;