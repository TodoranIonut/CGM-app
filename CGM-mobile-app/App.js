import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";

import styles from "./styles";
import React, { useState } from "react";
import LoginScreen from "./app/screen/LoginScreen";

export default function App() {
  return <LoginScreen></LoginScreen>;
}
