import {
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  color,
  or,
} from "react-native-reanimated";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../config/colors";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { BASE_URL, REGISTER_PATH } from "../config/config";
import { Dropdown } from "react-native-element-dropdown";
import { getPatients } from "../screen/PatientsScreen";

const { width, height } = Dimensions.get("window");

export default function AddPatientScreen({ navigation }) {
  const { login, logout, isLoggedIn, userToken, userName, userRole } =
    useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState([
    { label: "MALE", value: "MALE" },
    { label: "FEMALE", value: "FEMALE" },
  ]);
  const [email, setEmail] = useState("");
  const [cnp, setCnp] = useState("");
  const [age, setAge] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [doctorId, setDoctorId] = useState(1);
  const [isFocus, setIsFocus] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [diagnosticValue, setDiagnosticValue] = useState(null);
  const [diagnostic, setDiagnostic] = useState([
    { label: "HEALTHY", value: "HEALTHY" },
    { label: "DIABETES_I", value: "DIABETES_I" },
    { label: "DIABETES_II", value: "DIABETES_II" },
  ]);

  const validateUserPatientData = () => {
    if (email == "") {
      Alert.alert("Error", "Email field is empty!");
      return false;
    }
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      Alert.alert("Invalid Email", "Email address is invalid!");
      return false;
    }
    if (firstName == "") {
      Alert.alert("Error", "First name field is empty!");
      return false;
    }
    if (phoneNumber == "") {
      Alert.alert("Error", "Phone Number field is empty!");
      return false;
    }
    if (gender == "MALE" || gender == "FEMALE") {
      Alert.alert("Error", "Please pick a gender!");
      return false;
    }
    if (cnp == "") {
      Alert.alert("Error", "CNP field is empty!");
      return false;
    }
    return true;
  };

  const savePatientData = async () => {
    const makePost = validateUserPatientData();

    if (makePost == true) {
      const authorizationConfig = {
        headers: { Authorization: `Bearer ${userToken}` },
      };

      const dataUpdate = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        gender: genderValue,
        email: email,
        cnp: cnp,
        age: age,
        heightCm: heightCm,
        weightKg: weightKg,
        diagnostic: diagnosticValue,
        doctorEmail: userName,
      };

      console.log(dataUpdate);

      await axios
        .post(`${BASE_URL}${REGISTER_PATH}`, dataUpdate, authorizationConfig)
        .then((res) => {
          console.log(res.data);
          navigation.navigate("Patients");
          Alert.alert("Success!!!", "Patient was added succesfully!");
        })
        .catch((e) => {
          Alert.alert(
            "Error!!!",
            "Some of the data are allready find in database!"
          );
          console.log(`Login error ${e}`);
        });

      getPatients();
    }
  };

  const animatedScaleValue = useSharedValue(1);

  const springAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animatedScaleValue.value }],
    };
  });

  const cancelAddPatient = () => {
    navigation.navigate("Patients");
  };

  return (
    <SafeAreaView style={patientsStyle.patientsPageContainer}>
      <View style={patientsStyle.headerContainer}>
        <Text style={patientsStyle.headerText}>Complete new patient data</Text>
        <Pressable onPress={cancelAddPatient}>
          <Text
            style={[patientsStyle.headerText, { color: colors.mintGreenDark }]}
          >
            Cancel
          </Text>
        </Pressable>
      </View>
      <View style={patientsStyle.allpatientsContainer}>
        <ScrollView>
          <View style={patientsStyle.patientDataContainer}>
            <TextInput
              placeholder="First Name"
              placeholderTextColor="white"
              onChangeText={(firstName) => setFirstName(firstName)}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="white"
              onChangeText={(lastName) => setLastName(lastName)}
              style={styles.textInput}
            />
            <Dropdown
              style={{
                height: 50,
                borderWidth: 1.5,
                borderColor: "white",
                color: "white",
                marginHorizontal: 25,
                marginTop: 30,
                borderRadius: 25,
                paddingLeft: 20,
                backgroundColor: colors.grey,
                shadowColor: colors.absoluteWhite,
              }}
              data={gender}
              placeholder={"Gender"}
              selectedTextStyle={{ fontSize: 16, color: colors.absoluteWhite }}
              inputSearchStyle={{
                height: 50,
                fontSize: 12,
                backgroundColor: colors.absoluteBlack,
              }}
              placeholderStyle={{ color: colors.absoluteWhite }}
              labelField="label"
              valueField="value"
              onBlur={() => setIsFocus(true)}
              onFocus={() => setIsFocus(false)}
              onChange={(gender) => {
                setGenderValue(gender.value);
                setIsFocus(false);
              }}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="white"
              onChangeText={(email) => setEmail(email)}
              style={styles.textInput}
            />
            <TextInput
              placeholder="CNP"
              placeholderTextColor="white"
              onChangeText={(cnp) => setCnp(cnp)}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="white"
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Age"
              placeholderTextColor="white"
              onChangeText={(age) => setAge(age)}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Height (CM)"
              placeholderTextColor="white"
              onChangeText={(heightCm) => setHeightCm(heightCm)}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Weight (KG)"
              placeholderTextColor="white"
              onChangeText={(weightKg) => setWeightKg(weightKg)}
              style={styles.textInput}
            />
            <Dropdown
              style={{
                height: 50,
                borderWidth: 1.5,
                borderColor: "white",
                color: "white",
                marginHorizontal: 25,
                marginTop: 30,
                borderRadius: 25,
                paddingLeft: 20,
                backgroundColor: colors.grey,
                shadowColor: colors.absoluteWhite,
              }}
              data={diagnostic}
              placeholder={"Diagnostic"}
              selectedTextStyle={{ fontSize: 16, color: colors.absoluteWhite }}
              inputSearchStyle={{
                height: 50,
                fontSize: 12,
                backgroundColor: colors.absoluteBlack,
              }}
              placeholderStyle={{ color: colors.absoluteWhite }}
              labelField="label"
              valueField="value"
              onBlur={() => setIsFocus(true)}
              onFocus={() => setIsFocus(false)}
              onChange={(diagnostic) => {
                setDiagnosticValue(diagnostic.value);
                setIsFocus(false);
              }}
            />
          </View>
        </ScrollView>
      </View>
      <View style={patientsStyle.addGlucoseContainer}>
        <View style={patientsStyle.inputGlucoseUnitContainer}></View>
        <Animated.View style={springAnimatedStyle}>
          <Pressable
            style={patientsStyle.button}
            onPress={() => savePatientData()}
          >
            <Text style={patientsStyle.buttonText}>Save new patient</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  searchContainer: {},
  allpatientsContainer: {
    flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "center",
    // marginBottom: "5%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  patientDataContainer: {
    borderRadius: 9,
    margin: 7,
    paddingLeft: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  headerText: {
    color: colors.absoluteWhite,
    paddingLeft: "5%",
    paddingRight: "5%",
    fontWeight: "500",
    alignSelf: "center",
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
});
