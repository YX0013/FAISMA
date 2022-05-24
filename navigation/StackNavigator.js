import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import ArtPostScreen from "../screens/ArtPostScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen name="ArtPostScreen" component={ArtPostScreen} />
        </Stack.Navigator>
    );
};

export default StackNavigator;