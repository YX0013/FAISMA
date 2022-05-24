import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import InfoPostCard from "./InfoPostCard";

import AppLoading from "expo-app-loading";
import { FlatList } from "react-native-gesture-handler";
import firebase from "firebase";

const artStyles = require('./art_3Dstyles.json');

export default class Art3D extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
      posts: []
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
        let artStyles = [];
            artStyles.push({
              style: artStyles.style,
              description: artStyles.description,
              supplies: artStyles.supplies,
              difficulty: artStyles.difficulty,
              cost: artStyles.cost,
              image_1: artStyles.image_1,
              image_2: artStyles.image_2,
              image_3: artStyles.image_3,
              tutorial: artStyles.tutorial
            })
        this.setState({posts: artStyles});
      }

  renderItem = ({ item: post }) => {
    return <InfoPostCard post={post} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.jpeg")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }
              >
                FAISMA
              </Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={artStyles}
              renderItem={this.renderItem}
            />
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f962df"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28)
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28)
  },
  cardContainer: {
    flex: 0.85
  }
});