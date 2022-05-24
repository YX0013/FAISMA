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
  TextInput,
  Dimensions,
  Button
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import firebase from "firebase";

//Main concern: uploading art

export default class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImage: "image_1",
      light_theme: true,
      dropdownHeight: 40,
      image: "#"
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
    this.fetchUser();
  }

  getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!cancelled) {
      var imageName = Math.random().toString(36).slice(2);
      this.uploadImage(uri, 'art_' + imageName);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("userArts/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("userArts/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
        alert(this.state.image);
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

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

  addPost = async() => {
    if(this.state.title && this.state.description) {
      let postData = {
        preview_image: this.state.image, 
        title: this.state.title,
        description: this.state.description,
        media: this.state.media,
        artist: firebase.auth().currentUser.displayName,
        artist_uid: firebase.auth().currentUser.uid,
        likes: 0,
        created_on: new Date()
      }
      await firebase.database().ref('/post/' + (Math.random().toString(36).slice(2)))
      .set(postData).then(function(snapshot) {});
      this.props.navigation.navigate('Feed');
    } else {
      alert('All fields are required.');
    }
  }

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
                Upload Art
              </Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <ScrollView>
              <Image
                source= {{uri: this.state.image}}
                style={styles.previewImage}
              ></Image>
              <TextInput
                style={[
                styles.inputFontExtra,
                  styles.inputTextBig,
                  this.state.light_theme
                    ? styles.inputFontLight
                    : styles.inputFont
                ]}
                onChangeText={(title) => this.setState({ title })}
                placeholder={'Title'}
                placeholderTextColor={
                  this.state.light_theme ? 'black' : 'white'
                }
              />
              <TextInput
                style={[
                  styles.inputFontExtra,
                  styles.inputTextBig,
                  this.state.light_theme
                    ? styles.inputFontLight
                    : styles.inputFont
                ]}
                onChangeText={(media) => this.setState({ media })}
                placeholder={'Media'}
                placeholderTextColor={
                  this.state.light_theme ? 'black' : 'white'
                }
              />

              <TextInput
                style={[
                  styles.inputFontExtra,
                  styles.inputTextBig,
                  this.state.light_theme
                    ? styles.inputFontLight
                    : styles.inputFont,
                ]}
                onChangeText={(description) => this.setState({ description })}
                placeholder={'Description'}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor={
                  this.state.light_theme ? 'black' : 'white'
                }
              />
          <View style = {styles.selectPicture}>
                <Button
          title="Pick an image from camera roll"
          onPress={this.selectPicture}
         
        />
        </View>
              <View style={styles.submitButton}>
                <Button color='white' title='Submit' onPress = {() => this.addPost()}/>
              </View>
            </ScrollView>
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
    fontSize: RFValue(28),
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
  },
  fieldsContainer: {
    flex: 0.85
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    //marginVertical: RFValue(10),
    resizeMode: "contain"
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
  },
  inputFontLight: {
    height: RFValue(40),
    borderColor: "black",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "black",
  },
  dropdownLabel: {
    color: "white"
  },
  dropdownLabelLight: {
    color: "black"
  },
  inputFontExtra: {
    marginTop: RFValue(15)
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5)
  },
  submitButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "purple",
    borderRadius: RFValue(30),
    marginBottom: RFValue(20)
  },
  selectPicture: {
    width: RFValue(260),
    height: RFValue(40),
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#ffc7fd",
    borderRadius: RFValue(30),
    margin: RFValue(10)
  }
});
