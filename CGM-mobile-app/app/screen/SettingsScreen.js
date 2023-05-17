import { StyleSheet, Text, View } from "react-native";
import * as React from "react";

export default function SettingsScreen({ naviagtion }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => naviagtion.navigate("Home")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Setting screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
