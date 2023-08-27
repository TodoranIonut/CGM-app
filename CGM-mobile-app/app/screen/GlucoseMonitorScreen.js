import {
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSequence,
//   withSpring,
//   color,
// } from "react-native-reanimated";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../../styles";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../config/colors";
import { Dropdown } from "react-native-element-dropdown";
import { LineChart } from "react-native-chart-kit";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
} from "@rainbow-me/animated-charts";

const { width, height } = Dimensions.get("window");

export default function GlucoseMonitorScreen({ naviagtion }) {
  // const { login, logout } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const animatedScaleValue = useSharedValue(1);
  const [glucoseLevel, setGlucoseLevel] = useState(0);
  const millis = Date.now();

  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("mgdl");
  const [items, setItems] = useState([
    { label: "Mg/dL", value: "mgdl" },
    { label: "Mmol/L", value: "mmol" },
  ]);
  // const items = [
  //   { label: "Mg/dL", value: "mgdl" },
  //   { label: "Mmol/L", value: "mmol" },
  // ];

  // const springAnimatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ scale: animatedScaleValue.value }],
  //   };
  // });

  const addGlucoseLevel = () => {
    // animatedScaleValue.value = withSeq12uence(withSpring(1.4), withSpring(1));
    console.log("glucose level is " + glucoseLevel + " at time " + millis);
    console.log(csvString);
    setGlucoseLevel(0);
  };

  var graphData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [
          Math.random() * 200,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
      },
    ],
  };

  const prices = [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 4],
    [5, 6],
  ];

  var csvData = "column1,column2,column3\nvalue1,value2,value3";

  const csvString = csvData.toString();

  return (
    <SafeAreaView style={monitorStyles.glucoseMonitorContainer}>
      <View style={monitorStyles.headerContainer}>
        <Text style={monitorStyles.headerText}>Glucose Monitoring</Text>
      </View>
      <View>
        <Text>Graph</Text>
        {/* <LineChart
          data={graphData}
          width={width} // from react-native
          height={300}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: colors.mintGreenLight,
            backgroundGradientFrom: colors.absoluteBlack,
            backgroundGradientTo: colors.mintGreenLight,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 125, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        /> */}
      </View>
      {/* <ChartPathProvider
        data={{
          points: prices.map((price) => ({ x: price[0], y: [price[1]] })),
          smoothingStrategy: "bezier",
        }}
      >
        <ChartPath height={800 / 2} stroke="yellow" width={500} />
        <ChartDot style={{ backgroundColor: "blue" }} />
      </ChartPathProvider> */}
      <View style={monitorStyles.addGlucoseContainer}>
        <View style={monitorStyles.inputGlucoseUnitContainer}>
          <TextInput
            placeholder="Glucose"
            placeholderTextColor="white"
            keyboardType="numeric"
            maxLength={3}
            value={glucoseLevel}
            onChangeText={(glucose) => setGlucoseLevel(glucose)}
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
        </View>
        <Animated.View style={springAnimatedStyle}>
          <Pressable style={monitorStyles.button} onPress={addGlucoseLevel}>
            <Text style={monitorStyles.buttonText}>+</Text>
          </Pressable>
        </Animated.View>
      </View>
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
  addGlucoseContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "5%",
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
  dropDownUnit: {
    height: 50,
    backgroundColor: colors.absoluteBlack,
    width: width / 3,
    borderColor: colors.mintGreenDark,
    borderWidth: 0.5,
    borderRadius: 25,
    paddingHorizontal: 8,
    marginRight: 20,
  },
  inputGlucoseUnitContainer: {
    flexDirection: "row",
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
});
