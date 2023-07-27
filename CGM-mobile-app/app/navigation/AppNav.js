import styles from "../../styles";
import React, { useState, useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//screens
import LoginScreen from "../screen/LoginScreen";
import HomeScreen from "../screen/LoginScreen";
import GlucoseMonitorScreen from "../screen/GlucoseMonitorScreen";
import DeviceScreen from "../screen/DeviceScreen";
import ProfileScreen from "../screen/ProfileScreen";
import PacientsScreen from "../screen/PacientsScreen";
import SettingsScreen from "../screen/SettingsScreen";
import colors from "../config/colors";

//screen names
const homeName = "Home";
const loginName = "Login";
const glucoseMonitorName = "Monitor";
const deviceName = "Device";
const pacientsName = "Pacients";
const profileName = "Profile";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    initialRouteName={homeName}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;

        if (rn === homeName) {
          iconName = focused ? "home" : "home-outline";
        } else if (rn === glucoseMonitorName) {
          iconName = focused ? "analytics" : "analytics-outline";
        } else if (rn === deviceName) {
          iconName = focused ? "bluetooth" : "bluetooth-outline";
        } else if (rn === pacientsName) {
          iconName = focused ? "people" : "people-outline";
        } else if (rn === profileName) {
          iconName = focused ? "person-circle" : "person-circle-outline";
        } else if (rn === settingsName) {
          iconName = focused ? "settings" : "settings-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.mintGreenDark,
      tabBarInactiveTintColor: "grey",
      tabBarLabelStyle: { paddingBottom: 10, fontSize: 13 },
      tabBarIconStyle: { paddingTop: -5, height: 25 },
      tabBarStyle: { height: 75 },
      headerShown: false,
    })}
  >
    <Tab.Screen name={glucoseMonitorName} component={GlucoseMonitorScreen} />
    <Tab.Screen name={deviceName} component={DeviceScreen} />
    <Tab.Screen name={pacientsName} component={PacientsScreen} />
    <Tab.Screen name={profileName} component={ProfileScreen} />
    <Tab.Screen name={settingsName} component={SettingsScreen} />
  </Tab.Navigator>
);

export function AppNav() {
  const { login, logout, isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken !== null ? (
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
