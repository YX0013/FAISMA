import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import firebase from "firebase";

const artStyles = require('./art_2Dstyles.json');

export default class InfoPostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: false,
    };
  }

  render() {
      let post = artStyles;
      //console.log(this.props.post);
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
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("InfoPostScreen", {
              post: this.props.post
            })
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View
            style={
              this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer
            }
          >
            <Image
             source={require(images[this.props.post.image_1])}
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
                {this.props.post.style}
              </Text>
              <Text
                style={
                  this.state.light_theme
                    ? styles.difficultyTextLight
                    : styles.difficultyText
                }
              >
                Difficulty: {this.props.post.difficulty}
              </Text>
              <Text
                style={
                  this.state.light_theme
                    ? styles.costTextLight
                    : styles.costText
                }
              >
                Cost: {this.props.post.cost}
              </Text>
              
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }


const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#f476f3",
    borderRadius: RFValue(20)
  },
  cardContainerLight: {
    margin: RFValue(13),

    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2)
  },
  postImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center",
    marginBottom: RFValue(10)
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
  costText: {
    fontSize: RFValue(13),
    color: "white"
  },
  costTextLight: {
    fontSize: RFValue(13),
    color: "black"
  },

});
