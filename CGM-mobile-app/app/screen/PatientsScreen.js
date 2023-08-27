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
import React, { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../../styles";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../config/colors";
import { Dropdown } from "react-native-element-dropdown";
import { LineChart } from "react-native-chart-kit";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { BASE_URL, GET_PATIENTS_BY_DOCTOR_EMAIL } from "../config/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { SearchBar } from "react-native-screens";

const { width, height } = Dimensions.get("window");

export default function PatientsScreen({ navigation }) {
  const { login, logout, isLoggedIn, userToken, userName, userRole } =
    useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const animatedScaleValue = useSharedValue(1);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // patients.map((data) => {
  //   return;
  // });

  const springAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animatedScaleValue.value }],
    };
  });

  const getPatients = () => {
    axios
      .get(`${BASE_URL}${GET_PATIENTS_BY_DOCTOR_EMAIL}${userName}`)
      .then((res) => {
        // console.log(res.data);
        console.log(res.data[1]);
        setPatients(res.data);
        // display();
      })
      .catch((e) => {
        Alert.alert("Error!!!", "Nustiu");
        console.log(`Login error ${e}`);
      });
  };

  // const handleEditBookClick = (e, book) => {
  //   e.preventDefault();
  //   setEditBookId(book.id);

  //   const formValues = {
  //     id: book.id,
  //     title: book.title,
  //     author: book.author,
  //     status: book.status,
  //   };

  const statusStyles = {
    HEALTHY: { color: colors.mintGreenDark },
    DIABETES_II: { color: colors.yellowStatus },
    DIABETES_I: { color: colors.redStatus },
    GESTATIONAL: { color: colors.yellowStatus },
  };

  const viewPatientData = (patientId) => {
    setSelectedPatientId(patientId);
    console.log("patientId", patientId);
  };

  function display() {
    return patients
      .filter((patient) => {
        if (searchTerm == "") {
          return patient;
        } else if (
          patient.patientId.toString().includes(searchTerm) ||
          patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.cnp.includes(searchTerm) ||
          patient.diagnostic.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return patient;
        }
      })
      .map((item) => {
        return (
          <Pressable onPress={() => viewPatientData(item.patientId)}>
            <View style={patientsStyle.patientDataContainer}>
              <View style={patientsStyle.boxLeft}>
                {selectedPatientId === item.patientId
                  ? [
                      <Text style={patientsStyle.leftPatientData}>ID:</Text>,
                      <Text style={patientsStyle.leftPatientData}>Name:</Text>,
                      <Text style={patientsStyle.leftPatientData}>
                        Diagnostic:
                      </Text>,
                      <Text style={patientsStyle.leftPatientData}>
                        Gender:
                      </Text>,
                      <Text style={patientsStyle.leftPatientData}>Email:</Text>,
                      <Text style={patientsStyle.leftPatientData}>Cnp:</Text>,
                      <Text style={patientsStyle.leftPatientData}>
                        Phone Number
                      </Text>,
                      <Text style={patientsStyle.leftPatientData}>Age:</Text>,

                      <Text style={patientsStyle.leftPatientData}>
                        Height:
                      </Text>,

                      <Text style={patientsStyle.leftPatientData}>
                        Weight:
                      </Text>,
                    ]
                  : [
                      <Text style={patientsStyle.leftPatientData}>Name: </Text>,
                      <Text style={patientsStyle.leftPatientData}>
                        Diagnostic:
                      </Text>,
                    ]}
              </View>
              <View style={patientsStyle.boxRight}>
                {selectedPatientId === item.patientId
                  ? [
                      <Text style={patientsStyle.rightPatientData}>
                        {item.patientId}
                      </Text>,
                      <Text style={patientsStyle.rightPatientData}>
                        {item.lastName} {item.firstName}
                      </Text>,
                      <Text
                        style={[
                          patientsStyle.rightPatientData,
                          statusStyles[item.diagnostic],
                        ]}
                      >
                        {item.diagnostic}
                      </Text>,
                      <Text style={patientsStyle.rightPatientData}>
                        {item.gender}
                      </Text>,
                      <Text style={patientsStyle.rightPatientData}>
                        {item.email}
                      </Text>,
                      <Text style={patientsStyle.rightPatientData}>
                        {item.cnp}
                      </Text>,
                      <Text style={patientsStyle.rightPatientData}>
                        {item.phoneNumber}
                      </Text>,
                      <Text style={patientsStyle.rightPatientData}>
                        {item.age} years
                      </Text>,
                      <Text style={patientsStyle.rightPatientData}>
                        {item.heightCm} cm
                      </Text>,
                      <Text style={patientsStyle.rightPatientData}>
                        {item.weightKg} kg
                      </Text>,
                    ]
                  : [
                      <Text style={patientsStyle.rightPatientData}>
                        {item.lastName} {item.firstName}
                      </Text>,
                      <Text
                        style={[
                          patientsStyle.rightPatientData,
                          statusStyles[item.diagnostic],
                        ]}
                      >
                        {item.diagnostic}
                      </Text>,
                    ]}
              </View>
            </View>
          </Pressable>
        );
      });
  }
  useEffect(() => {
    getPatients();
  }, []);
  return (
    <SafeAreaView style={patientsStyle.patientsPageContainer}>
      <View style={patientsStyle.headerContainer}>
        <Text style={patientsStyle.headerText}>Track patients</Text>
      </View>
      <View style={patientsStyle.searchContainer}>
        <TextInput
          placeholder="Search Patient"
          value={searchTerm}
          onChangeText={(searchTerm) => setSearchTerm(searchTerm)}
        />
      </View>
      <ScrollView>
        <View style={patientsStyle.allpatientsContainer}>{display()}</View>
      </ScrollView>
      <View style={patientsStyle.addGlucoseContainer}>
        <View style={patientsStyle.inputGlucoseUnitContainer}></View>
        <Animated.View style={springAnimatedStyle}>
          <Pressable
            style={patientsStyle.button}
            onPress={() => navigation.navigate("AddPatients")}
          >
            <Text style={patientsStyle.buttonText}>Add Patient</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const patientsStyle = StyleSheet.create({
  patientsPageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    height: 55,
    backgroundColor: colors.grey,
    justifyContent: "center",
  },
  searchContainer: {
    height: 40,
    borderWidth: 2.5,
    borderColor: colors.mintGreenDark,
    margin: 8,
    paddingLeft: 15,
    paddingTop: 1,
    color: colors.absoluteWhite,
    borderRadius: 12,
    textAlignVertical: "center",
  },
  allpatientsContainer: {
    flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "center",
    // marginBottom: "5%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  patientDataContainer: {
    borderRadius: 9,
    marginTop: 10,
    marginHorizontal: 10,
    paddingLeft: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
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
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 25,
    marginTop: 30,
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
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "400",
    color: colors.absoluteWhite,
    letterSpacing: 0.5,
  },
  leftPatientData: {
    fontSize: 16,
    fontWeight: "400",
  },
  rightPatientData: {
    fontSize: 16,
    fontWeight: "500",
  },
  boxLeft: {
    flex: 0.5,
  },
  boxRight: {
    flex: 0.5,
  },
});
