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

export default class ArtPostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: false,
      is_liked: false,
      likes: this.props.route.params.post.value.likes
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  likeAction = () => {
    console.log("here");
    if (this.state.is_liked) {
      firebase
        .database()
        .ref("posts")
        .child(this.props.route.params.post_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(-1));
      this.setState({ likes: (this.state.likes -= 1), is_liked: false });
    } else {
      firebase
        .database()
        .ref("posts")
        .child(this.props.route.params.post_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(1));
      this.setState({ likes: (this.state.likes += 1), is_liked: true });
    }
  };

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else {
      let post = this.props.route.params.post;
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
              <Image
                source={{uri: post.value.preview_image}}
                style={styles.image}
              ></Image>
              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.postTitleTextLight
                        : styles.postTitleText
                    }
                  >
                    {this.props.route.params.post.value.title}
                  </Text>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.postArtistTextLight
                        : styles.postArtistText
                    }
                  >
                    {this.props.route.params.post.value.artist}
                  </Text>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.postArtistTextLight
                        : styles.postArtistText
                    }
                  >
                    {this.props.route.params.post.value.created_on}
                  </Text>
                </View>
              </View>
              <View style={styles.mediaTextContainer}>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.mediaTextLight
                      : styles.mediaText
                  }
                >
                  Art Media: {this.props.route.params.post.value.media}
                </Text>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.descriptionTextLight
                      : styles.descriptionText
                  }
                >
                  {this.props.route.params.post.value.description}
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <TouchableOpacity
                style={
                    this.state.is_liked
                      ? styles.likeButtonLiked
                      : styles.likeButtonDisliked
                  }
                  onPress={() => this.likeAction()}>
                <View style={styles.likeButton}>
                  <Ionicons
                    name={"heart"}
                    size={RFValue(30)}
                    color={this.state.light_theme ? "black" : "white"}
                  />

                  <Text
                    style={
                      this.state.light_theme
                        ? styles.likeTextLight
                        : styles.likeText
                    }
                  >
                    {this.state.likes}
                  </Text>
                </View>
                </TouchableOpacity>
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
    resizeMode: "contain",
    marginTop: RFValue(10)
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  postTitleText: {
    fontSize: RFValue(25),
    color: "white"
  },
  postTitleTextLight: {
    fontSize: RFValue(25),
    color: "black"
  },
  postArtistText: {
    fontSize: RFValue(18),
    color: "white"
  },
  postArtistTextLight: {
    fontSize: RFValue(18),
    color: "black"
  },
  mediaTextContainer: {
    padding: RFValue(20)
  },
  mediaText: {
    fontSize: RFValue(15),
    color: "white"
  },
  mediaTextLight: {
    fontSize: RFValue(15),
    color: "black"
  },
  descriptionText: {
    fontSize: RFValue(20),
    color: "white"
  },
  descriptionTextLight: {
    fontSize: RFValue(20),
    color: "black"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  likeTextLight: {
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  likeButtonLiked: {
    flexDirection: "row",
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeButtonDisliked: {
    flexDirection: "row",
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#eb3948",
    borderRadius: RFValue(30),
    borderWidth: 2
  },
});
