import { StyleSheet, Text, View } from "react-native";
import * as React from "react";

export default function HomeScreen({ naviagtion }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => alert('this is the "Home" screen.')}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Home Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
