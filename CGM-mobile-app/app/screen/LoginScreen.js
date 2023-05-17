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
  KeyboardAvoidingView,
} from "react-native";
import styles from "../../styles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import React, { useContext, useEffect, useState } from "react";
import Molecule from "./Molecule";
import { useNavigation } from "@react-navigation/core";
import { AuthContext } from "../context/AuthContext";
import { ScrollView } from "react-native-gesture-handler";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../config/colors";

function LoginScreen(props) {
  const { height, width } = Dimensions.get("window");
  const imagePosition = useSharedValue(1);
  const animatedScaleValue = useSharedValue(1);
  const [isActivated, setIsActivated] = useState(false);
  const { login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const springAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animatedScaleValue.value }],
    };
  });

  const loginHandler = () => {
    animatedScaleValue.value = withSequence(withSpring(1.2), withSpring(1));
    login(email, password);
  };

  return (
    <LinearGradient
      colors={[colors.absoluteBlack, colors.absoluteBlack]}
      style={styles.container}
    >
      <Animated.View style={[springAnimatedStyle, styles.logoContainer]}>
        <Text style={styles.logoText}> CGM </Text>
        <Molecule />
      </Animated.View>
      <View style={styles.bottomContainer}>
        <TextInput
          placeholder="Email "
          placeholderTextColor="white"
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="white"
          value={password}
          onChangeText={(password) => setPassword(password)}
          style={styles.textInput}
          secureTextEntry
        />
        <Animated.View style={[springAnimatedStyle]}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

export default LoginScreen;
