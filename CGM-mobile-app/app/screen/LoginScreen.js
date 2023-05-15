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
import React, { useState } from "react";
import Molecule from "./Molecule";

function LoginScreen(props) {
  const { height, width } = Dimensions.get("window");
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const logoScale = useSharedValue(1);
  const [isActivated, setIsActivated] = useState(false);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [height / 5, height / 10]
    );

    return {
      // opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
        { scale: formButtonScale.value },
      ],
    };
  });
  const loginHandler = () => {
    if (imagePosition.value == 0) {
      imagePosition.value = 1;
      formButtonScale.value = withSequence(withSpring(1.5), withSpring(1));
      logoScale.value = withSequence(withSpring(1.2), withSpring(1));
    }
    if (imagePosition.value == 1) {
      imagePosition.value = 0;
      formButtonScale.value = withSequence(withSpring(1.2), withSpring(1));
      logoScale.value = withSequence(withSpring(1.2), withSpring(1));
    }
    // if (!isActivated) {
    //   runOnJS(setIsActivated)(true);
    // }
  };

  const formAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [height / 10, 250]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Animated.View style={logoAnimatedStyle}>
          <Text style={styles.logoText}> CGM </Text>
          <Molecule />
        </Animated.View>
      </View>
      <View style={styles.bottomContainer}>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <TextInput
            placeholder="Email "
            placeholderTextColor="black"
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            style={styles.textInput}
          />
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.text}>LOG IN</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

export default LoginScreen;
