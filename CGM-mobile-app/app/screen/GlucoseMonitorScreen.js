import { StyleSheet, Text, View } from "react-native";
import * as React from "react";

export default function GlucoseMonitorScreen({ naviagtion }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => alert('this is the "Glucose" screen.')}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Glucose Monitor Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
