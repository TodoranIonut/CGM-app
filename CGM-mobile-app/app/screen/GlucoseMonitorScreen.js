import {
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  color,
} from "react-native-reanimated";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../config/colors";
import { Dropdown } from "react-native-element-dropdown";
import { VictoryLine, Curve, VictoryLabel, VictoryChart } from "victory-native";
import axios from "axios";
import {
  BASE_URL,
  POST_PATIENT_GLUCOSE_START_TIMESTAMP,
  POST_GLUCOSE_SAVE,
} from "../config/config";
import { ScrollView } from "react-native-gesture-handler";
import { Alert } from "react-native";
const { width, height } = Dimensions.get("window");

export default function GlucoseMonitorScreen({ naviagtion }) {
  const { login, logout, isLoggedIn, userToken, userName, userRole } =
    useContext(AuthContext);
  const animatedScaleValue = useSharedValue(1);
  const [glucose, setGlucose] = useState(0);
  const [glucoseRecords, setGlucoseRecords] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("mgdl");
  const [items, setItems] = useState([
    { label: "Mg/dL", value: "mgdl" },
    { label: "Mmol/L", value: "mmol" },
  ]);

  const [intervalTimestamp, setIntervalTimestamp] = useState(3 * 60 * 60);
  const [clickedId, setClickedId] = useState(0);
  const authorizationConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  const springAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animatedScaleValue.value }],
    };
  });

  const addGlucoseLevel = async () => {
    animatedScaleValue.value = withSequence(withSpring(1.4), withSpring(1));
    console.log("add glucose from");
    console.log(glucose);
    if (value === "mmol") {
      setGlucose(glucose * 18);
    }

    console.log(glucose);
    console.log(userName);
    if (glucose < 50 || glucose > 250) {
      Alert.alert(
        "Invalid glucose value!",
        "Glucose value should be between 50 and 250 MG/DL"
      );
    } else {
      await axios
        .post(
          `${BASE_URL}${POST_GLUCOSE_SAVE}`,
          {
            patientEmail: userName,
            glucoseMgPerDl: glucose,
          },
          authorizationConfig
        )
        .then((res) => {})
        .catch((e) => {
          console.log(`Add glucose error ${e}`);
        });

      getGlucoseLevelStartingWithTimestamp();
    }

    setGlucose(null);
  };

  const getGlucoseLevelStartingWithTimestamp = async () => {
    const lastViewTimestamp = Math.floor(Date.now() / 1000) - intervalTimestamp;
    await axios
      .post(
        `${BASE_URL}${POST_PATIENT_GLUCOSE_START_TIMESTAMP}`,
        {
          patientEmail: userName,
          startTimestamp: lastViewTimestamp,
        },
        authorizationConfig
      )
      .then((res) => {
        // console.log(res.data);
        setGlucoseRecords(res.data);
      })
      .catch((e) => {
        console.log(`Login error ${e}`);
      });
  };
  const ButtonGroup = ({ buttons }) => {
    const handleClick = (index) => {
      setClickedId(index);
      console.log("Clicked id", index);
      "1H", "3H", "6H", "12H", "1D", "2D";
      if (index === 0) {
        setIntervalTimestamp(1 * 60 * 60); //1 hours
      } else if (index === 1) {
        setIntervalTimestamp(3 * 60 * 60); //3 hours
      } else if (index === 2) {
        setIntervalTimestamp(6 * 60 * 60); //6 hours
      } else if (index === 3) {
        setIntervalTimestamp(12 * 60 * 60); //1 month
      } else if (index === 4) {
        setIntervalTimestamp(24 * 60 * 60); //1 day
      } else if (index === 5) {
        setIntervalTimestamp(2 * 24 * 60 * 60); //2 day
      }
      getGlucoseLevelStartingWithTimestamp();
    };

    return (
      <View style={monitorStyles.timeRangButtonsContainer}>
        {buttons.map((buttonLabel, index) => {
          return (
            <TouchableOpacity
              onPress={() => handleClick(index)}
              style={[
                index === clickedId
                  ? monitorStyles.timeRangeButton
                  : monitorStyles.timeRangeButtonActive,
              ]}
              key={index}
            >
              <Text
                style={[
                  index === clickedId
                    ? monitorStyles.timeRangeButtonsText
                    : monitorStyles.timeRangeButtonsTextActive,
                ]}
              >
                {buttonLabel}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  useEffect(() => {
    getGlucoseLevelStartingWithTimestamp();
  }, [intervalTimestamp]);

  return (
    <SafeAreaView style={monitorStyles.glucoseMonitorContainer}>
      <View style={monitorStyles.headerContainer}>
        <Text style={monitorStyles.headerText}>Glucose Monitoring</Text>
      </View>
      <ScrollView>
        <View>
          <VictoryChart
            maxDomain={{ y: 250 }}
            minDomain={{ y: 50 }}
            width={width}
            height={width}
          >
            <VictoryLine
              style={{
                data: { stroke: colors.mintGreenDark },
                parent: { border: "1px solid #ccc" },
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              x="timestamp"
              y="glucoseMgPerDl"
              data={glucoseRecords}
              interpolation="natural" //step, linear, cardinal, natural
            ></VictoryLine>
          </VictoryChart>
        </View>

        <ButtonGroup
          buttons={["1H", "3H", "6H", "12H", "1D", "2D"]}
        ></ButtonGroup>
        <View style={monitorStyles.inputGlucoseUnitContainer}>
          <TextInput
            placeholder="Glucose"
            placeholderTextColor="white"
            keyboardType="numeric"
            maxLength={5}
            // value={glucose}
            onChangeText={(glucose) => setGlucose(glucose)}
            style={monitorStyles.textInput}
          />
          <Dropdown
            style={monitorStyles.dropDownUnit}
            data={items}
            placeholder={"Mg/dL"}
            selectedTextStyle={monitorStyles.selectedTextStyle}
            inputSearchStyle={monitorStyles.inputSearchStyle}
            placeholderStyle={monitorStyles.placeholderStyle}
            labelField="label"
            valueField="value"
            onBlur={() => setIsFocus(false)}
            onFocus={() => setIsFocus(true)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
          <Animated.View style={springAnimatedStyle}>
            <Pressable style={monitorStyles.button} onPress={addGlucoseLevel}>
              <Text style={monitorStyles.buttonText}>Add</Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const monitorStyles = StyleSheet.create({
  glucoseMonitorContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    height: "8%",
    backgroundColor: colors.grey,
    justifyContent: "center",
  },
  inputGlucoseUnitContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },
  headerText: {
    color: colors.absoluteWhite,
    paddingLeft: "5%",
    fontWeight: "500",
  },
  textInput: {
    height: 55,
    width: 120,
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
    height: 55,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 25,
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
    fontSize: 20,
    fontWeight: "400",
    color: colors.absoluteWhite,
    letterSpacing: 0.5,
  },
  dropDownUnit: {
    height: 55,
    width: 100,
    backgroundColor: colors.absoluteBlack,

    borderColor: colors.mintGreenDark,
    borderWidth: 0.5,
    borderRadius: 25,
    paddingHorizontal: 8,
    marginRight: 20,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.absoluteWhite,
  },
  inputSearchStyle: {
    height: 50,
    fontSize: 12,
    backgroundColor: colors.absoluteBlack,
  },
  placeholderStyle: {
    color: colors.absoluteWhite,
  },
  timeRangButtonsContainer: {
    flexDirection: "row",
    // justifyContent: "space-evenly",
    // marginBottom: 20,
    // borderColor: "black",
  },
  timeRangeButton: {
    flex: 1,
    height: 45,
    width: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.mintGreenDark,
    marginBottom: 30,
    marginHorizontal: 6,
  },
  timeRangeButtonsText: {
    color: "white",
    fontWeight: "800",
    fontSize: 23,
  },
  timeRangeButtonActive: {
    flex: 1,
    height: 45,
    width: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.absoluteWhite,
    marginHorizontal: 6,
  },
  timeRangeButtonsTextActive: {
    color: colors.mintGreenDark,
    fontWeight: "500",
    fontSize: 18,
  },
});
