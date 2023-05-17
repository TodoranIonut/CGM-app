import {
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../../styles";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../config/colors";
export default function ProfileScreen({ naviagtion }) {
  const { width, height } = Dimensions.get("window");
  const { login, logout } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);

  const activateEditMode = () => {
    if (editMode == false) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  };

  return (
    // <KeyboardAwareScrollView
    //   extraHeight={120}
    //   enableOnAndroid
    //   style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    // >
    <SafeAreaView style={profileStyles.profileContainer}>
      <View style={profileStyles.headerContainer}>
        <Text style={profileStyles.headerText}>Profile screen</Text>
      </View>
      <View style={profileStyles.profileEditContainer}>
        {editMode ? (
          <Pressable style={styles.button} onPress={activateEditMode}>
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
    </SafeAreaView>
    // </KeyboardAwareScrollView>
  );
}

const profileStyles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    height: "8%",
    backgroundColor: colors.grey,
    justifyContent: "center",
  },
  profileEditContainer: {
    flex: 1,
    justifyContent: "flex-end",
    // marginBottom: "5%",
    marginBottom: "5%",
  },
  headerText: {
    color: colors.absoluteWhite,
    paddingLeft: "5%",
    fontWeight: "500",
  },
});
