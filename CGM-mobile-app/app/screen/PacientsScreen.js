import {
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  color,
} from "react-native-reanimated";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../../styles";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../config/colors";
import { Dropdown } from "react-native-element-dropdown";
import { LineChart } from "react-native-chart-kit";
const { width, height } = Dimensions.get("window");

export default function PacientsScreen({ naviagtion }) {
  const { login, logout } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const animatedScaleValue = useSharedValue(1);

  const springAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animatedScaleValue.value }],
    };
  });

  const extendData = () => {};

  return (
    <SafeAreaView style={pacientsStyle.pacientsPageContainer}>
      <View style={pacientsStyle.headerContainer}>
        <Text style={pacientsStyle.headerText}>Track Pacients</Text>
      </View>
      <View style={pacientsStyle.searchContainer}>
        <Text>Search pacient</Text>
      </View>
      <View style={pacientsStyle.allPacientsContainer}>
        <Pressable onPress={extendData}>
          <View style={pacientsStyle.pacientDataContainer}>
            <Text>Full Name:</Text>
            <Text>Diagnostic</Text>
            <Text>Glycated</Text>
            <Text>Cnp:</Text>
            <Text>Email:</Text>
          </View>
        </Pressable>
        <Pressable onPress={extendData}>
          <View style={pacientsStyle.pacientDataContainer}>
            <Text>Full Name:</Text>
            <Text>Diagnostic</Text>
            <Text>Glycated</Text>
            <Text>Cnp:</Text>
            <Text>Email:</Text>
          </View>
        </Pressable>
      </View>
      <View style={pacientsStyle.addGlucoseContainer}>
        <View style={pacientsStyle.inputGlucoseUnitContainer}></View>
        <Animated.View style={springAnimatedStyle}>
          <Pressable style={pacientsStyle.button} onPress={extendData}>
            <Text style={pacientsStyle.buttonText}>+</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const pacientsStyle = StyleSheet.create({
  pacientsPageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    height: "8%",
    backgroundColor: colors.grey,
    justifyContent: "center",
  },
  searchContainer: {},
  allPacientsContainer: {
    flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "center",
    // marginBottom: "5%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  pacientDataContainer: {
    borderRadius: 9,
    margin: 7,
    paddingLeft: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  headerText: {
    color: colors.absoluteWhite,
    paddingLeft: "5%",
    fontWeight: "500",
  },
  textInput: {
    flex: 1,
    height: 50,
    // width: width / 2,
    borderWidth: 1.5,
    borderColor: colors.absoluteWhite,
    color: colors.absoluteWhite,
    marginHorizontal: 25,
    textAlign: "center",
    // marginTop: 30,
    borderRadius: 25,
    marginLeft: 20,
    backgroundColor: colors.grey,
    shadowColor: colors.absoluteWhite,
    marginRight: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: colors.grey,
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 25,
    marginTop: 15,
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: colors.absoluteWhite,
    shadowColor: colors.absoluteWhite,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "400",
    color: colors.absoluteWhite,
    letterSpacing: 0.5,
  },
});
