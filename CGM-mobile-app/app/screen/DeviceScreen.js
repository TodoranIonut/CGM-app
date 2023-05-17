import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  useColorScheme,
  TouchableOpacity,
} from "react-native";

const DeviceScreen = () => {
  return (
    <SafeAreaView>
      <Text>Bluetooth</Text>
    </SafeAreaView>
  );
};
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({});

export default DeviceScreen;
