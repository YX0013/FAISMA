import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Speech from "expo-speech";

import AppLoading from "expo-app-loading";
import firebase from "firebase";

const artStyles = require('./art_2Dstyles.json');

export default class InfoPostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: false,
      i: 0
    };
  }

  render() {
    let post = artStyles;
    let i = this.state.i;
    let images = {
        image_1: '../assets/acrylicAvocado.png',
        image_2: '../assets/acrylicShip.png',
        image_3: '../assets/acrylicWave.png',
        image_4: '../assets/carvedFlowers.png',
        image_5: '../assets/carvedGirl.png',
        image_6: '../assets/coloredPencilFish.png',
        image_7: '../assets/coloredPencilHands.png',
        image_8: '../assets/coloredPencilPancakes.png',
        image_9: '../assets/gouacheAbstract.png',
        image_10: '../assets/gouacheCat.png',
        image_11: '../assets/gouacheLake.png',
        image_12: '../assets/oilBuildings.png',
        image_13: '../assets/oilDog.png',
        image_14: '../assets/oilNightStreet.png',
        image_15: '../assets/oilPastelBeach.png',
        image_16: '../assets/oilPastelRose.png',
        image_17: '../assets/oilPastelSky.png',
        image_18: '../assets/carvedHorse.png',
        image_19: '../assets/charcoalButterfly.png',
        image_20: '../assets/charcoalDeer.png',
        image_21: '../assets/charcoalGirl.png',
        image_22: '../assets/pastelDog.png',
        image_23: '../assets/pastelDucks.png',
        image_24: '../assets/pastelHorizon.png',
        image_25: '../assets/pencilCat.png',
        image_26: '../assets/pencilEye.png',
        image_27: '../assets/pencilStrawberry.png',
        image_28: '../assets/penClouds.png',
        image_29: '../assets/penGarden.png',
        image_30: '../assets/penCat.png',
        image_31: '../assets/sculptureDancer.png',
        image_32: '../assets/sculptureDog.png',
        image_33: '../assets/sculptureHands.png',
        image_34: '../assets/stitchFlowers.png',
        image_35: '../assets/stitchHedgehog.png',
        image_36: '../assets/stitchLandscape.png',
        image_37: '../assets/watercolorFlowers.png',
        image_38: '../assets/watercolorGiraffe.png',
        image_39: '../assets/watercolorHummingbird.png',
        image_40: '../assets/wireApple.png',
        image_41: '../assets/wireHorse.png',
        image_42: '../assets/wireTrees.png'
      }
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else {
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
          <View style={styles.postContainer}>
            <ScrollView
              style={
                this.state.light_theme
                  ? styles.postCardLight
                  : styles.postCard
              }
            >
           <View
            style={
              this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer
            }
          >
            <Image
              source={require(images[this.props.route.params.post.image_1])}
              style={styles.postImage}
            ></Image>
            <Image
              source={require(images[this.props.route.params.post.image_2])}
              style={styles.postImage}
            ></Image>
            <Image
              source={require(images[this.props.route.params.post.image_3])}
              style={styles.postImage}
            ></Image>
            <View style={styles.titleContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.styleTextLight
                    : styles.styleText
                }
              >
                {this.props.route.params.post.style}
              </Text>
              <Text
                style={
                  this.state.light_theme
                    ? styles.difficultyTextLight
                    : styles.difficultyText
                }
              >
                Difficulty: {this.props.route.params.post.difficulty}
              </Text>
              <Text
                style={
                  this.state.light_theme
                    ? styles.costTextLight
                    : styles.costText
                }
              >
                Cost: {this.props.route.params.post.cost}
              </Text>
              <View style={styles.descriptionTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.descriptionTextLight
                    : styles.descriptionText
                }
              >
                {this.props.route.params.post.description}
              </Text>
              <TouchableOpacity style = {styles.tutorialContainer}
              onPress = {() => {/* Insert functiion to navigate to web page*/}}>
              <Text
                style={styles.tutorialText}>
                Tutorial: {this.props.route.params.post.tutorial}
              </Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f962df"
  },
    cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#f476f3",
    borderRadius: RFValue(20)
  },
  cardContainerLight: {
    margin: RFValue(13),
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
  postContainer: {
    flex: 1
  },
  postCard: {
    margin: RFValue(20),
    backgroundColor: "#f476f3",
    borderRadius: RFValue(20)
  },
  postCardLight: {
    margin: RFValue(20),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
  },
  titleContainer: {
    flex: 0.8
  },
  styleText: {
    fontSize: RFValue(25),
    color: "white"
  },
  styleTextLight: {
    fontSize: RFValue(25),
    color: "black"
  },
  difficultyText: {
    fontSize: RFValue(18),
    color: "white"
  },
  difficultyTextLight: {
    fontSize: RFValue(18),
    color: "black"
  },
  descriptionTextContainer: {
    padding: RFValue(20)
  },
  descriptionText: {
    fontSize: RFValue(15),
    color: "white"
  },
  descriptionTextLight: {
    fontSize: RFValue(15),
    color: "black"
  },
  costText: {
    fontSize: RFValue(20),
    color: "white"
  },
  costTextLight: {
    fontSize: RFValue(20),
    color: "black"
  },
  tutorialContainer: {
    flex: 0.8,
    alignItems: 'center',
    backgroundColor: '#ffc7fd',
    borderRadius: 25,
    padding: RFValue(10),
    marginTop: RFValue(10),
    width: RFValue(350),
    justifyContent: 'center'
  },
  tutorialText: {
    fontSize: RFValue(12),
    color: "blue",
  },
});
