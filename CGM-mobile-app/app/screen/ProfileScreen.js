import {
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../../styles";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../config/colors";
import {
  BASE_URL,
  GET_DOCTOR_BY_ID,
  GET_PATIENT_BY_ID,
  GET_DOCTOR_BY_EMAIL,
  GET_PATIENT_BY_EMAIL,
  PUT_UPDATE_DOCTOR,
  PUT_UPDATE_PATIENT,
} from "../config/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

export default function ProfileScreen({ naviagtion }) {
  const { width, height } = Dimensions.get("window");
  const { login, logout, isLoggedIn, userToken, userName, userRole } =
    useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [cnp, setCnp] = useState();

  const [clinic, setClinic] = useState(null);

  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [heightCm, setHeightCm] = useState(null);
  const [weightKg, setWeightKg] = useState(null);
  const [diagnostic, setdDiagnostic] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [thisUserId, setThisUserId] = useState(null);

  const activateEditMode = () => {
    if (editMode == false) {
      setEditMode(true);
    } else {
      setEditMode(false);
      Alert.alert("Changes saved successfully!");
    }
  };

  const validateUserData = () => {
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

  const getProfileData = async () => {
    const authorizationConfig = {
      headers: { Authorization: `Bearer ${userToken}` },
    };

    if (userRole === "ROLE_DOCTOR") {
      await axios
        .get(
          `${BASE_URL}${GET_DOCTOR_BY_EMAIL}${userName}`,
          authorizationConfig
        )
        .then((res) => {
          setThisUserId(res.data["doctorId"]);
          setFirstName(res.data["firstName"]);
          setLastName(res.data["lastName"]);
          setdDiagnostic(res.data["diagnostic"]);
          setGender(res.data["gender"]);
          setPhoneNumber(res.data["phoneNumber"]);
          setEmail(res.data["email"]);
          setCnp(res.data["cnp"]);
          setClinic(res.data["clinic"]);
        })
        .catch((e) => {
          console.log(`Login error ${e}`);
        });
    } else if (userRole === "ROLE_PATIENT") {
      await axios
        .get(
          `${BASE_URL}${GET_PATIENT_BY_EMAIL}${userName}`,
          authorizationConfig
        )
        .then((res) => {
          setThisUserId(res.data["patientId"]);
          setFirstName(res.data["firstName"]);
          setLastName(res.data["lastName"]);
          setPhoneNumber(res.data["phoneNumber"]);
          setEmail(res.data["email"]);
          setCnp(res.data["cnp"]);
          setGender(res.data["gender"]);
          setAge(res.data["age"]);
          setHeightCm(res.data["heightCm"]);
          setWeightKg(res.data["weightKg"]);
          setdDiagnostic(res.data["diagnostic"]);
          setDoctor(res.data["doctorId"]);
        })
        .catch((e) => {
          console.log(`Login error ${e}`);
        });
    }
  };

  const updateProfileData = async () => {
    const makePost = validateUserData();
    if (makePost == true) {
      if (userRole === "ROLE_DOCTOR") {
        const authorizationConfig = {
          headers: { Authorization: `Bearer ${userToken}` },
        };

        const dataUpdate = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          cnp: cnp,
          clinic: clinic,
        };

        await axios
          .put(
            `${BASE_URL}${PUT_UPDATE_DOCTOR}${thisUserId}`,
            dataUpdate,
            authorizationConfig
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((e) => {
            console.log(`Login error ${e}`);
          });
      } else if (userRole === "ROLE_PATIENT") {
        const dataUpdate = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          cnp: cnp,
          clinic: clinic,
          gender: gender,
          age: age,
          heightCm: heightCm,
          weightKg: weightKg,
          diagnostic: diagnostic,
        };

        await axios
          .put(
            `${BASE_URL}${PUT_UPDATE_PATIENT}${thisUserId}`,
            dataUpdate,
            authorizationConfig
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((e) => {
            console.log(`Login error ${e}`);
          });
      }
    }
    activateEditMode();
  };

  useEffect(() => {
    getProfileData();
  }, [userRole]);

  return (
    <SafeAreaView style={profileStyles.profileContainer}>
      <View style={profileStyles.headerContainer}>
        <Text style={profileStyles.headerText}>Profile screen</Text>
      </View>
      <ScrollView>
        <View style={profileStyles.userProfileContainer}>
          {userRole === "ROLE_DOCTOR" ? (
            editMode ? (
              <View>
                <Text style={profileStyles.leftPatientData}>ID:</Text>
                <TextInput style={profileStyles.rightPatientData}>
                  {thisUserId}
                </TextInput>
                <Text style={profileStyles.leftPatientData}>First Name:</Text>
                <TextInput
                  onChangeText={(firstName) => setFirstName(firstName)}
                  style={profileStyles.rightPatientData}
                >
                  {firstName}
                </TextInput>
                <Text style={profileStyles.leftPatientData}>Last Name:</Text>
                <TextInput
                  onChangeText={(lastName) => setLastName(lastName)}
                  style={profileStyles.rightPatientData}
                >
                  {lastName}
                </TextInput>
                <Text style={profileStyles.leftPatientData}>Email:</Text>
                <Text style={profileStyles.rightPatientData}>{email}</Text>
                <Text style={profileStyles.leftPatientData}>Cnp:</Text>
                <TextInput
                  onChangeText={(cnp) => setCnp(cnp)}
                  style={profileStyles.rightPatientData}
                >
                  {cnp}
                </TextInput>
                <Text style={profileStyles.leftPatientData}>Phone Number:</Text>
                <TextInput
                  onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                  style={profileStyles.rightPatientData}
                >
                  {phoneNumber}
                </TextInput>
                <Text style={profileStyles.leftPatientData}>Clinic:</Text>
                <TextInput
                  onChangeText={(clinic) => setClinic(clinic)}
                  style={profileStyles.rightPatientData}
                  required={editMode}
                >
                  {clinic}
                </TextInput>
              </View>
            ) : (
              <View>
                <Text style={profileStyles.leftPatientData}>ID:</Text>
                <Text style={profileStyles.rightPatientData}>{thisUserId}</Text>
                <Text style={profileStyles.leftPatientData}>First Name:</Text>
                <Text style={profileStyles.rightPatientData}>{firstName}</Text>
                <Text style={profileStyles.leftPatientData}>Last Name:</Text>
                <Text style={profileStyles.rightPatientData}>{lastName}</Text>
                <Text style={profileStyles.leftPatientData}>Email:</Text>
                <Text style={profileStyles.rightPatientData}>{email}</Text>
                <Text style={profileStyles.leftPatientData}>Cnp:</Text>
                <Text style={profileStyles.rightPatientData}>{cnp}</Text>
                <Text style={profileStyles.leftPatientData}>Phone Number:</Text>
                <Text style={profileStyles.rightPatientData}>
                  {phoneNumber}
                </Text>
                <Text style={profileStyles.leftPatientData}>Clinic:</Text>
                <Text
                  style={profileStyles.rightPatientData}
                  required={editMode}
                >
                  {clinic}
                </Text>
              </View>
            )
          ) : null}
          {userRole === "ROLE_PATIENT" ? (
            editMode ? (
              <View>
                <Text style={profileStyles.leftPatientData}>ID:</Text>
                <Text style={profileStyles.rightPatientData}>{thisUserId}</Text>
                <Text style={profileStyles.leftPatientData}>First Name:</Text>
                <TextInput
                  onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                  style={profileStyles.rightPatientData}
                >
                  {firstName}
                </TextInput>
                <Text style={profileStyles.leftPatientData}>Last Name:</Text>
                <TextInput
                  onChangeText={(lastName) => setLastName(lastName)}
                  style={profileStyles.rightPatientData}
                >
                  {lastName}
                </TextInput>
                <Text style={profileStyles.leftPatientData}>Status:</Text>
                <TextInput
                  onChangeText={(diagnostic) => setdDiagnostic(diagnostic)}
                  style={profileStyles.rightPatientData}
                >
                  {diagnostic}
                </TextInput>
                <Text style={profileStyles.leftPatientData}>Gender:</Text>
                <Text value={gender} style={profileStyles.rightPatientData}>
                  {gender}
                </Text>
                <Text style={profileStyles.leftPatientData}>Email:</Text>
                <Text style={profileStyles.rightPatientData}>{email}</Text>
                <Text style={profileStyles.leftPatientData}>Cnp:</Text>
                <TextInput
                  onChangeText={(cnp) => setCnp(cnp)}
                  style={profileStyles.rightPatientData}
                >
                  {cnp}
                </TextInput>
                <Text style={profileStyles.leftPatientData}>Phone Number</Text>
                <TextInput
                  onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                  style={profileStyles.rightPatientData}
                >
                  {phoneNumber}
                </TextInput>
                <Text style={profileStyles.leftPatientData}>Age years:</Text>
                <TextInput
                  onChangeText={(age) => setAge(age)}
                  style={profileStyles.rightPatientData}
                >
                  {age}
                </TextInput>
                <Text style={profileStyles.leftPatientData}>Height cm:</Text>
                <TextInput
                  onChangeText={(heightCm) => setHeightCm(heightCm)}
                  style={profileStyles.rightPatientData}
                >
                  {heightCm}
                </TextInput>
                <Text style={profileStyles.leftPatientData}>Weight kg:</Text>
                <TextInput
                  onChangeText={(weightKg) => setWeightKg(weightKg)}
                  style={profileStyles.rightPatientData}
                >
                  {weightKg}
                </TextInput>
              </View>
            ) : (
              <View>
                <Text style={profileStyles.leftPatientData}>ID:</Text>
                <Text style={profileStyles.rightPatientData}>{thisUserId}</Text>
                <Text style={profileStyles.leftPatientData}>First Name:</Text>
                <Text style={profileStyles.rightPatientData}>{firstName}</Text>
                <Text style={profileStyles.leftPatientData}>Last Name:</Text>
                <Text style={profileStyles.rightPatientData}>{lastName}</Text>
                <Text style={profileStyles.leftPatientData}>Status:</Text>
                <Text style={profileStyles.rightPatientData}>{diagnostic}</Text>
                <Text style={profileStyles.leftPatientData}>Gender:</Text>
                <Text style={profileStyles.rightPatientData}>{gender}</Text>
                <Text style={profileStyles.leftPatientData}>Email:</Text>
                <Text style={profileStyles.rightPatientData}>{email}</Text>
                <Text style={profileStyles.leftPatientData}>Cnp:</Text>
                <Text style={profileStyles.rightPatientData}>{cnp}</Text>
                <Text style={profileStyles.leftPatientData}>Phone Number</Text>
                <Text style={profileStyles.rightPatientData}>
                  {phoneNumber}
                </Text>
                <Text style={profileStyles.leftPatientData}>Age:</Text>
                <Text style={profileStyles.rightPatientData}>{age} years</Text>
                <Text style={profileStyles.leftPatientData}>Height:</Text>
                <Text style={profileStyles.rightPatientData}>
                  {heightCm} cm
                </Text>
                <Text style={profileStyles.leftPatientData}>Weight:</Text>
                <Text style={profileStyles.rightPatientData}>
                  {weightKg} kg
                </Text>
              </View>
            )
          ) : null}
        </View>

        <View style={profileStyles.profileButtonsContainer}>
          {editMode ? (
            <Pressable style={styles.button} onPress={updateProfileData}>
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.button} onPress={activateEditMode}>
              <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
          )}

          <Pressable style={styles.button} onPress={logout}>
            <Text style={styles.buttonText}>LOG Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
    // </KeyboardAwareScrollView>
  );
}

const profileStyles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.absoluteWhite,
  },
  headerContainer: {
    height: "8%",
    backgroundColor: colors.grey,
    justifyContent: "center",
  },
  profileButtonsContainer: {
    flex: 0.3,
    justifyContent: "flex-end",
    // marginBottom: "5%",
    marginBottom: "5%",
    color: "black",
  },
  headerText: {
    color: colors.mintGreenDark,
    paddingLeft: "5%",
    fontWeight: "500",
  },
  userProfileContainer: {
    flex: 1,
    justifyContent: "flex-start",
    // backgroundColor: colors.greenWhite,
    // backgroundColor: colors.absoluteWhite,
    // flexDirection: "row",
  },
  leftPatientData: {
    fontSize: 14,
    fontWeight: "500",
    borderBottomWidth: 0.5,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 4,
  },
  rightPatientData: {
    borderRadius: 4,
    fontSize: 18,
    fontWeight: "500",
    borderBottomWidth: 1.5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 4,
  },
});
